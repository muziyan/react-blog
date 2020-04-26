"use strict"

const Controller = require('egg').Controller;

const jwt = require("jsonwebtoken")
const bcrypt =require("bcrypt")

class AuthController extends Controller{
    async login(){
        const {ctx} = this;
        const {username,password} = ctx.request.body;
        const user = await ctx.service.auth.getUser(username)

        const userAgent = ctx.header["user-agent"]

        if (bcrypt.compareSync(password,user.password)){
            let token = jwt.sign({username},userAgent,{
                expiresIn:60 * 60 * 2
            })
            ctx.status = 200;
            ctx.body = {
                token:`Bearer ${token}`
            }
        }else{
            ctx.status = 422;
            ctx.body = {
                message:"password error!",
            }
        }
    }

    async getUser(){
        const {ctx} = this;
        ctx.body = {
            user:ctx.user
        }
    }
}

module.exports = AuthController;