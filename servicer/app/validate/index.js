module.exports = app =>{

    let {validator,mysql} = app

    validator.addRule("userName", (rule,value)=>{
        getUsername(value).then(res =>{
            console.log(res)
            if (res){
                return "username already exists!"
            }
        });
    })

    const getUsername = async username =>{
        let data = await mysql.query("select username from user where username = ?",username);
        return data.length
    }

}