const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    env: {
      baseUrl: process.env.CYPRESS_BASE_URL,
      username: process.env.USERNAME_ENV,
      password: process.env.PASSWORD_ENV,
    },
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 30000,
    viewportHeight: 720,
    viewportWidth: 1200,
  },
});
