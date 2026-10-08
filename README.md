# KGP ERP One-Click Login

A Chrome extension that locally stores and autofills an IIT Kharagpur ERP login. Phase 1 preserves the existing credential and security-question fill flow; OTP retrieval and one-click submission are intentionally not implemented yet.

This project is maintained at [yashp42/login](https://github.com/yashp42/login). Its default branch is `codex/phase-1-foundation` until it is merged into the repository’s configured default branch.

## Privacy and security

- Credentials stay in Chrome extension storage on the device; this project has no backend or analytics.
- The current optional four-digit PIN scheme is legacy compatibility behavior and will be replaced in the security phase.
- Never share the browser profile or device containing both ERP credentials and mailbox access. When Gmail OTP support is added, enable 2FA on the Gmail account itself.

## Development

Use npm only. The committed `package-lock.json` is the sole lockfile.

```bash
npm ci
npm run dev
```

Available checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run web-ext:lint
npm run test:e2e
```

The extension is built for Chrome Manifest V3 into `.output/chrome-mv3`. The manifest version is generated from the single version in `package.json`.

## Project status

- [x] Chrome MV3/WXT foundation
- [x] Existing local credential-fill behavior
- [x] Unit and local mock smoke-test infrastructure
- [ ] Passphrase-protected multi-account storage and migration
- [ ] Gmail metadata-only OTP retrieval
- [ ] One-click OTP flow, overlay, and settings

## License

Licensed under the [Mozilla Public License 2.0](LICENSE).

This project originated from Siddhartha Sarkar’s IIT KGP ERP Auto Login extension; the original project is credited for that foundation.
