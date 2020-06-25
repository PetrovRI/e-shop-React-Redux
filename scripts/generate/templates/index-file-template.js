function getIndexFileTemplate(componentName) {
  return `import { ${componentName} } from './${componentName}';

export { ${componentName} };
`;
}

module.exports = getIndexFileTemplate;
