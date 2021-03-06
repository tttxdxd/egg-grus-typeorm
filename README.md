# egg-grus-typeorm

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-grus-typeorm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-grus-typeorm
[travis-image]: https://img.shields.io/travis/tttxdxd/egg-grus-typeorm.svg?style=flat-square
[travis-url]: https://travis-ci.org/tttxdxd/egg-grus-typeorm
[codecov-image]: https://img.shields.io/codecov/c/github/tttxdxd/egg-grus-typeorm.svg?style=flat-square
[codecov-url]: https://codecov.io/github/tttxdxd/egg-grus-typeorm?branch=master
[david-image]: https://img.shields.io/david/tttxdxd/egg-grus-typeorm.svg?style=flat-square
[david-url]: https://david-dm.org/tttxdxd/egg-grus-typeorm
[snyk-image]: https://snyk.io/test/npm/egg-grus-typeorm/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-grus-typeorm
[download-image]: https://img.shields.io/npm/dm/egg-grus-typeorm.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-grus-typeorm

<!--
Description here.
-->

## Install

```bash
$ npm i egg-grus-typeorm --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.typeorm = {
  enable: true,
  package: 'egg-grus-typeorm',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.typeorm = {
};

// use egg-ts-helper
// {app_root}/tshelper.js 
module.exports = {
  watchDirs: {
    model: {
      directory: 'app/entity', // files directory.
      generator: 'class', // generator name, eg: class、auto、function、object
      interface: 'IEntity', // interface name
    },
  }
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/tttxdxd/egg-grus-typeorm/issues).

## License

[MIT](LICENSE)
