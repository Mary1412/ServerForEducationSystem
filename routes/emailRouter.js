var express=require('express');
var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
var cors = require('./../cors');
const emailRouter = express.Router();
var nodemailer = require('nodemailer');//importing node mailer

emailRouter.route('/')
.options(cors.cors,(req,res)=>{
    console.log("Coming email here");
    res.sendStatus(200);
})


.post(cors.cors,(req,res,next)=>{
  
  console.log("oooo",req.body.email)

  var transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, 
    auth: {
       
        user: 'maryangular1907@mail.ru',
        pass: 'ouryW0plKhTjBeDzRwRS' 
    }
  }); 

 
  var mailOptions = {
    from: 'maryangular1907@mail.ru',
    to: 'novikovamaria993@gmail.com',
    subject: `NodeMail Testing`,
    html:`Node Mail Testing Sucessful`
  };
  


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error') // if error occurs send error as response to client
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
    }
  });
})


module.exports = emailRouter;