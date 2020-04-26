const Service = require("egg").Service;

class CategoryService extends Service{
    async index(){
        return this.app.mysql.select("category");
    }

    async show(id){
        return this.app.mysql.get("category",{id})
    }

    async create(body){
        return this.app.mysql.insert("category",body)
    }

    async update(body){
        return this.app.mysql.update("category",body)
    }

    async destroy(id){
        return this.app.mysql.delete("category", {id})
    }
}


module.exports = CategoryService;