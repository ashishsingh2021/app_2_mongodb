var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port=process.env.PORT||3000;   // 1st change to deploy ,
                                    //2nd in package.json start
                                    //3rd specify engine version in engines
                                    // deploy and add the mondodb server link
                                    //4th online mongodb server url inmongoose in db folder
app.use(bodyParser.json());

app.post('/todos', (req, res) => {     // Post data to insert
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});                        //Post ends here



app.get('/todos', (req, res) => {  //Simple get all  elements in db collection
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {   //get document by id
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {   // 404 Not Found The server can not find the requested page. 4xx: Client Error
    console.log(res.status(404).send());
    return res.status(404).send();
  }





  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo}); // Sending as an object
                     // res.send(todo); sending as body
  }).catch((e) => {
    res.status(400).send();
  });
});                                        //get Ends here

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
