const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env:{
      baseUrl: 'https://jsonplaceholder.typicode.com',
    },
    setupNodeEvents(on, config) {
    },
  },
});
