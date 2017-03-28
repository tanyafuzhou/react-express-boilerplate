#webpack-console-stats

Send webpack's formatted output to stdout

Usage:

````
import webpackConfig from './webpack.config';
import showStats from 'webpack-console-stats';

webpack(conf).watch(100, (err, stats) => {

  showStats(err, stats);

});

````