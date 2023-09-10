function Strength(password) {
    let i = 0;
    if (password.length > 6) {
      i++;
    }
    if (password.length >= 10) {
      i++;
    }
    if (/[A-Z]/.test(password)) {
      i++;
    }
    if (/[0-9]/.test(password)) {
      i++;
    }
  
    if (/[A-Za-z0-8]/.test(password)) {
      i++;
    }
    return i;
}
  
let container = document.querySelector(".container");
document.addEventListener("keyup",(e) => {
    let password = document.querySelector("#YourPassword").value;
  
    let strength = Strength(password);
    if (strength <= 2) {
      container.classList.add("weak");
      container.classList.remove("moderate");
      container.classList.remove("strong");
    } else if (strength >= 2 && strength <= 4) {
      container.classList.remove("weak");
      container.classList.add("moderate");
      container.classList.remove("strong");
    } else {
      container.classList.remove("weak");
      container.classList.remove("moderate");
      container.classList.add("strong");
    }
  }
);
  
let password = document.querySelector("#YourPassword");
let show = document.querySelector(".showw");
show.onclick = () =>{
    if (password.type === "password") {
      password.setAttribute("type", "text");
      show.classList.add("hide");
    } else {
      password.setAttribute("type", "password");
      show.classList.remove("hide");
    }
};

function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(()=>{ 
        x.className = x.className.replace("show", ""); }, 3000);
}
//  remove last register line
let loregister = document.querySelector(".login-register");
let logtern = document.querySelector(".maininput");
logtern.onclick = () =>{
  loregister.classList.remove('active');
}
