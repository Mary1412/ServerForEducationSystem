const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://127.0.0.1:27017";
const mongoClient = new MongoClient(url);

var ObjectId = require("mongojs").ObjectId;


const bodyParser = require('body-parser')






const getC = (req, res)=>{
    
    mongoClient.connect(function(err, client){
      
        const db = client.db("usersdb");
        const collection = db.collection("cours");
     
        if(err) return console.log(err);
          
        collection.find().toArray(function(err, results){
                     
            console.log(results);
            res.send(results);
            client.close();
        });
    });


};

const postC = (req, res)=>{
    
    mongoClient.connect(function(err, client){
        if (!req.body) res.sendStatus(400);
        let cours = { name: req.body.name, plan: req.body.plan, auth: req.body.auth, test: req.body.test,  user: req.body.test};
        const data = client.db("usersdb");
        const courses = data.collection("cours");
        courses.insertOne(cours, function(err, result){
            
            if(err){ 
             return console.log(err);
            }
            console.log(result);
            console.log(cours);
            res.send(cours);
            client.close();
           });   
      })
    
};


const deleteC = (req, res)=>{
    
    console.log(req.params.id)

    mongoClient.connect(function(err, client){
       
      if(err) return console.log(err);
        
      const db = client.db("usersdb");
      db.collection("cours").deleteOne({"_id": ObjectId(req.params.id)}, function(err, result){
                
          console.log(result);
          client.close();
      });
    })
    
};

const putC = (req, res)=>{
    mongoClient.connect(function(err, client){

    
        if(err) return console.log(err);
          
        const db = client.db("usersdb");
        const col = db.collection("cours");
      if(err) return console.log(err);
  
      id=ObjectId(req.body.id)
      console.log(id)
  
      col.findOneAndUpdate(
    
        {"_id": ObjectId(req.body.id)}, 
        { $set: { name: req.body.name, plan: req.body.plan, auth: req.body.auth, test: req.body.test,  user: req.body.user}}, 
       
        function(err, result){
                 
            console.log(result);
       
            client.close();
        }
    );
  
    });

    
};















const getU = (req, res)=>{
    
    mongoClient.connect(function(err, client){
      
        const db = client.db("usersdb");
        const collection = db.collection("users");
     
        if(err) return console.log(err);
          
        collection.find().toArray(function(err, results){
                     
            console.log(results);
            res.send(results);
            client.close();
        });
    });


};

const postU = (req, res)=>{
    
    mongoClient.connect(function(err, client){
        if (!req.body) res.sendStatus(400);
        let user = {name: req.body.name, surname: req.body.surname, login: req.body.login, role: req.body.role, password: req.body.password, courses: req.body.courses, email:req.body.email, tel: req.body.tel };
        const data = client.db("usersdb");
        const courses = data.collection("users");
        courses.insertOne(user, function(err, result){
            
            if(err){ 
             return console.log(err);
            }
            console.log(result);
            console.log(user);
            res.send(user);
            client.close();
           });   
      })
      
    
};


const deleteU = (req, res)=>{
    
    console.log(req.params.id)

    mongoClient.connect(function(err, client){
       
      if(err) return console.log(err);
        
      const db = client.db("usersdb");
      db.collection("users").deleteOne({"_id": ObjectId(req.params.id)}, function(err, result){
                
          console.log(result);
          client.close();
      });
    })
    
};

const putU = (req, res)=>{
    if (!req.body) res.status(400).send("Failed to change");
  
    let uId = req.body.id;
   
  
    mongoClient.connect(function(err, client){
  
      
      if(err) return console.log(err);
        
      const db = client.db("usersdb");
      const col = db.collection("users");
    if(err) return console.log(err);
  
    id=ObjectId(req.body.id)
    console.log(id)
  
    col.findOneAndUpdate(
  
      {"_id": ObjectId(req.body._id)}, 
      { $set: { name: req.body.name, surname: req.body.surname, 
        login: req.body.login, role: req.body.role, password: req.body.password, courses: req.body.courses,
         email:  req.body.email, tel: req.body.tel }}, 
     
      function(err, result){
               
          console.log(result);
     
          client.close();
      }
  );
  
  });
  
  
    
};



const nodemailer = require('nodemailer');

const getS = (req, res)=>{
    res.send(
        `<h1 style='text-align: center'><br><br></h1>
        <p class="full">
       You invaint to cours
      </p>`
        
      );
}


const postS = (req, res)=>{
    const output = `
    <p>Link for add for new cours</p>
  
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
        text: '', 
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

}

module.exports={
    getC,
    postC,
    deleteC,
    putC,
    getU,
    postU,
    deleteU,
    putU, 
    getS,
    postS
};