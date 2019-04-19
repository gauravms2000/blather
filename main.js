const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();

var schema=new mongoose.Schema({
	username: String,
	password: String,
	email: String
	},
	{
    versionKey: false // You should be aware of the outcome after set to false
	});

var msgSchema=new mongoose.Schema({
	message: String,
	by: String
	},
	{
    versionKey: false // You should be aware of the outcome after set to false
	});

var urlencodedParser=bodyParser.urlencoded({extended: false});

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/login.html');
});

app.get('/signup.html',(req,res)=>{
	res.sendFile(__dirname+'/signup.html');
});

app.get('/login.html',(req,res)=>{
	res.sendFile(__dirname+'/login.html');
});

app.get('/signup_success',(req,res)=>{
	res.render('signup',{data:data});
});

/*app.get('/login_success',(req,res)=>{
	mongoose.connect('mongodb://localhost:27017/blather', {useNewUrlParser: true});
	var users=mongoose.model('users',schema);
	users.find({},(err,user)=>{
	if(err) throw err;
	res.render('login',{data:login_data,USERS:user});
	//console.log(user[0].username);
	});
});*/

app.get('/login_failed',(req,res)=>{
	res.render('loginerr',{data:login_data});
});

app.post('/signup.ejs',urlencodedParser,(req,res)=>{
	mongoose.connect('mongodb+srv://blather_2019:blather_2019@cluster0-imiwt.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
	var users=mongoose.model('users',schema);
	data=req.body;
	var user=users({username:data.username,password:data.password,email:data.email}).save((err)=>{
	if(err) throw err;
	console.log('Item saved');
	res.redirect('/signup_success');
	});
});

app.post('/login.ejs',urlencodedParser,(req,res)=>{
	mongoose.connect('mongodb+srv://blather_2019:blather_2019@cluster0-imiwt.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
	var users=mongoose.model('users',schema);
	login_data=req.body;
	users.findOne({username:login_data.username,password:login_data.password},(err,user)=>{
	if(err) throw err;
	if(!user)
		{return res.redirect('/login_failed');}
	console.log('Logged Successfully');
	});
	users.find({},(err,user)=>{
	if(err) throw err;
	res.render('login',{data:login_data,USERS:user});
	//console.log(user[0].username);
	});
});

app.get('/chat/:cuser/:ruser',(req,res)=>{
	var chatWith=req.params.ruser;
	var current_user=req.params.cuser;
	var msgCollection;
	//var allMsg;
	console.log(chatWith);
	mongoose.connect('mongodb+srv://blather_2019:blather_2019@cluster0-imiwt.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

	if(current_user.localeCompare(chatWith)==-1)
	{
		var msgCollection=mongoose.model(current_user+'_'+chatWith,msgSchema,current_user+'_'+chatWith);
	}
	else
	{
		var msgCollection=mongoose.model(chatWith+'_'+current_user,msgSchema,chatWith+'_'+current_user);
	}
	msgCollection.find({},(err,msg)=>{
		if(err) throw err;
		var allMsg=msg;

		var users=mongoose.model('users',schema);
		users.find({},(err,user)=>{
		if(err) throw err;
		res.render('chat',{current_user:current_user,req_user:chatWith,USERS:user,msgs:allMsg});
		});
	});
});

app.post('/chatting',urlencodedParser,(req,res)=>{
	var chatWith=req.body.req_user;
	var current_user=req.body.current_user;
	var msgCollection;
	var MSG=req.body.MSG;
	console.log('In chatting');
	mongoose.connect('mongodb+srv://blather_2019:blather_2019@cluster0-imiwt.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

	if(current_user.localeCompare(chatWith)==-1)
	{
		var msgCollection=mongoose.model(current_user+'_'+chatWith,msgSchema,current_user+'_'+chatWith);
	}
	else
	{
		var msgCollection=mongoose.model(chatWith+'_'+current_user,msgSchema,chatWith+'_'+current_user);
	}

   	msgCollection({message:MSG,by:current_user}).save((err)=>{
   		if(err) throw err;
   		console.log('Message saved');
   	});

	res.json(req.body);
});

app.listen(3000);