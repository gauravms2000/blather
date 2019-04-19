function input(x){
	x=x.trim();
	return x;
}
function validate(){
	var username=input(document.getElementById("user").value);
	var p1=document.getElementById("p1").value;
	var p2=document.getElementById("p2").value;
	var email=input(document.getElementById("email").value);
	if(username=="")
	{
		alert("Please enter a username");
		return false;
	}
	if(!username.match(/^[a-zA-Z0-9_]*$/))
	{
		alert("Username can have alpha-numeric character and underscore only");
		return false;
	}
	if(p1=="")
	{
		alert("Please enter a password");
		return false;
	}
	if(p1.length<6)
	{
		alert("Password must be atleast 6 character long");
		return false;
	}
	if(p1!=p2)
	{
		alert("Password doesn't match");
		return false;
	}
	if(email=="")
	{
		alert("Please enter a valid Email-id");
		return false;
	}
	if(!email.match(/\S+@\S+\.\S+/))
	{
		alert("Invalid Email");
		return false;
	}
	return true;
}