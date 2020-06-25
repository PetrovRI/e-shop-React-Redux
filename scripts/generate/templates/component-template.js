function getComponentTemplate(componentName, less) {
  return `import React, { FC } from 'react';

${less && `import './${componentName}.less';\n`}
export const ${componentName}: FC = () => {
  return (
    
  );
};
`.split('\n').filter(str => str !== 'false').join('\n');
}

module.exports = getComponentTemplate;
