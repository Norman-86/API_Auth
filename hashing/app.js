//hashing a string (str) using md5 algorithm 
// const crypto = require('crypto');
// const md5sum = crypto.createHash('md5');
// let str = 'Hello';
// const res = md5sum.update(str).digest('hex');
// console.log(res);

//using HMAC to verify originator of the data with its authenticity 
// const crypto = require('crypto');
// const hashingSecret = 'ARandomSecretKey';
// const plainText = 'Hello World!';
// const hashedStr = crypto.createHmac('sha256', hashingSecret).update(plainText).digest('hex');
// console.log(hashedStr);

//hashing using plain text plus salt 
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const plainText = 'Hello World';
// bcrypt.genSalt(saltRounds).then(salt => console.log(salt));

// combining the above snippet into one
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const plainText = 'Hello World';
// const salt = '$2b$10$R811nQH3YdI2HB3aA8wkMO'
// bcrypt.genSalt(saltRounds).then(salt => {
//     bcrypt.hash("Hello World", salt).then(hash => (console.log(hash)))
// });

// auto generation of salt
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const plainText = 'Hello World';
// bcrypt.hash(plainText, saltRounds).then(hash => console.log(hash));

//matching user password with the hashed string stored in the db
// const loginPasswordString = 'Hello World'
// const hash = '$2b$10$tQmrYUXnRukoMpUl1sFSb..8.0.XfWdJXImZfOPru1MK4QeK8znIC';
// bcrypt.compare(loginPasswordString, hash).then(result => console.log(result));

//post request with hashing 
// const express = require('express')
// const app = express();
// app.use(express.json())
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const pass = 'ReskillAmericans123';
// bcrypt.hash(pass, saltRounds).then(hash => console.log(hash));

// app.post('/password', (req, res) => {
//     const pass = '';
//     const hash = '$2b$10$o2FiOX6zMAgHx6NLGBY5pe0/cnTKvwr96o52bosF61OBlFcz9B9Y2'
//     bcrypt.compare(pass, hash).then(result => console.log(result));
//     if (pass === 'ReskillAmericans123') {
//         res.status(200).json({ message: 'You are logged in' })
//     }
//     else if (!pass) {
//         res.status(404).json({message: 'Please enter your pass'})
//     }
//     else {
//         res.status(500).json({message: 'Acess denied!'})
//     } 
// });

// app.listen(3000, ()=> console.log('Serving port 3000'))


//version 3
const express = require('express')
const app = express();
app.use(express.json())
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = 'ReskillAmericans123';
let hashedPassword = bcrypt.hashSync(plainText, saltRounds);

app.post('/login', (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({ message: 'password required'})
    }
    let match = bcrypt.compareSync(req.body.password, hashedPassword);
    if (match) {
        return res.status(200).json({message: 'password correct!'})
    } else {
        return res.status(400).json({message: 'invalid password'})
    }
    });

app.listen(3000, () => console.log('Serving port 3000'))