
// SET UP 
  // Initialize Firebase


     // Initialize Firebase
     var config = {
      apiKey: "AIzaSyB9jy8tZ6CzRAbLhuc8s4nBJk4sW8gJU_c",
      authDomain: "trainscheduler-b11f4.firebaseapp.com",
      databaseURL: "https://trainscheduler-b11f4.firebaseio.com",
      projectId: "trainscheduler-b11f4",
      storageBucket: "trainscheduler-b11f4.appspot.com",
      messagingSenderId: "232356613633"
    };
    firebase.initializeApp(config);
  
 
    var clearInputs = function() {
      $("#name").val("");
      $("#jobTitle").val("");
      $("#arrival").val("");
      $("#nextShift").val("");
      $("#minAway").val("");
  
  };
  
  // Variable to reference database
  var createUpdate = firebase.database();
  
  // Function when add train button clicked
  $("#addUpdate").on("click",function() {
  
      // User input
      var name = $("#name").val().trim();
      var job = $("#jobTitle").val().trim();
      var arrival = $("#arrival").val().trim();
      var nextShift = $("#nextShift").val().trim();
      var minutes = $("#minAway").val().trim();
      
  
      // Create local object to hold user input
      var addUpdate = {
          name: name, 
          jobTitle: job, 
          arrivalTime: arrival, 
          shiftTime: nextShift,
          minutesAway: minutes

      }
  
      // Adds data to Firbase
      createUpdate.ref().push(addUpdate);

      console.log(addUpdate.name);
      console.log(addUpdate.jobTitle);
      console.log(addUpdate.arrivalTime);
      console.log(addUpdate.shiftTime);
      console.log(addUpdate.minutesAway);
  
      // Clears input fields
      clearInputs();
  
      return false;
  
    }); 


    // Creates an event in Firebase
createTrain.ref().on("child_added", function(childSnapshot) {

  // Event with variables
  var employeeName = childSnapshot.val().name;
  var jobDes = childSnapshot.val().jobTitle;
  var arrivalT = childSnapshot.val().arrivalTime;
  var shiftT = childSnapshot.val().shiftTime;
  var minAw = childSnapshot.val().minutesAway;

  console.log(employeeName);
  console.log(jobDes);
  console.log(arrivalT);
  console.log(shiftT);
  console.log(minAw);

  // Moment.js y'all
  var firstTimeConverted = moment(shiftT, "HH:mm").subtract(1, "years");
  console.log(arrivalTConverted);

  var currentTime = moment();
  console.log("Current time: "+ moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in time: " + diffTime);

  var tRemainder = diffTime % arrivalT;
  console.log(tRemainder);

  var tMinutesTillTrain = arrivalT - tRemainder;
  console.log("Minutes till train: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

// Adds data to table in html
$("#updateSched > tbody").append("<tr> <td>" + employeeName + "</td> <td>" + jobDes + "</td> <td>" + arrivalT + "</td> <td>" + shiftT + "</td> <td>" + minutesAway + moment(nextTrain).format("hh:mm") + "</td> <td>" + tMinutesTillTrain + "</td> </tr>");

});
