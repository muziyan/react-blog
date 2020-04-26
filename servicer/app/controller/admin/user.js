"use strict"

const Controller = require('egg').Controller;
const bcrypt = require("bcrypt")

class UserController extends Controller{
    async index(){
        const {ctx,service} = this;

        let users = await service.admin.user.index()

        users.forEach(v=>{
            v.type = v.type === 0 ? "超级管理员" : v.type === 1 ? "高级管理员" : "普通管理员"
        })

        const columns = [
            {
                title:"ID",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"用户名称",
                dataIndex:"username",
                key:"username"
            },
            {
                title:"用户身份",
                dataIndex: "type",
                key: "type"
            }
        ]

        ctx.body = {
            columns,
            data:users
        }
    }

    async find(){
        const {ctx,service} = this;
        let user = await service.admin.user.find(ctx.params.id)

        ctx.body = {
            data:user
        }
    }

    async create(){
        const {ctx,service} = this;
        let {id,username,password,type} = ctx.request.body;

        password = bcrypt.hashSync(password,10)
        let results = await service.admin.user.create({id,username,password,type})
        ctx.body = {
            message:"create success!"
        }
    }

    async update(){
        const {ctx,service} = this;
        let id = ctx.params.id;
        let {username,password,type} = ctx.request.body;
        await service.admin.user.update({id,username,password,type})
        ctx.status = 204
    }

    async checkUsername(){
        const {ctx,service} = this;
        let bool = await service.admin.user.checkUsername(ctx.params.username);

        ctx.body = {
            isUse : bool
        }
    }

    async destroy(){
        const {ctx,service} = this;
        service.admin.user.destroy(ctx.params.id)

        ctx.status = 204;

    }
}

module.exports = UserController;