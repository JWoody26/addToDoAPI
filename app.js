
const express = require('express')
const app = express()
const port = 3000
const Joi = require('joi')
const session = require('express-session')
const path = require('path')
var thisSession;


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/).required(),
})

app.use(express.json());
app.use(session({
    secret: "Thisismysecret",
    cookie: { maxAge: 10000},
    saveUninitialized: false,
    resave: false,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'vite-project')));

let users = [];

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/dashboard', (req, res) => {
    res.sendFile('./vite-project/recipes.html', {root:__dirname})
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/signin')
})

app.get('/signup', (req, res) => {
    res.sendFile('./vite-project/signup.html', {root:__dirname})
})

app.post('/signup', (req, res) => {
    const data = req.body
    const validation = schema.validate(data);
    

    if(validation.error !== undefined) {
        res.status(400).send("Please try to sign up again" + validation.error + "<a href=\'/signup'> Back to SignUp Page</a>");
        return;
    }
    
    

    for(i = 0; i < users.length; i++){
        if(users[i].email === data.email){
            console.log("User exists")
            res.status(400).send("User already exists. Please try to sign up again <a href=\'/signup'> Back to SignUp Page</a>")
            return
        }
        console.log(i)
    }
    users.push(data);
    console.log(users);
    res.send("Signup successful\n Go to <a href=\'/signin'>LogIn Page</a>")

})


app.get('/signin', (req, res) => {
    thisSession = req.session;
 if(thisSession.email){
        console.log("You have logged in")
        res.redirect('/dashboard')
    }else
res.sendFile('./vite-project/index.html', {root:__dirname})

})

app.post('/signin', (req, res) => {
    const data = req.body
    
    const validation = schema.validate(data);

    if(validation.error !== undefined) {
        res.status(400).send("Please try to sign in again" + validation.error + "<a href=\'/signin'>Back to LogIn</a>");
        return;
    }

   
    
    for(i = 0; i < users.length; i++){
        if(users[i].email === data.email && users[i].password === data.password){
            console.log("You have logged in")
            thisSession = req.session;
            thisSession.email = data.email
            console.log(thisSession)
            res.redirect('/dashboard')
            return
        }
        console.log(i);
    }

    res.status(400).send("Email or Password is incorrect. Please try to sign in again <a href=\'/signin'>Back to LogIn</a>");
    
})

app.listen(port, () => {
    console.log(`App Running port ${port}`)
})

