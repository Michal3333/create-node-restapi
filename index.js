#! /usr/bin/env node
import inquirer from 'inquirer';
import { logTitle } from './utils/logger.js';
import runCommand, { handleError } from './utils/commandRunner.js';

const completeValue = 'complete';
const minimumValue = 'minimum';

const repoUrl = 'https://github.com/Michal3333/rest-express-template';

(async () => {
  const answers = await inquirer.prompt([
    {
      name: 'directory',
      message: 'Directory name:',
      type: 'Input',
    }, {
      name: 'type',
      message: 'Project type:',
      type: 'list',
      choices: [
        {
          name: 'Complete - copies the complete version of the template',
          value: completeValue,
        }, {
          name: 'Minimum - copies the project configuration and creates a minimal express setup',
          value: minimumValue,
        },
      ],
    },
  ]);

  const projectDirectory = answers.directory;
  const projctType = answers.type;

  if (!projectDirectory) {
    handleError('The project directory was not specified.');
  }

  if (projectDirectory.match(/[<>:"/\\|?*\x00-\x1F]/)) {
    handleError('The project name is invalid.');
  }

  const gitCloneCommand = `git clone --depth 1 ${repoUrl} ${projectDirectory}`;
  const deleteRemoteGitCommand = `cd ${projectDirectory} && rm -rf .git`;
  const installCommand = `cd ${projectDirectory} && npm install`;
  const createEnvCommand = `cd ${projectDirectory} && cp .env.sample .env`;
  const deleteStarterIndexCommand = `cd ${projectDirectory} && rm index.starter.txt`;
  const createExpressStarterCommand = `cd ${projectDirectory} && rm -rf src/*  && cp index.starter.txt src/index.ts && rm index.starter.txt`;

  runCommand(gitCloneCommand, '[1/5] Repo cloned successfully!');
  runCommand(deleteRemoteGitCommand, '[2/5] .git folder removed successfully!');
  runCommand(installCommand, '[3/5] Dependencies installed successfully!');
  runCommand(createEnvCommand, '[4/5] .env file created successfully!');

  if (projctType === completeValue) {
    runCommand(deleteStarterIndexCommand, '[5/5] index.starter.ts file removed successfully!');
  } else {
    runCommand(createExpressStarterCommand, '[5/5] Minimal express setup created successfully!');
  }

  logTitle('The project was successfully created!');
})();
