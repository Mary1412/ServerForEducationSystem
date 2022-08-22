const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const {getC, postC, deleteC, putC , getU, postU, deleteU, putU, getS, postS} = require('../controlles/control.js')




router.get("/api/cours", getC);
    
router.post("/api/cours", jsonParser, postC);
  
router.delete("/api/cours/:id", deleteC);
  
router.put("/api/cours", jsonParser, putC);


router.get("/api/users", getU);
    
router.post("/api/users", jsonParser, postU);
  
router.delete("/api/users/:id", deleteU);
  
router.put("/api/users", jsonParser, putU);


router.get("/api/send", getS);

router.post("/api/send", jsonParser, postS);

  module.exports = router;