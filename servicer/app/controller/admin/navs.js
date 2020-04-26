exports.index = async ctx =>{
    const navs = await ctx.service.admin.navService.index()

    navs.forEach(v=>{
        v.key = v.id
        v.children = v.children === 0 ? "否" : "是"
    })

    const columns = [
        {
            title:'ID',
            dataIndex: "id",
            key:'id'
        },
        {
            title:"导航名称",
            dataIndex:"title",
            key:"title"
        },
        {
            title:"导航路径",
            dataIndex: "path",
            key: "path"
        },
        {
            title:"是否多级",
            dataIndex: "children",
            key:"children"
        }
    ]

    ctx.body = {
        columns,
        data:navs
    }
}

exports.show = async ctx =>{
    ctx.body = await ctx.service.admin.navService.show(ctx.params.id)
}

exports.create = async ctx =>{
    let body = ctx.request.body;
    let req = Object.assign(body,{children:0})
    const nav = await ctx.service.admin.navService.create(req)
    ctx.body = {
        "nav_id":nav.id
    }
}

exports.update = async ctx=>{
    let id = ctx.params.id;
    let body = ctx.request.body;
    let req = Object.assign(body, {id})
    await ctx.service.admin.navService.update(req)
    ctx.status = 204
}

exports.destroy = async ctx =>{
    await ctx.service.admin.navService.destroy(ctx.params.id)
    ctx.status = 204
}