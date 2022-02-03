const { render } = require('ejs');
const express = require('express');
let verify = require('./../middleware/verifyAccess')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

const Task = require('./../models/task');
const User = require('./../models/user');

const router = express.Router();


router.get('/', async (req, res) => {
    res.render('index');
})

router.get('/index', async(req, res) => {
    res.render('index')
})

router.get('/page-login', async(req, res) => {
    res.render('page-login')
})

router.get('/page-register', async(req, res) => {
    res.render('page-register')
})

router.get('/widgets', async(req, res) => {
    res.render('widgets')
})

router.get('/app-profile', async(req, res) => {
    console.log('profile page')
})

router.get('/form-editor', async(req, res) => {
    res.render('form-editor')
})

router.get('/logoff', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router;