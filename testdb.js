const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/blather', {useNewUrlParser: true});
var schema=new mongoose.Schema({
	name: String,
	age: Number
},{
    versionKey: false // You should be aware of the outcome after set to false
});

var users=mongoose.model('users',schema);
var user1=users({name:'ravi',age:20}).save((err)=>{
	if(err) throw err;
	console.log('Item saved');
})