'use strict';

const path = require('path');
const typeorm = require('typeorm');

const logger = require('./logger');

const ENTITY = 'entity';
const MIGRATION = 'migration';
const SUBSCRIBER = 'subscriber';
const CONN_RETRIES = Symbol.for('connectRetries');

module.exports = class {
  static getDatabases(app) {
    const baseDir = app.baseDir;

    const defaultConfig = {
      delegate: ENTITY,
      baseDir: ENTITY,
      logging: 'all',
      logger,
      entities: [
        path.join(baseDir, 'app/entity/*{.js,.ts}'),
      ],
      migrations: [
        path.join(baseDir, 'app/migration/*{.js,.ts}'),
      ],
      subscribers: [
        path.join(baseDir, 'app/subscriber/*{.js,.ts}'),
      ],
      cli: {
        entitiesDir: path.join(baseDir, `app/${ENTITY}`),
        migrationsDir: path.join(baseDir, `app/${MIGRATION}`),
        subscribersDir: path.join(baseDir, `app/${SUBSCRIBER}`),
      },
    };

    const config = app.config.typeorm;

    const databases = [];

    if (!config.datasources) {
      databases.push(Object.assign({}, defaultConfig, config));
    } else {
      config.datasources.forEach(datasource => {
        databases.push(Object.assign({}, defaultConfig, datasource));
      });
    }

    return databases;
  }

  static loadLogger(app, config = {}) {
    const logger = config.logger;

    config.logger = new logger(app, config.logging);
  }

  static loadDatabase(app, config = {}) {
    const context = app.context;
    const delegate = config.delegate;

    Object.defineProperty(app, delegate, {
      value: Object.create(null),
      writable: false,
      configurable: true,
    });

    Object.defineProperty(context, delegate, {
      get() {
        return app[delegate];
      },
      configurable: true,
    });

    const modelDir = path.join(app.baseDir, 'app', config.baseDir);
    const DELEGATE = Symbol(delegate);

    app.loader.loadToApp(modelDir, DELEGATE, {
      caseStyle: 'upper',
      ignore: config.exclude,
      initializer(entity, opt) {
        app.coreLogger.info('[egg-typeorm] load entity:%s', opt.path);
        return entity;
      },
    });

    Object.assign(app[delegate], app[DELEGATE]);
  }

  static sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  static async connect(database) {
    database[CONN_RETRIES] = database[CONN_RETRIES] || 0;

    try {
      await typeorm.createConnection(database);
    } catch (error) {
      if (database[CONN_RETRIES] > 3) throw error;

      database[CONN_RETRIES]++;
      await this.sleep(1000);
      await this.connect(database);
    }
  }
};
