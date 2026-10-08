import { expect, test } from '@playwright/test'
import { chromium } from 'playwright'
import { createServer, type Server } from 'node:http'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const extensionId = 'fkbjfpeianpkijhlinphhmagcoiklmam'
const extensionPath = resolve('.output/chrome-mv3')
const cachedChrome = resolve(process.env.LOCALAPPDATA ?? '', 'ms-playwright/chromium-1223/chrome-win64/chrome.exe')

let server: Server
let mockOrigin = ''

test.beforeAll(async () => {
  execFileSync(process.execPath, [resolve('node_modules/wxt/bin/wxt.mjs'), 'build', '--browser', 'chrome'], {
    env: { ...process.env, VITE_LOCAL_MOCK: '1' },
    stdio: 'inherit'
  })

  await new Promise<void>((done) => {
    server = createServer((_, response) => {
      response.writeHead(200, { 'content-type': 'text/html' })
      response.end(`<!doctype html>
        <input id="user_id" />
        <div id="answer_div"></div>
        <input id="password" />
        <input id="answer" />
        <script>
          window.setTimeout(() => {
            document.querySelector('#answer_div').append(document.createTextNode('Mock security question'))
          }, 750)
        </script>`)
    }).listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (address && typeof address !== 'string') mockOrigin = `http://127.0.0.1:${address.port}`
      done()
    })
  })
})

test.afterAll(async () => {
  if (server) await new Promise<void>((done, reject) => server.close((error) => (error ? reject(error) : done())))
})

test('autofills the existing dynamic security-question flow', async () => {
  const context = await chromium.launchPersistentContext('', {
    executablePath: existsSync(cachedChrome) ? cachedChrome : undefined,
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  })

  try {
    const setup = await context.newPage()
    await setup.goto(`chrome-extension://${extensionId}/popup.html`)
    await setup.evaluate(async () => {
      await chrome.storage.local.set({
        authCredentials: {
          autoLogin: true,
          requirePin: false,
          username: '22XX00001',
          password: 'stored-password',
          q1: 'Mock security question',
          q2: 'Unused question two',
          q3: 'Unused question three',
          a1: 'stored-answer',
          a2: 'unused-two',
          a3: 'unused-three'
        }
      })
    })

    const login = await context.newPage()
    await login.goto(`${mockOrigin}/login.htm`)

    await expect(login.locator('#user_id')).toHaveValue('22XX00001')
    await expect(login.locator('#password')).toHaveValue('stored-password')
    await expect(login.locator('#answer')).toHaveValue('stored-answer')
  } finally {
    await context.close()
  }
})
