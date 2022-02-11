const meRouter = require('./me');
const siteRouter = require('./site');

function route(app) {
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
