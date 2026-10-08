import packageJson from './package.json'
import { defineConfig } from 'wxt'

const hostPermissions = ['https://erp.iitkgp.ac.in/*']
if (process.env.VITE_LOCAL_MOCK === '1') hostPermissions.push('http://127.0.0.1/*')

export default defineConfig({
  srcDir: 'src',
  manifest: {
    name: 'KGP ERP One-Click Login',
    description: 'Locally stored IIT Kharagpur ERP login autofill for Chrome.',
    version: packageJson.version,
    key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvKXad/+8Y1QnB2Co+4jW8o7t7Gqp7XYEyWb7oMFtKeDY0Qh6eW2khHhWygsuRABu9rAjgfAeZFVr/aJrmUTLuRCTsRAhV5odWj8Yaa0b2ZL40x2FLstMGAjAx5tTS10sKes6Lz1n0Jjp51BA6RP+igeQVoHFARsmlNdT3u+0y1Ts1nyQQ04ajJWc0UmDxg7SEdoXch8Y+q7Dh9VyyApCZioBfGUyjvLkcUKIilaPsASKjeffTN1Xw9tz+rZOuvK9ZDCiJRZWjKiiu1HBx8L/t2NLrk3JB+aYK1lRiTT2e3cGVlGOJ1RtQjuKJ1YbJq+usjTk8pylmtOz23E7AffYKQIDAQAB',
    permissions: ['storage'],
    host_permissions: hostPermissions,
    action: {
      default_title: 'KGP ERP One-Click Login',
      default_icon: 'icon/icon-32.png'
    },
    icons: {
      '16': 'icon/icon-16.png',
      '32': 'icon/icon-32.png',
      '48': 'icon/icon-48.png',
      '128': 'icon/icon-128.png'
    }
  }
})
