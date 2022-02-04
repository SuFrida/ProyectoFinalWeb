//const { render } = require('ejs');
const express = require('express');
let verify = require('./../middleware/verifyAccess')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

const Task = require('./../models/task');
const User = require('./../models/user');

//const router = express.Router();
const router = express();

router.get('/', verify, async (req, res) => {
    console.log(req.userId)
    let tasks = await Task.find({user_id: req.userId})
    console.log(tasks)

    res.render('index', {tasks});
})

router.get('/widgets', verify, async(req, res) => {
    res.render('widgets')
})

router.get('/app-profile', verify, async(req, res) => {
    console.log('profile page')
})

router.get('/form-editor', verify, async(req, res) => {
    res.render('form-editor')
})

router.get('/page-login', async(req, res) => {
    res.render('page-login')
})

router.post('/page-login', async(req, res) => {
    let email = req.body.email
    let plainpassword = req.body.password
    let user = await User.findOne({email: email})

    if(!user) {
        res.redirect('/login')
    }
    else {
        let valid = await bcrypt.compareSync(plainpassword, user.password)

        if(valid){
            let token = jwt.sign({id: user.email}, process.env.SECRET, {expiresIn:"1h"})
            console.log(token)
            res.cookie('token', token, {httpOnly: true})
            res.redirect('/')
        }
        else {
            res.redirect('/page-login')
        }
    }
})

router.get('/page-register', async(req, res) => {
    res.render('page-register')
})

router.post('/addUser', async(req, res) => {
    let user = new User(req.body)

    user.password = bcrypt.hashSync(user.password, 10)
    await user.save()

    res.redirect('/page-login')
})

router.get('/logoff', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router;