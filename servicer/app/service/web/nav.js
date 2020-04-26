const Service = require("egg").Service;

class NavService extends Service {
    async index(){
        let sql = "select * from nav";
        return await this.app.mysql.query(sql)
    }
}

module.exports = NavService