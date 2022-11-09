#! /usr/bin/env node
const { execSync } = require('child_process');

const runCommand = (command, successMessage) => {
  try {
    execSync(`${command}`, {stdio: 'inherit'});
    console.log(successMessage);
  } catch (error) {
    console.error(`Command ${command} failed!`, error);
    process.exit(-1);
  }
}

const projectDirectory = process.argv[2];

if(!projectDirectory) {
  console.log('The project directory was not specified.')
  process.exit(-1);
}

if(projectDirectory.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  console.log('The project name is invalid.')
  process.exit(-1);
}

const gitCloneCommand = `git clone --depth 1 https://github.com/Michal3333/rest-express-template ${projectDirectory}`;
const installCommand = `cd ${projectDirectory} && npm install`;
const createEnvCommand = `cd ${projectDirectory} && cp .env.sample .env`;


runCommand(gitCloneCommand, 'Repo cloned successfully!');
runCommand(installCommand), 'Dependencies installed successfully!';
runCommand(createEnvCommand, '.env file created successfully!');


console.log('The project was successfully created!')