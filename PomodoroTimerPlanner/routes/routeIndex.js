const { render } = require('ejs');
const express = require('express');
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

module.exports = router;