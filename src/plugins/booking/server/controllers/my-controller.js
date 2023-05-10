'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('booking')
      .service('myService')
      .getWelcomeMessage();
  },
});
