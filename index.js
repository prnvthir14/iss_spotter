// // It will require and run our main fetch function.

const nextISSTimesForMyLocation = require ('./iss');


// //call our fetchMyIP function

// fetchMyIP((error, myIP) => {

//   if (error) {
 
//     console.log("It didn't work!" , error);
 
//     return;
//   }

//   console.log('It worked! Returned IP:' , myIP);

// });

// fetchMyIP()

// // The code below is temporary and can be commented out.
// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('142.122.84.196', (error, coordinates) => {
  
//   if (error) {
  
//     console.log("It didn't work!" , error);
  
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);

// });

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {

//     console.log("It didn't work!" , error);
//     return;

//   }

//   console.log('It worked! Returned flyover times:' , passTimes);

// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

nextISSTimesForMyLocation()