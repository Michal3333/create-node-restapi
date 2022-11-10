#! /usr/bin/env node
import chalk from 'chalk';

export const logSuccess = (...message) => console.log(chalk.green(message));
export const logError = (...message) => console.log(chalk.red(message));
