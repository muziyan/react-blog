class AppBootHook {
    constructor(app) {
        this.app = app
    }

    async didLoad(){
        require("./app/validate")(this.app)
    }
}

module.exports = AppBootHook