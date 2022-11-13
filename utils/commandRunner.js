#! /usr/bin/env node
import { execSync } from 'child_process';
import { logSuccess, logError } from './logger.js';

export const handleError = (...message) => {
  logError(message);
  process.exit(-1);
};

const runCommand = (command, successMessage) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
    logSuccess(successMessage);
  } catch (error) {
    handleError(`Command ${command} failed!`, error);
  }
};

export default runCommand;
