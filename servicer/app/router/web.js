'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // article api
    router.get('/api/web/article', controller.web.home.index);
    router.get('/api/web/article/:id', controller.web.home.findArticle);
    router.get('/api/web/article/search/:text', controller.web.home.search);
    // category api
    router.get("/api/web/category",controller.web.home.categoryAll)
    router.get("/api/web/category/:id",controller.web.home.categoryArticle)
    // nav api
    router.get("/api/web/nav",controller.web.home.navAll)
};
