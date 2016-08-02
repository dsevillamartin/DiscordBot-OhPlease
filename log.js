'use strict';

const chalk = require('chalk');

module.exports = {
  debug: console.log,
  error: (err) => {
    console.log(chalk.bold.cyan('\n=============== E R R O R =============='))
    console.log(chalk.red(err));
  }
}
