var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const {Employee} = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/employee',(req,res,next)=> {
  Employee.find({}, (err,data)=> {
    res.json(data);
  })
})

router.get('/employee/:id',(req,res,next)=> {
  const id = req.params.id;
  Employee.findById(id, (err,data)=>{
    if(data) res.json(data)
    else res.send(err);
  })
})

module.exports = router;
