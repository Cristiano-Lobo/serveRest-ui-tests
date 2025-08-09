const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.UI_BASE_URL || 'https://front.serverest.dev',
    env: {
      API_BASE: process.env.CYPRESS_API_BASE || 'https://serverest.dev',
    },
  },
});
