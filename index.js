const express = require("express");
const app = express();
const port = 8000 || process.env.port;
require('./db/conn')
const Student = require('./models/students')
    
app.use(express.json());

// 😊 promises
// app.post("/students",(req,res) =>{
//     console.log(req.body)
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>res.status(400).send(e))
// });

// try-catch block

app.get('/',(req,res) =>{
    res.json({message:"hello"})
})
app.post("/students",async (req,res) =>{
    try{
        console.log(req.body)
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e);
        // console.log(e)
    }
})


app.get("/students",async (req,res)=>{
    try {
        const studentsData = await Student.find();
        res.status(201).send(studentsData)
        
    } catch (e) {
        res.status(400).send(e);
        
    }
})

app.get("/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData)
        if(!studentData){
            return res.status(404).send();
        }
        else{
            res.status(201).send(studentData);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})


app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{
            new:true
        });
        res.status(200).send(updateStudents); 

    } catch (e) {
        res.status(404).send(e); 
    }
});



app.delete("/students/:id",async (req,res)=>{
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
        
    } catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port,() =>{
    console.log(`server is listening on port ${port}`);
});
