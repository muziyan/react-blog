/* eslint valid-jsdoc: "off" */

'use strict';

const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  mysql : {
    // 单数据库信息配置
    client: {
      // host
      host: process.env.HOST,
      // 端口号
      port: process.env.PORT,
      // 用户名
      user: process.env.USERNAME,
      // 密码
      password: process.env.PASSWORD,
      // 数据库名
      database: process.env.DATABASE,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
  security : {
    domainWhiteList: [
        process.env.WEB_URL,
        process.env.ADMIN_URL
    ],
    csrf:{
      enable:false
    }
  },
  keys : "jhjkhkhkj",
  middleware:['errorHandler'],
  errorHandler: {
    match: '/api/admin',
  },
  multipart : {
    mode: 'file',
  },
}