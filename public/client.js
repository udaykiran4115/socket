//Make connection
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message');
var userName = document.getElementById('userName');
var output = document.getElementById('output');
var btn = document.getElementById('send');
var feedback = document.getElementById('feedback');

//event handler
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    name: userName.value
  })
  message.value = '';
})

message.addEventListener('keypress', function(){
  socket.emit('typing', userName.value)
})

socket.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>'+data.name+'</strong>:'+ data.message +'</p>'
})

socket.on('typing', function(data){
  console.log('IN client feedback..')
  feedback.innerHTML = '<p>' + data +' is typing</p>'
})
