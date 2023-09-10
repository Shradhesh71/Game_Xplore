function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(()=>{ 
        x.className = x.className.replace("show", ""); }, 3000);
}
const root = document.documentElement;
const eye = document.getElementById('eyeball');
const beam = document.getElementById('beam');
const passwordInput = document.getElementById('password');

root.addEventListener('mousemove', (e) => {
  let rect = beam.getBoundingClientRect();
  let mouseX = rect.right + (rect.width / 2);  
  let mouseY = rect.top + (rect.height / 2);
  let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
  let degrees = (rad * (22 / Math.PI) * -1) - 350;

  root.style.setProperty('--beamDegrees', `${degrees}deg`);
});

eye.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle('show-password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'
  passwordInput.focus();
});

let text,validIcons,invalidIcons;

function valid(item , validIcon , invalidIcon){
  text = document.querySelector(`#${item}`);
  text.style.opacity = "1";
  validIcons = document.querySelector(`#${item} .${validIcon}`);
  validIcons.style.opacity='1';
  invalidIcons = document.querySelector(`#${item} .${invalidIcon}`);
  invalidIcons.style.opacity="0";
}

function invalid(item , validIcon , invalidIcon){
  text = document.querySelector(`#${item}`);
  text.style.opacity = "0.5";
  validIcons = document.querySelector(`#${item} .${validIcon}`);
  validIcons.style.opacity='0';
  invalidIcons = document.querySelector(`#${item} .${invalidIcon}`);
  invalidIcons.style.opacity="1";
}

function textChange(){
  if(password.value.match(/[A-Z]/) != null)
      valid('capital' , 'fa-check' , 'fa-times');
  else
      invalid('capital' , 'fa-check' , 'fa-times');

  if(password.value.match(/[0-9]/) != null)
      valid('number' , 'fa-check' , 'fa-times');
  else
      invalid('number' , 'fa-check' , 'fa-times');
  
  if(password.value.match(/[!@#$%^&*]/) != null)
      valid('special-char' , 'fa-check' , 'fa-times');
  else
      invalid('special-char' , 'fa-check' , 'fa-times');

  if(password.value.length >= 8)
      valid('more-than-8' , 'fa-check' , 'fa-times');
  else
      invalid('more-than-8' , 'fa-check' , 'fa-times');
}

function closeNav() {
  document.getElementById("validator").style.display = "block";
}

// const both = document.querySelector('.both');
// const next = document.querySelector('.next');
// const back = document.querySelector('.back');

// next.addEventListener('click', ()=>{
//   both.classList.add('active');
// });
// back.addEventListener('click', ()=>{
//   both.classList.remove('active');
// });

