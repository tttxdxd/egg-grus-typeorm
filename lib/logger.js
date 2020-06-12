'use strict';

class EggLogger {
  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(app, options) {
    this.app = app;
    this.logger = app.coreLogger;
    this.options = options;
  }
  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------
  /**
   * Logs query and parameters used in it.
   */
  logQuery (query, parameters, queryRunner) {
    if (this.options === 'all' || this.options === true || (Array.isArray(this.options) && this.options.indexOf('query') !== -1)) {
      const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
      this.logger.debug('[egg-typeorm] [QUERY]: ' + sql);
    }
  }
  /**
   * Logs query that is failed.
   */
  logQueryError (error, query, parameters, queryRunner) {
    if (this.options === 'all' || this.options === true || (Array.isArray(this.options) && this.options.indexOf('error') !== -1)) {
      const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
      this.logger.warn('[egg-typeorm] [FAILED QUERY]: ' + sql);
      this.logger.error(new Error('[egg-typeorm] [QUERY ERROR]: ' + error));
    }
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow (time, query, parameters, queryRunner) {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    this.logger.info('[egg-typeorm] [SLOW QUERY: ' + time + ' ms]: ' + sql);
  }
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild (message, queryRunner) {
    if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('schema') !== -1)) {
      this.logger.info(`[egg-typeorm] ` + message);
    }
  }
  /**
   * Logs events from the migrations run process.
   */
  logMigration (message, queryRunner) {
    this.logger.info('[egg-typeorm] ' + message);
  }
  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log (level, message, queryRunner) {
    switch (level) {
      case 'log':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('log') !== -1)) { this.logger.debug('[egg-typeorm] ' + message); }
        break;
      case 'info':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('info') !== -1)) { this.logger.info('[egg-typeorm] ' + message); }
        break;
      case 'warn':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('warn') !== -1)) { this.logger.warn('[egg-typeorm] ' + message); }
        break;
    }
  }

  stringifyParams (parameters) {
    try {
      return JSON.stringify(parameters);
    } catch (error) { // most probably circular objects in parameters
      return parameters;
    }
  }
}

module.exports = EggLogger;
