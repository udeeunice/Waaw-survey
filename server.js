const {globalvariables } = require('./config/configuration');
const Mongostore = require('connect-mongo');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const User = require('./models/user');
const randomstring = require("randomstring")
const Survey = require('./models/survey');
const ejs = require('ejs');
const passport = require('passport');
const Localstrategy =require('passport-local').strategy;
const flash = require('connect-flash');
const session = require('express-session')





const userId = randomstring.generate({
    length: 12,
    charset: 'alphanumeric'
  });
//DB Connection
mongoose.connect('mongodb://localhost/shaaSurvey')
.then(dbconnect => console.log('Database connection successful'))
.catch(error => console.log('Database connection error'));



//Setting up express
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (express.static(path.join(__dirname, 'public')));
app.use(globalvariables);



app.use(session({
    secret:'My secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: Date.now() + 3600000},
    store: Mongostore.create({
        mongoUrl: 'mongodb://localhost/waawnonymous',
        ttl: 14 * 24 * 60 * 60
    })
}));




app.set ('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) =>{ res.render('index')});
app.get('/survey', (req,res) =>{ res.render('survey')});
app.get('/success', (req,res)=>{res.render('success')});
app.get('/successfully', (req,res)=>{res.render('successfully')});
// app.get('/success', (req,res) =>{ res.render('success',{useridinsuccesspage:useridfromserver})});
// app.get('/', (req,res) =>{ res.render('redirect')});

//used to collect user data into the database
app.post('/', (req,res) =>{
    let {firstName, lastName, emailAddress, phoneNo, } = req.body;
    
    let user = new User({
        firstName:firstName, 
        lastName:lastName, 
        emailAddress:emailAddress, 
        phoneNo:phoneNo, 
        userId : userId });
        user.save()
        .then((data)=>console.log('User created successfully',data))
        .catch((error)=>console.log('Error creating User', error))
        res.render('success', {userid : userId, firstName: firstName})
});


app.post('/survey', (req,res) =>{
    let {title, description, location, startDate, endDate} = req.body;

    let Surveydata = new Survey({
        title:title,
        description:description,
        location:location,
        startDate:startDate,
        endDate:endDate
         });

    Surveydata.save()
    .then((data)=>req.flash ('success-message', 'Survey created successfully'))
    .catch((error)=>req.flash('error-message','Error creating Survey'))
    res.redirect('survey')
});



app.listen(port, () => console.log(`Server listening on port:: ${port}`));


