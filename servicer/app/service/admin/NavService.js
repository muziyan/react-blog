const Service = require("egg").Service;

class NavService extends Service{
    async index(){
        return this.app.mysql.select("nav");
    }

    async show(id){
        return this.app.mysql.get("nav",{id})
    }

    async create(body){
        return this.app.mysql.insert("nav",body)
    }

    async update(body){
        return this.app.mysql.update("nav",body)
    }

    async destroy(id){
        return this.app.mysql.delete("nav", {id})
    }
}


module.exports = NavService;