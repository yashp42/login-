# Chrome Web Store compliance checklist

- [ ] Confirm the store listing name and description match the released manifest.
- [ ] Confirm all requested permissions are necessary and documented.
- [ ] Confirm the privacy policy accurately describes local credential storage and any future Gmail access.
- [ ] Run `npm run build` and `npm run web-ext:lint` before packaging.
- [ ] Upload only the Chrome MV3 build from `.output/chrome-mv3`.
