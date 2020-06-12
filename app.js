'use strict';

const loader = require('./lib/loader');

class AppBootHook {
  constructor(app) {
    this.app = app;
    this.databases = loader.getDatabases(app);
  }

  async didLoad() {
    for (const database of this.databases) {
      loader.loadLogger(this.app, database);
      loader.loadDatabase(this.app, database);

      await loader.connect(database);
    }
  }
}

module.exports = AppBootHook;
