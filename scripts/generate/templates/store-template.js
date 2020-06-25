function getStoreTemplate(storeName) {
  return `import { action, decorate, observable } from 'mobx';

class ${storeName} {\n}

decorate(${storeName}, {\n});

export { ${storeName} };
`;
}

module.exports = getStoreTemplate;
