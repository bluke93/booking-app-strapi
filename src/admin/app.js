const config = {
  locales: [
    'en',
    'it'
  ],
  translations: {
    it: {},
    en: {},
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
