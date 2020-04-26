const Service = require("egg").Service;

class ArticleService extends Service{
    async index(){
        let sql = `select article.id as id , 
        article.title as title ,category.category_name as category_name ,
         article.created_at as created_at from article,category where article.category_id = category.id`;
        return this.app.mysql.query(sql);
    }

    async show(id){
        return this.app.mysql.get("article",{id})
    }

    async create(body){
        let created_at = this.app.mysql.literals.now;
        body = Object.assign(body,{created_at})
        return this.app.mysql.insert("article",body)
    }

    async update(body){
        return this.app.mysql.update("article",body)
    }

    async destroy(id){
        return this.app.mysql.delete("article", {id})
    }
}


module.exports = ArticleService;