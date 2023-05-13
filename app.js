//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const axios = require('axios');
const http = require('http');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/", function(req, res){
  http.get('http://localhost:3000/' , (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    })
    response.on('end' , () => {
      let result = JSON.parse(data);
      res.render("home" , {
        startingContent: result['startingContent'],
        posts: result['posts']
      })
    });
  })
  .on('error' , (error) => {
    console.log(error);
  })
});

app.get("/about", function(req, res){
  http.get('http://localhost:3000/about' , (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    })
    response.on('end' , () => {
      let result = JSON.parse(data);
      res.render("about" , {
        aboutContent: result['aboutContent'],
      })
    });
  })
  .on('error' , (error) => {
    console.log(error);
  })
});

app.get("/contact", function(req, res){
  http.get('http://localhost:3000/contact' , (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    })
    response.on('end' , () => {
      let result = JSON.parse(data);
      res.render("contact" , {
        contactContent: result['contactContent'],
      })
    });
  })
  .on('error' , (error) => {
    console.log(error);
  })
});

app.get("/compose", function(req, res){
  http.get('http://localhost:3000/contact' , (response) => {
    if(response.statusCode === 200){
      res.render("compose")
    }
  })
  .on('error' , (error) => {
    console.log(error);
  })
});

app.post("/compose", function(req, res){
  axios.post('http://localhost:3000/compose?postTitle=' + req.body.postTitle + '&postBody=' + req.body.postBody)
  .then(response => {
      res.redirect("/");
  })
  .catch(error => {
    console.log(error);
  });
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  http.get('http://localhost:3000/posts/' + requestedTitle , (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end' , () => {
      let result = JSON.parse(data);
      res.render("post", {
        title: result['title'],
        content: result['content']
      })
    });
  });
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
