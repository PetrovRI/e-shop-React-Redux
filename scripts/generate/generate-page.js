const path = require('path');
const paths = require('../../config/paths');
const { terminal } = require('terminal-kit');
const fs = require('fs');

const {
  getIndexFileTemplate,
  getPageTemplate,
} = require('./templates');

const generatePage = async (data) => {
  if (!data.name) {
    return;
  }

  const pageName = data.name[0].toUpperCase() + data.name.slice(1) + (data.name.includes('Page') ? '' : 'Page');
  const pageTemplate = getPageTemplate(pageName, data.scss);

  const pagesPath = path.resolve(paths.appSrc, 'app', 'pages');

  try {
    if (fs.existsSync(`${pagesPath}/${pageName}`)) {
      terminal.red('\nError: Page ').bold.yellow(`${pageName}`).red(' is already exists!\n\n');
    } else {
      fs.mkdir(`${pagesPath}/${pageName}`, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }

        fs.writeFile(`${pagesPath}/${pageName}/${pageName}.tsx`, pageTemplate, 'utf-8', (err) => {
          if (err) {
            throw err;
          }

          fs.writeFile(`${pagesPath}/${pageName}/index.ts`, getIndexFileTemplate(pageName), 'utf-8', (err) => {
            if (err) {
              throw err;
            }

            const routesPath = path.resolve(paths.appSrc, 'app', 'core', 'routeList.ts');

            fs.readFile(routesPath, 'utf-8', (err, fileData) => {
              if (err) {
                throw err;
              }

              const arrayOfLines = fileData.split('\n');
              const pageRoutePath = data.route[0] === '/' ? data.route : '/' + data.route;

              const lastImportIndex = arrayOfLines.findIndex((line) => !line);
              arrayOfLines.splice(lastImportIndex, 0, `import { ${pageName} } from 'pages/${pageName}';`);

              const endOfRouteIndex = arrayOfLines.findIndex((line) => line === '];');
              const endOfRouteItemIndex = arrayOfLines.findIndex((line) => line === '  },');
              arrayOfLines[endOfRouteItemIndex] += ' {';
              arrayOfLines.splice(endOfRouteIndex, 0, `    path: '${pageRoutePath}',`, `    component: ${pageName},`, '  },');

              fs.writeFile(`${routesPath}`, arrayOfLines.join('\n'), 'utf-8', (err) => {
                if (err) {
                  throw err;
                }

                if (data.scss) {
                  fs.writeFile(`${pagesPath}/${pageName}/${pageName}.scss`, '', 'utf-8', (err) => {
                    if (err) {
                      throw err;
                    }

                    terminal.green('\nPage ').bold.cyan(`${pageName}`).green(' has been created with styles\n\n');
                  });
                } else {
                  terminal.green('\nPage ').bold.cyan(`${pageName}`).green(' has been created\n\n');
                }
              });
            });
          });
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  generatePage,
};
