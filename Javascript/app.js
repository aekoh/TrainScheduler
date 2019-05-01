// SET UP
 // Initialize Firebase


    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB9jy8tZ6CzRAbLhuc8s4nBJk4sW8gJU_c",
      authDomain: "trainscheduler-b11f4.firebaseapp.com",
      databaseURL: "https://trainscheduler-b11f4.firebaseio.com",
      projectId: "trainscheduler-b11f4",
      storageBucket: "", // trainscheduler-b11f4.appspot.com
      messagingSenderId: "232356613633"
    };
    firebase.initializeApp(config);
 
 
 
    var clearInputs = function() {
      $("#name").val("");
      $("#jobTitle").val("");
      $("#first-Shift").val("");
      $("#frequency").val("");
 
  };
 
  // Variable to reference database
  var createUpdate = firebase.database();
 
  // Function when add train button clicked
  $("#addUpdate").on("click",function() {
 
      // User input
      var employeeName = $("#name").val().trim();
      var jobTitle = $("#jobTitle").val().trim();
      var firstShift = $("#first-Shift").val().trim();
      var frequency = $("#frequency").val().trim();
 
      // Create local object to hold user input
      var addInput = {
          name: employeeName,
          job: jobTitle,
          firstShift: firstShift,
          frequency: frequency,

      }
 
      // Adds data to Firbase
      createUpdate.ref().push(addInput);
 
      console.log(addInput.name);
      console.log(addInput.job);
      console.log(addInput.firstShift);
      console.log(addInput.frequency);
      console.log(addInput.minAway);
 
      // Clears input fields
      clearInputs();
 
      return false;
 
 
  });
 
 
  // Creates an event in Firebase
 createUpdate.ref().on("child_added", function(childSnapshot) {
 
  // Event with variables
  var empName = childSnapshot.val().name;
  var jobName = childSnapshot.val().job;
  var firstShift = childSnapshot.val().firstShift;
  var jobFreq = childSnapshot.val().frequency;
 
  console.log(empName);
  console.log(jobName);
  console.log(firstShift);
  console.log(jobFreq);
 
  // Moment.js y'all
  var firstTimeConverted = moment(firstShift, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
 
  var currentTime = moment();
  console.log("Current time: "+ moment(currentTime).format("hh:mm"));
 
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in time: " + diffTime);
 
  var tRemainder = diffTime % jobFreq;
  console.log(tRemainder);
 
  var tMinutesTillTrain = jobFreq - tRemainder;
  console.log("Minutes till train: " + tMinutesTillTrain);
 
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));
 
 // Adds data to table in html
 $("#tables > tbody").append("<tr> <td>" + empName + "</td> <td>" + jobName + "</td> <td>" + firstShift + "</td> <td>" + jobFreq + "</td> <td>" + tMinutesTillTrain + "</td> </tr>");
 
 });