'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        const results = await ctx.service.web.articles.index()
        ctx.body = {
            data:results
        }
    }

    async findArticle(){
        const {ctx} = this;
        const article = await ctx.service.web.articles.find(ctx.params.id)
        ctx.body = {
            data: article[0]
        }
    }

    async search(){
        const {ctx} = this;
        const articles = await ctx.service.web.articles.search(ctx.params.text)
        ctx.body = {
            data:articles
        }
    }

    async categoryAll(){
        const {ctx} = this;
        const categories = await ctx.service.web.category.index()
        ctx.body = {
            data:categories
        }
    }

    async categoryArticle(){
        const {ctx} = this;
        const category = await ctx.service.web.category.find(ctx.params.id)
        const articles = await ctx.service.web.category.findArticle(ctx.params.id)
        ctx.body = {
            data: {
                category,
                articles
            }
        }
    }

    async navAll(){
        const {ctx} = this;
        const navs = await ctx.service.web.nav.index()
        ctx.body = {
            data: navs
        }
    }
}

module.exports = HomeController;
