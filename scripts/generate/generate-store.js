const path = require('path');
const paths = require('../../config/paths');
const { terminal } = require('terminal-kit');
const fs = require('fs');

const {
  getStoreTemplate,
} = require('./templates');

const generateStore = async (data) => {
  if (!data.name) {
    return;
  }

  const storeName = data.name[0].toUpperCase() + data.name.slice(1) + (data.name.includes('Store') ? '' : 'Store');
  const storeCamelCaseName = storeName[0].toLowerCase() + storeName.slice(1);
  const storeTemplate = getStoreTemplate(storeName);

  const storesPath = path.resolve(paths.appSrc, 'app', 'stores');

  try {
    if (fs.existsSync(`${storesPath}/${storeName}.ts`)) {
      terminal.red('\nError: Store ').bold.yellow(`${storeName}`).red(' is already exists!\n\n');
    } else {
      fs.writeFile(`${storesPath}/${storeName}.ts`, storeTemplate, 'utf-8', (err) => {
        if (err) {
          throw err;
        }

        fs.readFile(`${storesPath}/RootStore.ts`, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }

          const arrayOfLines = data.split('\n');

          const lastImportIndex = arrayOfLines.findIndex((line) => !line);
          arrayOfLines.splice(lastImportIndex, 0, `import { ${storeName} } from './${storeName}';`);

          const endOfClassIndex = arrayOfLines.findIndex((line) => line === '}');
          arrayOfLines.splice(endOfClassIndex, 0, `  ${storeCamelCaseName}: ${storeName} = new ${storeName}();`);

          fs.writeFile(`${storesPath}/RootStore.ts`, arrayOfLines.join('\n'), 'utf-8', (err) => {
            if (err) {
              throw err;
            }

            terminal.green('\nStore ').bold.cyan(`${storeName}`).green(' has been created\n\n');
          });
        });
      });
    }
  } catch(err) {
    console.error(err)
  }
};

module.exports = {
  generateStore,
};
