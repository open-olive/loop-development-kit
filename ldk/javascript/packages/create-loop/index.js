#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const path = require('path');
const { execSync } = require('child_process');
const prompts = require('prompts');
const Sqrl = require('squirrelly');

const projectOptions = {
  name: '',
  language: '',
  aptitudes: [],
};

const installNodeModules = () => {
  try {
    const { name: projectName } = projectOptions;

    execSync('npm install', { cwd: `./${projectName}`, stdio: 'inherit' });
  } catch (error) {
    console.error(error);
  }
};

const createProject = async () => {
  try {
    const { name: projectName, aptitudes, language } = projectOptions;
    const isTypeScript = language === 'typescript';

    // Render a given template file to a given target file path
    const renderTemplate = async (template, filePath) => {
      const fileContents = await Sqrl.renderFile(template, {
        isTypeScript,
        projectName,
        aptitudes,
      });

      fs.writeFile(filePath, fileContents);
    };

    // Replace TS file extension with the right one, or add an extension if it doesn't exist
    const filenameWithExtension = (filename) => {
      const fileExtension = isTypeScript ? '.ts' : '.js';

      if (filename.endsWith('.ts')) {
        return filename.replace('.ts', fileExtension);
      }

      return `${filename}${fileExtension}`;
    };

    // Target path: the project being created
    const targetBasePath = `./${projectName}`;
    // Source path: this script's template files
    const sourceBasePath = path.join(__dirname, 'templates');

    // Creating base template files from /template
    const baseTemplateFiles = await fs.readdir(sourceBasePath);
    const baseTemplateSquirrellyFiles = baseTemplateFiles.filter((filename) =>
      filename.endsWith('.squirrelly'),
    );

    await fs.mkdir(targetBasePath);

    baseTemplateSquirrellyFiles.forEach((squirrellyFilename) => {
      const renderedFilename = squirrellyFilename.replace('.squirrelly', '');
      renderTemplate(
        path.join(sourceBasePath, squirrellyFilename),
        path.join(targetBasePath, renderedFilename),
      );
    });

    // Source for 'src' directory (./templates/src)
    const sourceSrcPath = path.join(sourceBasePath, 'src');
    // Creating base template source files from /template/src
    const baseTemplateSrcFiles = await fs.readdir(sourceSrcPath);
    const baseTemplateSrcSquirrellyFiles = baseTemplateSrcFiles.filter((filename) =>
      filename.endsWith('.squirrelly'),
    );

    const targetSrcPath = path.join(targetBasePath, 'src');
    await fs.mkdir(targetSrcPath);

    baseTemplateSrcSquirrellyFiles.forEach((squirrellyFilename) => {
      let renderedFilename = squirrellyFilename.replace('.squirrelly', '');
      if (renderedFilename.endsWith('.ts')) {
        renderedFilename = filenameWithExtension(renderedFilename);
      }
      renderTemplate(
        path.join(sourceSrcPath, squirrellyFilename),
        path.join(targetSrcPath, renderedFilename),
      );
    });

    const sourceAptitudesPath = path.join(sourceSrcPath, 'aptitudes');
    const targetAptitudesPath = path.join(targetSrcPath, 'aptitudes');
    await fs.mkdir(targetAptitudesPath);

    const sourceWhispersPath = path.join(sourceSrcPath, 'whispers');
    const targetWhispersPath = path.join(targetSrcPath, 'whispers');
    await fs.mkdir(targetWhispersPath);

    // "search" aptitude create "ui" templates
    aptitudes.forEach(async (aptitude) => {
      const APTITUDE_FILENAMES = {
        clipboard: 'clipboardListener',
        filesystem: 'filesystemExample',
        keyboard: 'keyboardListener',
        network: 'networkExample',
        ui: 'searchListener',
        window: 'activeWindowListener',
      };

      const aptitudeFilename = APTITUDE_FILENAMES[aptitude];
      // Change first letter to uppercase, e.g. ClipboardWhisper
      const whisperFilename = aptitude[0].toUpperCase() + aptitude.slice(1) + 'Whisper';

      const sourceAptitudePath = path.join(sourceAptitudesPath, aptitude);
      const targetAptitudePath = path.join(targetAptitudesPath, aptitude);
      await fs.mkdir(targetAptitudePath);

      // Render aptitude
      renderTemplate(
        path.join(sourceAptitudePath, `${aptitudeFilename}.ts.squirrelly`),
        path.join(targetAptitudePath, filenameWithExtension(aptitudeFilename)),
      );

      // Render aptitude unit test
      renderTemplate(
        path.join(sourceAptitudePath, `${aptitudeFilename}.test.ts.squirrelly`),
        path.join(targetAptitudePath, filenameWithExtension(`${aptitudeFilename}.test`)),
      );

      // Render whisper
      renderTemplate(
        path.join(sourceWhispersPath, `${whisperFilename}.ts.squirrelly`),
        path.join(targetWhispersPath, filenameWithExtension(whisperFilename)),
      );

      // Render whisper unit test
      renderTemplate(
        path.join(sourceWhispersPath, `${whisperFilename}.test.ts.squirrelly`),
        path.join(targetWhispersPath, filenameWithExtension(`${whisperFilename}.test`)),
      );
    });

    // Render aptitude index file
    renderTemplate(
      path.join(sourceAptitudesPath, 'index.ts.squirrelly'),
      path.join(targetAptitudesPath, filenameWithExtension('index')),
    );

    // Render whisper index file
    renderTemplate(
      path.join(sourceWhispersPath, 'index.ts.squirrelly'),
      path.join(targetWhispersPath, filenameWithExtension('index')),
    );

    // Render intro whisper
    renderTemplate(
      path.join(sourceWhispersPath, 'IntroWhisper.ts.squirrelly'),
      path.join(targetWhispersPath, filenameWithExtension('IntroWhisper')),
    );

    installNodeModules();
  } catch (error) {
    console.error(error);
  }
};

const languagePrompt = () => {
  prompts({
    type: 'select',
    name: 'language',
    message: 'Which language do you want to use?',
    choices: [
      { title: 'TypeScript', value: 'typescript' },
      { title: 'JavaScript', value: 'javascript' },
    ],
  }).then((response) => {
    const { language } = response;
    projectOptions.language = language;

    return createProject();
  });
};

const aptitudesPrompt = () => {
  prompts({
    type: 'multiselect',
    name: 'aptitudes',
    message: 'Which Aptitudes do you want to include?',
    choices: [
      { title: 'Clipboard', value: 'clipboard' },
      { title: 'Filesystem', value: 'filesystem' },
      { title: 'Keyboard', value: 'keyboard' },
      { title: 'Network', value: 'network' },
      { title: 'Search', value: 'ui' },
      { title: 'Window', value: 'window' },
    ],
    hint: 'Use your spacebar to select. You can select multiple!',
  }).then((response) => {
    const { aptitudes } = response;
    projectOptions.aptitudes = aptitudes;

    return languagePrompt();
  });
};

const projectNamePrompt = () =>
  prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is your project name? (a-z A-Z 0-9 . - _ ~)',
    format: (projectNameInput) => projectNameInput.replace(/ /g, '-').toLowerCase(),
    validate: (projectNameInput) => {
      // The regex pattern NPM uses for project names in package.json http://json.schemastore.org/package
      const NPM_PROJECT_NAME_PATTERN = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/g;
      const projectNameFormatted = projectNameInput.replace(/ /g, '-').toLowerCase();

      return projectNameFormatted.match(NPM_PROJECT_NAME_PATTERN);
    },
  }).then((response) => {
    try {
      const { projectName } = response;
      projectOptions.name = projectName;

      return aptitudesPrompt();
    } catch (error) {
      return console.error(error);
    }
  });

projectNamePrompt();
