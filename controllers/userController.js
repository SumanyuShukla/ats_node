const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    let data = new Object();
    bcrypt.hash(req.body.password, 2, (err, hash) => {
        if (!err) {
            let user = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                usertype: 2
            });
            user.save()
                .then(result => {
                    data.response = "Success";
                    res.json(data);
                })
                .catch(err => {
                    data.response = "Failed";
                    res.json(data);
                });
        }
    });
}

exports.login = (req, res) => {
    let data = new Object();
    let user = userModel.findOne({
        username: req.body.username
    }).then(result => {
        bcrypt.compare(req.body.password, result.password)
            .then(isMatch => {
                if (isMatch) {
                    data.status = "success";
                    if (result.usertype == 2) {
                        data.role = "Trainee";
                    } else {
                        data.role = "Admin";
                    }
                    req.session.user=result;
                } else {
                    data.status = "Invalid Credentials";
                }
                return res.json(data);
            })
            .catch(err => {
                data.status = "Invalid Credentials";
                return res.json(data);
            });
    })
        .catch(err => {
            data.status = "Invalid Credentials";
            return res.json(data);
            console.log(err);
        });
}

exports.logout=(req,res)=>{
    req.session.destroy(err=>{
        if(!err){
            res.redirect("/");
        }
    })
}