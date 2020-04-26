exports.index = async ctx =>{
    const categories = await ctx.service.admin.categoryService.index()

    categories.forEach(v=>{
        v.key = v.id
    })

    const columns = [
        {
            title:'ID',
            dataIndex: "id",
            key:'id'
        },
        {
            title:"栏目名称",
            dataIndex:"category_name",
            key:"category_name"
        },
        {
            title:"栏目路径",
            dataIndex: "category_path",
            key: "category_path"
        }
    ]

    ctx.body = {
        columns,
        data:categories
    }
}

exports.show = async ctx =>{
    const category = await ctx.service.admin.categoryService.show(ctx.params.id)
    ctx.body = category
}

exports.create = async ctx =>{
    const category = await ctx.service.admin.categoryService.create(ctx.request.body)
    ctx.body = {
        "category_id":category.id
    }
}

exports.update = async ctx=>{
    let id = ctx.params.id;
    let body = ctx.request.body
    let req = Object.assign(body,{id})
    await ctx.service.admin.categoryService.update(req)
    ctx.status = 204
}

exports.destroy = async ctx =>{
    await ctx.service.admin.categoryService.destroy(ctx.params.id)
    ctx.status = 204
}