"use strict"

const Service = require("egg").Service;


class UserService extends Service{
    async index(){
        let sql = "select user.id as id , user.username as username , user.type  from user";
        const users = await this.app.mysql.query(sql)
        users.forEach(v=>{
            v.key = v.id;
        })
        return users;
    }

    async find(id){
        return this.app.mysql.get("user",{id})
    }

    async create({username,password,type}){
        return this.app.mysql.insert("user",{username,password,type})
    }

    async update({id,username,password,type}){
        return this.app.mysql.update("user",{
            id,
            username,
            password,
            type
        })
    }

    async destroy(id){
        const result = await this.app.mysql.delete("user",{
            id:id
        })
        return result;
    }

    async checkUsername(username){
        let users =  await this.app.mysql.query("select username from user where username = ?",username)
        return !!users.length;
    }

}

module.exports = UserService