const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();


app.use(express.static(__dirname + "/public"));

app.get("/api/cours", function (req, res) {

  let content = fs.readFileSync("cours.json", "utf8");
  let courses = JSON.parse(content);
  res.send(courses);
});

app.get("/api/cours/:id", function(req, res) {

  let id = req.params.id;
  let content = fs.readFileSync("cours.json", "utf8");
  let courses = JSON.parse(content);
  let cours;

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == id) {
      cours = courses[i];
      break;
    }
  }

  if (cours) {
    res.send(cours);
  } else {
    res.status(404).send("Cours isn't found");
  }

});

app.post("/api/cours", jsonParser, function (req, res) {
  
  if (!req.body) res.sendStatus(400);

  let cName = req.body.name;
  let cPlan = req.body.plan;
  let cAuth = req.body.auth;
  let cTest = req.body.test;
  let cUser = req.body.user;


  let cours = {name: cName, plan: cPlan, auth: cAuth, test: cTest,  user: cUser};

  let data = fs.readFileSync("cours.json", "utf8");
  let courses = JSON.parse(data);

  let id = Math.max(...courses.map((cours) => cours.id));
  
  if (Number.isFinite(id)) {
    cours.id = id + 1;
  } else {
    cours.id = 1;
  }
  
  courses.push(cours);

  data = JSON.stringify(courses);
  fs.writeFileSync("cours.json", data);
  res.send(cours);
});

app.delete("/api/cours/:id", function (req, res) {

  let id = req.params.id;
  let data = fs.readFileSync("cours.json", "utf8");
  let courses = JSON.parse(data);
  let index = -1;

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == id) {
      index = i;
      break;
    }
  }

  if (index > -1) {
      const cours = courses.splice(index, 1)[0];
          data = JSON.stringify(courses);
          fs.writeFileSync("cours.json", data);
         
          res.send(cours);
  } 
  else {
    res.status(404).send("Cours isn't found by ID");
  }
});

app.put("/api/cours", jsonParser, function (req, res) {

  if (!req.body) res.status(400).send("Failed to change");
  
  let cId = req.body.id;
 

  let cName = req.body.name;
  let cPlan = req.body.plan;
  let cAuth = req.body.auth;
  let cTest = req.body.test;
  let cUser = req.body.user;


  let data = fs.readFileSync("cours.json", "utf8");
  let courses = JSON.parse(data);
  let cours;

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == cId) {
      cours = courses[i];
      break;
    }
  }

  if (cours) {
    cours.name = cName;
    cours.plan = cPlan;
    cours.auth = cAuth;
    cours.test = cTest;
    cours.user = cUser;


    let data = JSON.stringify(courses);
    fs.writeFileSync("cours.json", data);
    res.send(cours);
  } 
  else {
    res.status(404).send(courses);
 
  }
});














app.get("/api/users", function (req, res) {

  let content = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(content);
  res.send(users);
});

app.get("/api/users/:id", function(req, res) {

  let id = req.params.id;
  let content = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(content);
  let user;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      user = users[i];
      break;
    }
  }

  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User isn't found");
  }

});

app.post("/api/users", jsonParser, function (req, res) {
  
  if (!req.body) res.sendStatus(400);

  let uName = req.body.name;
  let uSurname = req.body.surname;
  let uLogin = req.body.login;
  let uRole = req.body.role;
  let uPassword = req.body.password;
  let uCourses = req.body.courses;
  let uEmail = req.body.email;
  let uTel = req.body.tel;


  let user = {name: uName, surname: uSurname, login: uLogin, role: uRole, password: uPassword, courses: uCourses, email:uEmail, tel: uTel };

  let data = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(data);

  let id = Math.max(...users.map((user) => user.id));
  
  if (Number.isFinite(id)) {
    user.id = id + 1;
  } else {
    user.id = 1;
  }
  
  users.push(user);

  data = JSON.stringify(users);
  fs.writeFileSync("users.json", data);
  res.send(user);
});

app.delete("/api/users/:id", function (req, res) {

  let id = req.params.id;
  let data = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(data);
  let index = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      index = i;
      break;
    }
  }

  if (index > -1) {
      const user = users.splice(index, 1)[0];
          data = JSON.stringify(users);
          fs.writeFileSync("users.json", data);
         
          res.send(user);
  } 
  else {
    res.status(404).send("User isn't found by ID");
  }
});


app.put("/api/users", jsonParser, function (req, res) {

  if (!req.body) res.status(400).send("Failed to change");
  
  let uId = req.body.id;
 

  let uName = req.body.name;
  let uSurname = req.body.surname;
  let uLogin = req.body.login;
  let uRole = req.body.role;
  let uPassword = req.body.password;
  let uCourses = req.body.courses;
  let uEmail = req.body.email;
  let uTel = req.body.tel;

  let data = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(data);
  let user;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == uId) {
      user = users[i];
      break;
    }
  }

  if (user) {
    user.name = uName;
    user.surname = uSurname;
    user.login = uLogin;
    user.role = uRole;
    user.password = uPassword;
    user.courses = uCourses;
    user.email = uEmail;
    user.tel = uTel;

    let data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(user);
  } 
  else {
    res.status(404).send(users);
  }
});



const bodyParser = require('body-parser');
///const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');


// View engine setup
//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/send', (req, res) => {
  res.send(
    `<h1 style='text-align: center'><br><br></h1>
    <p class="full">
   <a href='http://localhost:4200/invaint'>http://localhost:4200/invaint</a>
  </p>`
    
  );
});

app.post('/api/send', (req, res) => {

  const output = `
  <p>Link for add for new cours</p>

  <h3>
  <a href='http://localhost:4200/invaint'>http://localhost:4200/invaint</a>
  </h3>

 
`;
 

let userEmail = req.body;
console.log("ll")

  
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 587,
    secure: false, 
    auth: {
        user: 'maryangular1907@mail.ru', 
        pass: 'ouryW0plKhTjBeDzRwRS'  
    },
    tls:{
      rejectUnauthorized:false
    }
  });



  let mailOptions = {
      from: '"Nodemailer Contact" <maryangular1907@mail.ru', 
      to: userEmail.email, 
      subject: 'Node Contact Request', 
      text: 'Hello world?', 
      html: output 
  };


  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });




app.listen(3000, function() {
  console.log("Server started");
});



