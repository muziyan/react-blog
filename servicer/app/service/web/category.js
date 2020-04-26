const Service = require("egg").Service;

class CategoryService extends Service{
    async index(){
        let sql = `select * from category`;
        return await this.app.mysql.query(sql)
    }

    async find(id){
        let sql = `select * from category where id = ${id}`
        return await this.app.mysql.query(sql)
    }

    async findArticle(id){
        let sql = `
        select article.id as id , article.title as title , article.cover as cover , 
        article.description as description , article.context as context , 
        DATE_FORMAT(article.created_at, '%Y-%m-%d %H:%i:%S') as date , category.id as category_id , category.category_name
        as category_name from category left join article on category.id = article.category_id  where category.id = ${id};
        `
        const articles = await this.app.mysql.query(sql)

        articles.forEach(v=>{
            v.path = `/article/${v.id}`;
        })

        return articles
    }
}

module.exports = CategoryService