'use strict';

/**
 * egg-grus-typeorm default config
 * @member Config#typeorm
 * @property {String} SOME_KEY - some description
 */
exports.typeorm = {
  name: 'mysql',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: '',

  // delegate: 'entity',
  // baseDir: 'entity',
  // logging: "all",

  // support multi datasources by config.sequelize.datasources
  // datasources: [
  //   {
  //     delegate: 'model', // lood to `app[delegate]`
  //     baseDir: 'model', // models in `app/${model}`
  //     // other sequelize configurations
  //   },
  //   {
  //     delegate: 'sequelize', // lood to `app[delegate]`
  //     baseDir: 'sequelize', // models in `app/${model}`
  //     // other sequelize configurations
  //   },
  // ],
};
