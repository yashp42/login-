export default defineContentScript({
  matches:
    import.meta.env.VITE_LOCAL_MOCK === '1'
      ? ['https://erp.iitkgp.ac.in/SSOAdministration/login.htm*', 'http://127.0.0.1/*']
      : ['https://erp.iitkgp.ac.in/SSOAdministration/login.htm*'],
  main() {
    void import('../content')
  }
})
