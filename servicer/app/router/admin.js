'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    const authMiddleware = app.middleware.authMiddleware(app)

    // auth
    router.post("/api/admin/login",controller.auth.login)
    router.get("/api/admin/getUser",authMiddleware,controller.auth.getUser)

    // user
    router.get("/api/admin/user/",authMiddleware,controller.admin.user.index)
    router.get("/api/admin/user/:id",authMiddleware,controller.admin.user.find)
    router.post("/api/admin/user/",authMiddleware,controller.admin.user.create)
    router.put("/api/admin/user/:id",authMiddleware,controller.admin.user.update)
    router.delete("/api/admin/user/:id",authMiddleware,controller.admin.user.destroy)
    router.get("/api/admin/checkUsername/:username"     ,controller.admin.user.checkUsername)

    // nav
    router.resources("navs","/api/admin/nav",authMiddleware,controller.admin.navs)
    //category
    router.resources("categories","/api/admin/category",authMiddleware,controller.admin.categories)
    //article
    router.resources("articles","/api/admin/article",authMiddleware,controller.admin.articles)

    // image upload
    router.post("/api/upload",authMiddleware,controller.home.upload)
};
