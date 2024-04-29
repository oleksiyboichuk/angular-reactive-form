exports.config = {
  framework: 'jasmine',
  specs: ['./e2e/**/*.spec.ts'],
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:4200/',
  directConnect: true
};
