// const search = document.getElementById('search');

// search.addEventListener('search', (e) =>{
// //     e.preventDefault();
// });

// const socket = io();
// // const sendbtn =  document.getElementById("sendbtn");
// const messageinput = document.getElementById("inputmessage");
// const allmessages = document.getElementById("messages");
// const form = document.getElementById('formMain');

//         // const overlay = document.getElementById('overlay');
//         // const popupBox = document.getElementById('popup-box');
//         // const nameInput = document.getElementById('name-input');
//         // const submitButton = document.getElementById('submit-name');
//         // const profile = document.getElementById('profile');

//         // Function to show the pop-up
//         // function showPopup() {
//         //     overlay.style.display = 'block';
//         //     popupBox.style.display = 'block';
//         // }
//         // Show the pop-up when the page loads
//         // window.addEventListener('load', showPopup);

//         // submitButton.addEventListener('click', () => {
//             // const userName = nameInput.value;
//             // alert(`Hello, ${userName}!`);
//             // overlay.style.display = 'none';
//             // popupBox.style.display = 'none';
//             // proname.innerHTML=userName;
//         // });
// console.log("main: ");

//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
//             console.log("form: ");
//             const message = messageinput.value;
//             if (message) {
//               socket.emit('user-message', message);
//               messageinput.value ='';
//             }
//         });
//         socket.on('message', message=> {
//           console.log("socket: ",message);
//             const item = document.createElement('div');
//             // const v = document.getElementById("div");
//             // v.className = "proname";
//             // item.textContent = message;
//             item.innerHTML = `<div class="messageRight">${message}</div>`;
//             allmessages.appendChild(item);
//             // allmessages.appendChild(v);
//             window.scrollTo(0, document.body.scrollHeight);
//         });

// document.addEventListener("DOMContentLoaded", function () {
//     const chatBox = document.getElementById("chat-box");
//     const messageInput = document.getElementById("message-input");
//     const sendButton = document.getElementById("send-button");

//     sendButton.addEventListener("click", function () {
//       const message = messageInput.value;
//       if (message.trim() !== "") {
//         addMessage("You", message, true);
//         messageInput.value = "";
//         // You can add logic here to simulate responses from the other side.
//       }
//     });

//     function addMessage(sender, text, isUser) {
//       const messageDiv = document.createElement("div");
//       messageDiv.classList.add("message", isUser ? "user" : "opponent");
//       messageDiv.innerHTML = `<span class="sender">${sender}:</span> ${text}`;
//       chatBox.appendChild(messageDiv);
//     }
//   });

// front
//  <script>
//       const socket = io();
//       const sendBtn = document.getElementById("sendBtn");
//       const messageInput = document.getElementById("inputmessage");
//       const allMessages = document.getElementById("messages");

//       socket.on("message", (message) => {
//         const p = document.createElement("div");
//         p.innerText = message;
//         allMessages.appendChild(p);
//       });

//       sendBtn.addEventListener("click", (e) => {
//         const message = messageInput.value;
//         console.log(message);
//         socket.emit("user-message", message);
//       });

//         const socket = io();
//         // const sendbtn =  document.getElementById("sendbtn");
// const messageinput = document.getElementById("inputmessage");
// const allmessages = document.getElementById("messages");
// const form = document.getElementById('formMain');
// const sendBtn = document.getElementById('sendBtn');

// console.log("main: ");

//         // for
//         sendBtn.addEventListener("click", (e) => {
//             const message = messageinput.value;
//             console.log(message);
//             socket.emit("user-message", message);
//         });
//         socket.on('message', message=> {
//             console.log("socket: ", message);
//             const item = document.createElement('div');
//             item.innerHTML = `<div class="messageRight">${message}</div>`;
//             allmessages.appendChild(item);
//             // window.scrollTo(0, document.body.scrollHeight);
//         });
// </script>

const socket = io();

const form = document.getElementById("formMain");
const messageInput = document.getElementById("inputmessage");
const messageDiv = document.getElementById("messages");

const name = prompt("Enter your name");
socket.emit("new-user-joined", name);
