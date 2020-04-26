'use strict';

const Controller = require('egg').Controller;
const fs = require("fs")
const oss = require('ali-oss');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async upload(){
    const {ctx} = this;
    let file = ctx.request.files[0]
    let date = this.app.mysql.literals.now;
    let fileName = file.filename+date+Math.random(0,9)+Math.random(0,9);
    file = fs.readFileSync(file.filepath)

    const client = new oss({
      accessKeyId: process.env.ACCESS_KEY_ID,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      bucket: process.env.BUCKET,
      region: process.env.REGION,
    });

    let {url} = await client.put(fileName,file,{
      mime: 'text/plain'
    })
    ctx.body = {
      fileUrl:url
    }
  }
}

module.exports = HomeController;
