const nodemailer = require('nodemailer');
const express = require('express')
const cors = require('cors')
require('dotenv').config(); 
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = express.Router();
app.use(router);

const port = process.env.PORT || 3002

var transport = {
  host: 'ns0.ovh.net',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

app.post('/send', (req, res, next) => {    
  
    var fullname = req.body.name
    var email = req.body.email
    var topic = req.body.topic
    var text = req.body.text
    var content = `fullname: ${fullname} \n topic: ${topic} \n text: ${text} `
  
    var mail = {
      from: email,
      to: 'contact@borisjerrar.fr',
      subject: topic,
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          err,
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  app.listen(port)