const request = require ('request')

// It will contain most of the logic for fetching the data from each API endpoint.

//fetch our public ip address

// fetchMyIP which will asynchronously return our IP Address using an API.

const fetchMyIP = function (callback) {

  //use api call, obtain and return IP address or error 
  request.get('https://api.ipify.org?format=json',(error,response,body) => {
    
  
    if (error){
    //if there is an error, then return values is null
    return callback(error,null);

    }
    
    
    if (response.statusCode !== 200){

    callback(Error(`Status Code ${response.statusCode} whhile fetching IP: ${body}`), null);
    return;
    }
  
    // console.log(error)
    // console.log(response)
    // console.log(body)
    const myIP = JSON.parse(body).ip
      
    callback(null,myIP)

    });

  } 


// fetchMyIP()


const fetchCoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
  
  if (error) {
  
    callback(error, null);
    return;
  
    }

    if (response.statusCode !== 200) {
      
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });

  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    
    if (error) {
    
      callback(error, null);
      return;
   
    }

    if (response.statusCode !== 200) {
   
      callback(Error(`Status Code ${response.statusCode} while fetching ISS pass times: ${body}`), null);
      return;
   
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });

};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    
    if (error) {
    
      return callback(error, null);
    
    }

    fetchCoordsByIP(ip, (error, loc) => {
      
      if (error) {
      
        return callback(error, null);
      
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          
          return callback(error, null);
        
        }

        callback(null, nextPasses);

      });

    });
 
  });

};


module.exports = nextISSTimesForMyLocation;

//not needed since we are now calling all the here in iss.js
// module.exports = {fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes}
