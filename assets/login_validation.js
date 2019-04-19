function validate(){
	var username=document.getElementById("user").value;
	var password=document.getElementById("p1").value;
	if(username.trim()=="")
	{
		alert("Enter your username");
		return false;
	}
	if(password=="")
	{
		alert("Enter your password");
		return false;
	}
	return true;
}