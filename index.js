const express=require('express')
const urls=require('./models/urls')
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()

app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs')

app.listen(process.env.PORT || 5000,()=>{
    console.log("I'm listening")
})

mongoose.connect(process.env.DB_URL,{
    useUnifiedTopology:true,
    useNewURLParser:true
})

app.use(express.json())

app.use(express.static('views'))

app.get("/",async(req,res)=>{
    res.render('index',{urls: await urls.find().exec()})
})

app.post('/url', async(req,res)=>{
    console.log(req.body)
    await urls.create({long : req.body.long})
    res.redirect("/")
})

app.get('/:s',async(req,res)=>{
    const link=await urls.findOne({short: req.params.s})
    if(link!=null){
        link.click++;
        link.save();
        res.redirect(link.long)
    }
    else{
        res.status(404).send("Error 404. Page Not Found")
    }
})