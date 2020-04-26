exports.index = async ctx =>{
    const articles = await ctx.service.admin.articleService.index()

    articles.forEach(v=>{
        let date = new Date(v.created_at)
        v.key = v.id
        v.article_id = v.id
        v.date = date.toLocaleDateString()
    })

    const columns = [
        {
            title:"ID",
            dataIndex: "id",
            key:"id"
        },
        {
            title:"文章名称",
            dataIndex:"title",
            key:"title"
        },
        {
            title:"上级栏目",
            dataIndex: "category_name",
            key: "category_name"
        },
        {
            title:"发布时间",
            dataIndex: "date",
            key: "date"
        }
    ]

    ctx.body = {
        columns,
        data:articles
    }
}

exports.show = async ctx =>{
    ctx.body = await ctx.service.admin.articleService.show(ctx.params.id)
}

exports.create = async ctx =>{
    let body = ctx.request.body;
    const article = await ctx.service.admin.articleService.create(body)
    ctx.body = {
        "article_id":article.id
    }
}

exports.update = async ctx=>{
    let id = ctx.params.id;
    let body = ctx.request.body
    let req = Object.assign(body,{id})
    await ctx.service.admin.articleService.update(req)
    ctx.status = 204
}

exports.destroy = async ctx =>{
    await ctx.service.admin.articleService.destroy(ctx.params.id)
    ctx.status = 204
}