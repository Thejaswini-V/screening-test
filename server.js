const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');
const bodyParser=require('body-parser');
const app=express();
const port=3000;
app.use(cors());
app.use(bodyParser.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'db',
})
app.post('/register',(req,res)=>{
    const{name, mail, password, dob, desg, sal, exp, dept, id}=req.body;
    const sql='INSERT INTO employees(name, mail, password, dob, desg, sal, exp, dept, id) VALUES (?,?,?,?,?,?,?,?,?)';
    const values=[name, mail, password, dob, desg, sal, exp, dept, id];
    db.query(sql,values,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:'Error'});
        }
        res.status(200).json({message:'Registration success'});
    })
})
app.get('/register',(req,res)=>{
    const sql='SELECT * from employees';
    db.query(sql,(error,results)=>{
        if(error){
            console.log(error);
            return res.status(500).json({error:'error'});
        }
        res.status(200).json(results);

    })
})
app.listen(port);