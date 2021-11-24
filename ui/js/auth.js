function Loaded(box = 0){
	toggleBox(box);
}
function showPassword(target, pass){
	if (pass.getAttribute('type') == 'password') {
		target.classList.add('view');
		pass.setAttribute('type', 'text');
	} else {
		target.classList.remove('view');
		pass.setAttribute('type', 'password');
	}
	return false;
}
function signinError(msg){
	if(msg != "") document.getElementById("signin-error-text").textContent = msg;
	var target = document.getElementById("signin-error-box");
	target.classList.add('view');
	setTimeout(()=> { target.classList.remove('view'); }, 5000);
	return false;
}
function signupError(msg){
	if(msg != "") document.getElementById("signup-error-text").textContent = msg;
	var target = document.getElementById("signup-error-box");
	target.classList.add('view');
	setTimeout(()=> { target.classList.remove('view'); }, 5000);
	return false;
}
function getValidvPass(target){
	var input = document.getElementById('signup-password').value;
	if(target.value != input || target.value.length < 6){
		target.setCustomValidity("Пароли должены совпадать");
	}
	else{
		target.setCustomValidity("");
	}
}
function tryLogin(){
	var login = document.getElementById("signin-login").value;
	var password = document.getElementById("signin-password").value;
	mp.trigger('signin', login, password);
}
function tryRegistration(){
	var login = document.getElementById("signup-login");
	var password = document.getElementById("signup-password");
	var vpassword = document.getElementById("signup-vpassword");
	var email = document.getElementById("signup-email");
	if(login.value.length < 1 && password.value.length < 1 && vpassword.value.length < 1 && email.value.length < 1) return;
	if(login.validity.valid && password.validity.valid && vpassword.validity.valid && email.validity.valid)
	{
		mp.trigger('signup', login.value, password.value, email.value);
	}
}
function tryFagot(){
	FagotNf();
}
var boxes = [];

function toggleBox(box){
	if(boxes.length < 1){
		boxes[0] = (document.getElementById("signin-box"));
		boxes[1] = (document.getElementById("signup-box"));
		boxes[2] = (document.getElementById("nfreg-box"));
		boxes[3] = (document.getElementById("fagot-box"));
		boxes[4] = (document.getElementById("nffagot-box"));
	}
	boxes.forEach(i => {
			if(i != null)
			i.style.visibility = 'hidden';
			i.style.opacity = 0;
		});
		boxes[box].style.visibility = 'visible';
		boxes[box].style.opacity = 1;
}
function Registered(){
	toggleBox(2);
	document.getElementById("nfreg-text").textContent = document.getElementById("signup-login").value+",";
	setTimeout(()=>{ toggleBox(0) }, 5000);
}
function FagotNf(){
	toggleBox(4);
	document.getElementById("nffagot-text").textContent = document.getElementById("fagot-email").value;
	setTimeout(()=>{ toggleBox(0) }, 5000);
}