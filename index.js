#! /usr/bin/env node
import { logSuccess, logError } from './utils/logger.js';
import runCommand, {handleError} from './utils/commandRunner.js';

const repoUrl = 'https://github.com/Michal3333/rest-express-template';
const projectDirectory = process.argv[2];

if(!projectDirectory) {
  handleError('The project directory was not specified.')
}

if(projectDirectory.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  handleError('The project name is invalid.');
}

const gitCloneCommand = `git clone --depth 1 ${repoUrl} ${projectDirectory}`;
const installCommand = `cd ${projectDirectory} && npm install`;
const createEnvCommand = `cd ${projectDirectory} && cp .env.sample .env`;


runCommand(gitCloneCommand, 'Repo cloned successfully!');
runCommand(installCommand, 'Dependencies installed successfully!');
runCommand(createEnvCommand, '.env file created successfully!');

logSuccess('The project was successfully created!');
