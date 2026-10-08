import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const sourceDir = resolve('.output/chrome-mv3')
const lintDir = resolve('.output/web-ext-lint')

if (!existsSync(resolve(sourceDir, 'manifest.json'))) {
  throw new Error('Build the Chrome extension before running web-ext lint.')
}

rmSync(lintDir, { recursive: true, force: true })
mkdirSync(lintDir, { recursive: true })
cpSync(sourceDir, lintDir, { recursive: true })

const manifestPath = resolve(lintDir, 'manifest.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
manifest.browser_specific_settings = {
  gecko: {
    id: 'kgp-erp-one-click-login@lint.invalid',
    data_collection_permissions: {
      required: ['none']
    }
  }
}
writeFileSync(manifestPath, JSON.stringify(manifest))
writeFileSync(resolve(lintDir, '.eslintrc.json'), JSON.stringify({ root: true, env: { browser: true, webextensions: true } }))

const result = spawnSync(process.execPath, [resolve('node_modules/web-ext/bin/web-ext.js'), 'lint', '--source-dir', lintDir], {
  cwd: lintDir,
  stdio: 'inherit'
})

rmSync(lintDir, { recursive: true, force: true })
process.exit(result.status ?? 1)
