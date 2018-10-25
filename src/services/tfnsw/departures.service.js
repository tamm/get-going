/* eslint-disable no-unused-vars */
const request = require('request-promise');
const fs = require('fs');

const tfnsw = {
  config: {
    apikey: 'NXqGFm7705aprhX4CBGjpLkmE3leDPtVy26z'
  }
}

class Service {
  constructor (options = {}) {
    this.lastUpdated = 0;

  }

  find (params) {
    const service = this;
    console.log(params);

    // cache response in memory for 90 seconds
    if (Date.now() - service.lastUpdated >= 90000) {
      if (!params.query || !params.query.position || !params.query.position.latitude || !params.query.position.longitude ) {
        console.log('no position sent');
        return;
      }
      return request({
        url: `https://api.transport.nsw.gov.au/v1/tp/coord` +
             `?outputFormat=rapidJSON` +
             `&coord=${params.query.position.longitude}%3A${params.query.position.latitude}%3AEPSG%3A4326` +
             `&coordOutputFormat=EPSG%3A4326` +
             `&inclFilter=1` +
             `&type_1=BUS_POINT` +
             `&radius_1=1000` +
             `&PoisOnMapMacro=true` +
             `&version=10.2.1.42`,
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `apikey ${tfnsw.config.apikey}`
        }
      }).then(function receiveLocations(data) {
        service.mediaCache = data;
        service.lastUpdated = Date.now();

        return Promise.resolve(service.mediaCache);
      });
    }

    return Promise.resolve(service.mediaCache);
  }
}

module.exports = function init (options) {
  return new Service(options);
};

module.exports.Service = Service;