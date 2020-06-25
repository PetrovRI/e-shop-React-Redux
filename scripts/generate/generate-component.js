const path = require('path');
const paths = require('../../config/paths');
const { terminal } = require('terminal-kit');
const fs = require('fs');

const {
  getIndexFileTemplate,
  getComponentTemplate,
} = require('./templates');

const generateComponent = async (data) => {
  if (!data.name) {
    return;
  }

  const componentName = data.name[0].toUpperCase() + data.name.slice(1);
  const componentTemplate = getComponentTemplate(componentName, data.scss);

  const componentsPath = path.resolve(paths.appSrc, 'app', 'components');

  try {
    if (fs.existsSync(`${componentsPath}/${componentName}`)) {
      terminal.red('\nError: Component ').bold.yellow(`${componentName}`).red(' is already exists!\n\n');
    } else {
      fs.mkdir(`${componentsPath}/${componentName}`, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }

        fs.writeFile(`${componentsPath}/${componentName}/${componentName}.tsx`, componentTemplate, 'utf-8', (err) => {
          if (err) {
            throw err;
          }

          fs.writeFile(`${componentsPath}/${componentName}/index.ts`, getIndexFileTemplate(componentName), 'utf-8', (err) => {
            if (err) {
              throw err;
            }

            if (data.scss) {
              fs.writeFile(`${componentsPath}/${componentName}/${componentName}.scss`, '', 'utf-8', (err) => {
                if (err) {
                  throw err;
                }

                terminal.green('\nComponent ').bold.cyan(`${componentName}`).green(' has been created with styles\n\n');
              });
            } else {
              terminal.green('\nComponent ').bold.cyan(`${componentName}`).green(' has been created\n\n');
            }
          });
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  generateComponent,
};
