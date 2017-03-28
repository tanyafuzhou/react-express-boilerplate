import chalk from 'chalk';

class Logger {

  log(msg, color = 'white', prefix = 'webpack') {

    if (prefix) {
      prefix = this._prefix(prefix, color);
    }

    console.log(`${prefix} ${msg}`);
  }

  warn(msg) {
    this.log(msg, 'yellow', 'warning');
  }

  error(msg) {
    this.log(msg, 'red', 'error');
  }

  ok(msg) {
    this.log(msg, 'green', 'ok');
  }

  info(msg) {
    this.log(msg, 'gray', 'info');
  }

  _prefix(str, color = 'white') {

    return chalk.white('[', chalk[color](str), ']');

  }

}

const logger = new Logger();

const showStats = (fatalError, stats, options = {}) => {

  if (fatalError) {
    throw fatalError;
  }

  options = Object.assign({
    context: '',
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: false,
    chunkOrigins: false,
    modulesSort: false,
    chunksSort: false,
    assetsSort: false,
  }, options);

  let jsonStats = stats.toJson(options);

  let {errors, warnings} = jsonStats;

  for (let err of errors) {
    for (let errLine of err.split('\n')) {
      logger.error(errLine);
    }
  }

  for (let warn of warnings) {
    for (let warnLine of warn.split('\n')) {
      logger.error(warnLine);
    }
  }

  if (jsonStats.time) {
    logger.info(`Build completed in ${jsonStats.time / 1000}s`);
  }

  if (jsonStats.version) {
    logger.info(`Webpack version ${jsonStats.version}`);
  }

};

export default showStats;