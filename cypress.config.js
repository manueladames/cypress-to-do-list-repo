const { defineConfig } = require('cypress');
const registerCypressGrep = require('@cypress/grep/src/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://todolist.james.am',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      registerCypressGrep(config);
      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
  },
});
