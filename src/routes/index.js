const newsRouter = require('./news');
const siteRouter = require('./site');
const productsRouter = require('./products');
const adminRouter = require('./admin');


function route(app) {
    app.use('/admin', adminRouter);

    app.use('/product', productsRouter);

    app.use('/news', newsRouter);

    app.use('/', siteRouter);

}
module.exports = route;