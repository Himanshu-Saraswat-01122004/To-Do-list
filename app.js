const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TODO', { useNewUrlParser: true, useUnifiedTopology: true });
const trySchema = new mongoose.Schema({
    name: String
});
const item = mongoose.model('task', trySchema);
const todo1 = new item({
    name: "Reading Bhagwat Geeta"
});
const todo2 = new item({
    name: "Listening Music"
});
const todo3 = new item({
    name: "Watching Movies"
});

// todo.save();
// todo2.save();
// todo3.save();

app.get('/', function (req, res){
    item.find({}).then(function(result) {
        res.render('list', {exej : result});
    })
    .catch(function (err) {
        console.log(err);
    });
});
app.post('/', function(req, res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name: itemName
    });
    todo4.save();
    res.redirect('/');
});
// app.post('/delete', function(req, res){
//     const deleteItem = req.body.checkbox1;
//     var id = item.findById(deleteItem);
//     id.remove();
//     console.log("Deleted Successfully!")
//     res.redirect('/');
// });
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});