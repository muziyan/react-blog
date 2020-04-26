const jwt = require('jsonwebtoken')

module.exports = options =>{
    return async function auth(ctx,next){
        if (ctx.header.authorization){
            const userAgent = ctx.header["user-agent"]
            const token = ctx.header.authorization.split(" ")[1];
            const decoded = jwt.verify(token,userAgent)
            const user = await ctx.service.auth.getUser(decoded.username);
            ctx.user = {
                id:user.id,
                username:user.username,
                type:user.type
            }
            await next();
        }else{
            ctx.status = 401;
            ctx.body = {
                message:"Authorization not found!"
            }
        }
    }
}