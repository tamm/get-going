/* global io */

// Create a websocket connecting to our Feathers server
const socket = io('http://localhost:3030');

// Listen to new messages being created
socket.on('messages created', message =>
  console.log('Someone created a message', message)
);

socket.emit('create', 'messages', {
  text: 'Hello from socket'
}, (error, result) => {
  if (error) throw error
  socket.emit('find', 'messages', (error, messageList) => {
    if (error) throw error
    console.log('Current messages', messageList);
  });
});

if ("geolocation" in navigator) {
  /* geolocation is available */
	navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords);
		socket.emit('find', 'locations', {position: {latitude: position.coords.latitude, longitude: position.coords.longitude}}, (error, locations) => {
			if (error) throw error
				console.log('Locations', locations);
		});
	});
} else {
  /* geolocation IS NOT available */
  alert('The geolocation API is not available');
}

