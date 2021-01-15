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

    callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
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

module.exports = fetchMyIP;