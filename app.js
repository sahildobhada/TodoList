const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose")
const app=express();
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))
const url="mongodb+srv://sahil_Dobhada:sahil30102001@cluster0.nnqiyhy.mongodb.net/todolist?retryWrites=true&w=majority"
mongoose.connect(url).then(()=>{
    console.log("successfully connected to database");
})
const todoschema=mongoose.Schema({
    name:{
        type:String,
        require:[true,"item required compolusory"]
    },
    day:{
        type:String,
    }
})
var todaydate;

const items=mongoose.model("items",todoschema);



app.get("/",function(req,res){
    var day=new Date();
   
    var object={
        weekday:"long",
        day:"numeric",
        month:"long",
    }
    day=day.toLocaleDateString('en-US',object)
    todaydate=day;
    items.find({day:todaydate}).then((x)=>{
        var itemlist=[]
        x.forEach((value)=>{
            itemlist.push(value.name)
        })
        res.render("list",{currentday:day,item:itemlist})
      
     })
    
});
app.post("/",function(req,res){
    var item=req.body.itemname;
    if(item!=""){
        const item1=new items({
            name:item,
            day:todaydate
        })
        item1.save()
    }
    res.redirect("/");
});

app.post("/delete",function(req,res){
    items.deleteOne({name:req.body.checkbox}).then(()=>{
        console.log("sucessfully deleted");
    })
    res.redirect("/");
})


app.listen(process.env.PORT || 3000);