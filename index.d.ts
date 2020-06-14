import { Connection, ConnectionOptions, getConnectionOptions } from 'typeorm';

type EggTypeORMOptions = ConnectionOptions & {
  /**
   * load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
   */
  delegate?: string;

  /**
   * load models from `app/model/*.js`
   */
  baseDir?: string;

  /**
   * There are other options you can use:
   * query - logs all queries.
   * error - logs all failed queries and errors.
   * schema - logs the schema build process.
   * warn - logs internal orm warnings.
   * info - logs internal orm informative messages.
   * log - logs internal orm log messages.
   */
  logging?: string | Array<string>;

  /**
   * ignore `app/${baseDir}/index.js` when load models, support glob and array
   */
  exclude?: string | Array<string>;

  /**
   * A full database URI
   * @example
   * `connectionUri:"mysql://localhost:3306/database"`
   */
  connectionUri?: string;
}

interface DataSources {
  datasources: EggTypeORMOptions[];
}

declare module 'egg' {
  interface IModel extends PlainObject {}

  // extend app
  interface Application {
    model: IModel;
    getConnection(connectionName?: string): Connection;
  }

  // extend context
  interface Context {
    model: IModel;
    getConnection(connectionName?: string): Connection;
  }

  // extend your config
  interface EggAppConfig {
    typeorm: EggTypeORMOptions | DataSources;
  }
}
