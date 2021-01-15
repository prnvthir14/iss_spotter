// It will require and run our main fetch function.

const fetchMyIP = require ('./iss');


//call our fetchMyIP function

fetchMyIP((error, myIP) => {

  if (error) {
 
    console.log("It didn't work!" , error);
 
    return;
  }

  console.log('It worked! Returned IP:' , myIP);

});

fetchMyIP()