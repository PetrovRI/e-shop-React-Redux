const prompts = require('prompts');

const { generatePage } = require('./generate-page');
const { generateStore } = require('./generate-store');
const { generateComponent } = require('./generate-component');

const questions = [
  {
    type: 'select',
    name: 'type',
    message: 'What do you want generate?',
    choices: [
      {title: 'Component', value: 'component'},
      {title: 'Page', value: 'page'},
      {title: 'Store', value: 'store'}
    ],
  },
  {
    type: (prev) => prev === 'component' ? 'confirm' : null,
    name: 'scss',
    message: 'Do you need styles? (default yes):',
    initial: true,
  },
  {
    type: (prev) => prev === 'page' ? 'confirm' : null,
    name: 'scss',
    message: 'Do you need styles? (default no):',
    initial: false,
  },
  {
    type: (prev, values) => values.type === 'page' ? 'text' : null,
    name: 'route',
    message: 'Enter route path:',
  },
  {
    type: 'text',
    name: 'name',
    message: 'Enter name:',
    validate: (value) => value.length < 3 ? `Name is very short! (min length: 3)` : true,
  },
];

(async () => {
  const response = await prompts(questions);

  switch (response.type) {
    case 'store': {
      await generateStore(response);
      break;
    }
    case 'component': {
      await generateComponent(response);
      break;
    }
    case 'page': {
      await generatePage(response);
      break;
    }
    default: {
      break;
    }
  }
})();
