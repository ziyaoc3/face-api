const express = require('express');

const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./component/register.js');
const signIn = require('./component/signin.js');
const profile = require('./component/profile.js');
const image = require('./component/image.js');

app.use(express.json());
app.use (cors());



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ziyaochen',
    password : '',
    database : 'smart-brain'
  }
});


app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)} );

app.post ('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} );

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} );

app.put('/image', (req, res) => {image.handleImage(req, res, db)} );
app.post('/imageURL', (req, res) => {image.handleApp(req, res)} );
	

app.listen(3000 , () => {
	console.log ('it is working ');
});