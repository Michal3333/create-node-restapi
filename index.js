#! /usr/bin/env node
import { logSuccess, logTitle } from './utils/logger.js';
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


runCommand(gitCloneCommand, '[1/3] Repo cloned successfully!');
runCommand(installCommand, '[2/3] Dependencies installed successfully!');
runCommand(createEnvCommand, '[3/3] .env file created successfully!');

logTitle('The project was successfully created!');
