
const typed = new Typed('.text',{
    strings : ['GX','GX'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 100,
    loop: true 
});

// const file = document.getElementById("avatar");
// console.log(file);

const output = document.querySelector(".output");
document.getElementById('avatar').onchange = function () {
    var src = URL.createObjectURL(this.files[0])
    document.getElementById('image').src = src
}

