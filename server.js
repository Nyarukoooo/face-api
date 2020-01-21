/* What to Do? 
1. /signin --> POST = success/fail
2. /register --> POST = user
3. /profile/:userId --> GET = user
4. /image --> PUT --> user
*/
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'xiaosongweng',
    password : '',
    database : 'face-reco'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
	res.send(db.select('*').from('users'));
})

//signin
app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)});
//app.post('/signin', signin.handleSignin(bcrypt, db));
//register 理解这一部分
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)});
//profile
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
//image
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
//
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
	console.log('app is runing on port 3000');
});