const { sequelize } = require('../models');
const AuthValidator = require('../validators/auth.validator');
const jwt = require('jsonwebtoken');

class AuthController {
  
  constructor(){
    this.validator = new AuthValidator();
  }
  
  validateAccount = (req, res) => {
    
  }
  
  register = async (req, res) => {
    const response = this.validator.validateRegister(req.body);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    const t = await sequelize.transaction();
    
    const structuredData = {...data, userData: {email: data.email, password: data.password}};
    let user = sequelize.models.Client;
    if(data.name){
      user = sequelize.models.Company;
    }
    
    await user.create(structuredData, {transaction: t, include: ['userData']})
      .then((result) => {
        t.commit();
        //TODO send email
        return res.status(201).json({success: true, message: 'Account created'});
      })
      .catch((err) => {
        t.rollback();
        
        return res.status(400).json({success: false, message: 'Email already used'});
      });
  }
  
  login = async (req, res) => {
    const response = this.validator.validateLogin(req.body);
    const data = response?.value;
    
    if(!data){
      return res.status(400).json({success: false, message: response.error});
    }
    
    await sequelize.models.UserData.findOne({where: {email: data.email}})
      .then(async (userData) => {
        if(!userData){
          return res.status(400).json({success: false, message: 'Email not found'});
        }
        
        if(!userData.validated){
          return res.status(400).json({success: false, message: 'Email not validated'});
        }
        
        if(!userData.authenticate(data.password)){
          return res.status(400).json({success: false, message: 'Wrong password'});
        }
        
        let user = await sequelize.models.Client.findOne({where: {associatedId: userData.id}})
          .then((user) => user)
          .catch(() => null);
        if(!user){
          user = await sequelize.models.Company.findOne({where: {associatedId: userData.id}})
            .then((user) => user)
            .catch(() => null);
        }
        
        if(!user){
          user = await sequelize.models.Admin.findOne({where: {associatedId: userData.id}})
            .then((user) => user)
            .catch(() => null);
        }
        
        if(!user) {
          res.clearCookie('token');
          return res.status(400).json({success: false, message: 'User not found'});
        }
        
        const token = jwt.sign({id: userData.id, updatedAt: userData.updatedAt}, process.env.TOKEN, {expiresIn: 86400});
        
        res.cookie('token', token, {secure: process.env.NODE_ENV !== 'development', sameSite: 'none'});
        return res.status(200).json({success: true, message: 'Logged in', model: user});
      })
      .catch((err) => res.status(400).json({success: false, message: err.message}));
  }
  
  logout = (req, res) => {
    res.clearCookie('token');
    return res.sendStatus(200);
  }
  
  refresh = async (req, res) => {
    const cookie = req.cookies?.token;
    if(!cookie){
      return res.status(400).json({success: false, message: 'No cookie'});
    }
    
    const token = await jwt.verify(cookie, process.env.TOKEN, (err, user) => {
      if(!err)
        return user;
    });
    
    if(!token){
      return res.status(400).json({success: false, message: 'Invalid token'});
    }
    
    await sequelize.models.UserData.findByPk(token.id)
      .then(async data => {
        if(Date.parse(data.updatedAt) != Date.parse(token.updatedAt)){
          res.clearCookie('token');
          return res.status(400).json({success: false, message: 'Token outdated'}); 
        }
        
        let user = await sequelize.models.Client.findOne({where: {associatedId: data.id}})
          .then((user) => user)
          .catch(() => null);
        if(!user){
          user = await sequelize.models.Company.findOne({where: {associatedId: data.id}})
            .then((user) => user)
            .catch(() => null);
        }
        
        if(!user){
          user = await sequelize.models.Admin.findOne({where: {associatedId: data.id}})
            .then((user) => user)
            .catch(() => null);
        }
        
        if(!user) {
          res.clearCookie('token');
          return res.status(400).json({success: false, message: 'User not found'});
        }
        
        const newToken = jwt.sign({id: data.id, updatedAt: data.updatedAt}, process.env.TOKEN, {expiresIn: 86400});
        
        res.cookie('token', newToken, {secure: process.env.NODE_ENV !== 'development', sameSite: 'none'});
        return res.status(200).json({success: true, model: user});
      })
      .catch(err => {
        return res.status(400).json({success: false, message: err.message});
      });
  }
  
}

module.exports = AuthController;