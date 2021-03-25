const express=require('express');
const route=express.Router();

const userController=require('../controllers/userController');

route.post("/register",userController.register);

route.post("/login",userController.login);

route.get("/logout",userController.logout);

module.exports=route;