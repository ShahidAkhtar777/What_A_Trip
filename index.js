// jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine","ejs");
app.set('views','./views');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('views'));

app.get('/',function(req,res){
    res.render("index",{user:0,vertex:"V for Vertex",edges:"Orange for Bus",planes:"Green for Planes"});
});

app.post('/',function(req,res)
{
    let vertex = req.body.vertex;
    let edges = req.body.edges; 
    let planes = req.body.planes;
    res.render('index',{user:1,vertex:vertex,edges:edges,planes:planes});
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});
