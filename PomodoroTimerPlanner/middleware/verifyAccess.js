let jwt = require("jsonwebtoken")

function verifyToken(req, res, next)
{
    let token = req.cookies.token || '';

    if(!token)
    {
        return res.redirecct('/page-login')
    }
    else
    {
        jwt.verify(token, process.env.SECRET, function(err, datos)
        {
            if(err)
            {
                console.log(err)
                return res.redirect('/page-login')
            }
            else {
                req.userId = datos.id
                next()
            }
        })
    }
}

module.exports = verifyToken