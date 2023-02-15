const authService = require('../services/authService');

exports.getLogin = (req, res) =>{

    res.render('login');
}

exports.postLogin = async (req, res) =>{

    const {username, password} = req.body;
    try {
     const token = await authService.login(username, password);
     res.cookie('auth', token);
    }
    catch(err) {
       
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        res.render('register', {error: errors[0]})
    }
    res.redirect('/');
}

exports.getRegister = (req, res) =>{

    res.render('register')
}

exports.postRegister = async (req, res) =>{

    const {username, email, password, rePassword} = req.body;

    try{
        const token = await authService.register(username, email, password, rePassword);
        res.cookie('auth', token);
    }
    catch(err){
        return res.render('register', {err})
    }

    res.redirect('/');
}

exports.getLogout = (req, res) =>{

    res.clearCookie('auth');
    res.redirect('/');
}