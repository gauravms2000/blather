const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const express=require('express');

mongoose.connect('mongodb://localhost:27017/blather', {useNewUrlParser: true});

var msgSchema=new mongoose.Schema({
	message: String,
	by: String
	},
	{
    versionKey: false // You should be aware of the outcome after set to false
	});

var schema=new mongoose.Schema({
	username: String,
	password: String,
	email: String
	},
	{
    versionKey: false // You should be aware of the outcome after set to false
	});


//mongoose.connect('mongodb://localhost:27017/blather', {useNewUrlParser: true});
var msgCollection= new mongoose.model('gauravkamal',msgSchema,'random');
/*msgCollection({message:'checking',by:'gaurav'}).save((err)=>{
	if(err) throw err;
	console.log('Item saved');
});*/
