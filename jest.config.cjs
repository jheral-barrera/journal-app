const { TestEnvironment } = require("jest-environment-jsdom");

module.exports = {
    TestEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js']
}