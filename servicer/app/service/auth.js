const Service = require("egg").Service

class AuthService extends Service{
    async getUser(username){
        return await this.app.mysql.get("user", {
            username
        })
    }
}

module.exports = AuthService