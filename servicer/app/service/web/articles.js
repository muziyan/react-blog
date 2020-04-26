const Service = require("egg").Service;

class ArticlesService extends Service{
    async index(){
        let sql = `
        select article.id as id , article.title as title , article.cover as cover , 
        article.description as description , article.context as context , 
        DATE_FORMAT(article.created_at, '%Y-%m-%d %H:%i:%S') as date , category.category_name
        as category_name from article left join category on article.category_id = category.id order by article.created_at desc;
        `;

        const articles = await this.app.mysql.query(sql)

        articles.forEach(v=>{
            v.path = `/article/${v.id}`;
        })

        return articles
    }

    async find(id){
        let sql = `
        select article.id as id , article.title as title , article.cover as cover , 
        article.description as description , article.context as context , DATE_FORMAT(article.created_at, 
        '%Y-%m-%d %H:%i:%S') as date , category.category_name
        as category_name from article left join category on article.category_id = category.id where article.id = ${id};
        `;
        return await this.app.mysql.query(sql)
    }

    async search(text){
        let sql = `select article.id as id , article.title as title , article.cover as cover , 
        article.description as description , article.context as context , DATE_FORMAT(article.created_at, 
        '%Y-%m-%d %H:%i:%S') as date from article where title like "%${text}%" or context like "%${text}%" or description like "%${text}%"`;
        const articles = await this.app.mysql.query(sql)
        if (articles.length){
            articles.forEach(v=>{
                v.path = `/article/${v.id}`;
            })
        }
        return articles
    }

}

module.exports = ArticlesService