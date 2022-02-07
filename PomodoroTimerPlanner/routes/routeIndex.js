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
    res.render('index');
})

router.post('/add', verify,  async(req, res) => {
    try {
        let titulo = req.body.titulo
        let task = new Task({titulo})
        task.user_id = req.userId
        await task.save()
        res.redirect('/widgets')
    } catch(err) {
        console.log(err)
    }
})

router.get('/widgets', verify, async(req, res) => {
    let tasks = await Task.find({user_id: req.userId})
    //console.log(tasks)

    res.render('widgets', {tasks})
})

router.get('/app-profile', verify, async(req, res) => {
    console.log('profile page')
})

router.get('/form-editor/:id', verify, async(req, res) => {
    let id = req.params.id
    let task  = await Task.findById(id)
    res.render('form-editor', {task})
    
})

router.post('/form-editor/:id', verify, async(req, res) => {
    console.log(req.body)

    await Task.updateOne({_id: req.params.id}, req.body)
    
    res.redirect('/widgets')
})

router.get('/delete/:id', verify, async(req, res) => {
    let id = req.params.id
    await Task.remove({_id: id})
    res.redirect('/widgets')
})

router.get('/status/:id', verify, async(req, res) => {
    let id = req.params.id
    let task = await Task.findById(id)
    task.status = !task.status
    await task.save()

    console.log('status')

    res.redirect('/widgets')
})

router.get('/page-login', async(req, res) => {
    res.render('page-login')
})

router.post('/page-login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})
    
    if(!user) {
        res.redirect('/page-register')
    }

    try{
        await bcrypt.compareSync(password, user.password)

        const token = jwt.sign({user_id: user.email}, process.env.SECRET, {expiresIn:"1h"})
        res.cookie("token", token, {httpOnly:true})
        res.redirect('/')
    } catch(err) {
        res.redirect('/page-login')
    }
})

router.get('/page-register', async(req, res) => {
    res.render('page-register')
})

router.post('/page-register', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({email, password});
        await user.save();

        const token = jwt.sign({user_id: user.email}, process.env.SECRET, {expiresIn:"1h"});
        res.redirect('/page-login')
    } catch (err) {
        console.log(err)
    }
})

router.get('/logoff', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router;