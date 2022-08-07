const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose =require('mongoose')
const { getMaxListeners } = require('../models/User')
const { getMaxListenerss } = require('../models/ProductModel')
AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const admin ={
    email: "admin@gmail.com",
    password: "admin",
}
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName: 'adminbro',
    cookiePassword: 'Password',
    authenticate: async (email,password)=>{
        if (email === admin.email && password===admin.password){
            return admin
        }
        return null
    }
})


module.exports = router