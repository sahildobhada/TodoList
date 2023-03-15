const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))
var prvday="";
var itemlist=[]
app.get("/",function(req,res){
    var day=new Date();
    const arr=["sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var object={
        weekday:"long",
        day:"numeric",
        month:"long",
    }
    day=day.toLocaleDateString('en-US',object)
    if(prvday!=day){
        itemlist=[];
        prvday=day;
    }
    res.render('list',{currentday:day,item:itemlist})
});
app.post("/",function(req,res){
    var item=req.body.itemname;
    if(item!=""){
    itemlist.push(item);
    }
    res.redirect("/");
});




app.listen(process.env.PORT || 3000);