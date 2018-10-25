const locationService = require('./tfnsw/location.service.js');
const memory = require('feathers-memory');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
	// Initialize the messages service
	app.use('messages', memory({
	  paginate: {
	    default: 10,
	    max: 25
	  }
	}));

	console.log('set up location');

	app.use('locations', locationService());
};
