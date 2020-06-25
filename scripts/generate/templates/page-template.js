function getPageTemplate(pageName, less) {
  return `import React, { FC, useEffect } from 'react';
import { useStore } from 'stores';

${less && `import './${pageName}.less';\n`}
export const ${pageName}: FC = () => {
  const { layoutStore } = useStore();

  useEffect(() => {
    layoutStore.setPageTitle('');
  });

  return (
    
  );
};
`.split('\n').filter(str => str !== 'false').join('\n');
}

module.exports = getPageTemplate;
