const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: true,
  viewportWidth: 1400,
  viewportHeight: 700,
  e2e: {
   
      baseUrl: 'https://katalon-demo-cura.herokuapp.com/'
    
  },
});
