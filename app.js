const express = require('express');

const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const userRoute = require('./routes/userRoute');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const store = new MongoDBStore({
    uri: 'mongodb+srv://root:root@nodecluster-7hd5w.mongodb.net/ats_node?retryWrites=true&w=majority',
    collections: 'sessions'
});

app.use(session({ secret: 'secret string', resave: false, saveUninitialized: false, store: store }));

app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/Trainee", (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, "views/trainee.html"));
    }
});

app.get("/Admin", (req, res) => {
    if (req.session.user) {
        if (req.session.user.usertype == 1) {
            return res.sendFile(path.join(__dirname, "views/admin.html"));
        }
        return res.send("Nice Try!!");
    }
    return res.send("404");
});

mongoose.connect('mongodb+srv://root:root@nodecluster-7hd5w.mongodb.net/ats_node?retryWrites=true&w=majority')
    .then(db => {
        app.listen(3000);
        console.log('Server listening to port 3000!');
    })
    .catch(err => {
        console.log(err);
    })
