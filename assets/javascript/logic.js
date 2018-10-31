
var config = {
    apiKey: "AIzaSyCbTLhmna9w4FPPOsJCkWLwxgowKbXRHoQ",
    authDomain: "train-scheduler-2f373.firebaseapp.com",
    databaseURL: "https://train-scheduler-2f373.firebaseio.com",
    projectId: "train-scheduler-2f373",
    storageBucket: "",
    messagingSenderId: "558903949737"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database

  var dataRef = firebase.database();

//Show and update current time. Use setInterval method to update time.
function updateClock() {
  var now = moment(),
      second = now.seconds() * 6,
      minute = now.minutes() * 6 + second / 60,
      hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;
  $('#hour').css("transform", "rotate(" + hour + "deg)");
  $('#minute').css("transform", "rotate(" + minute + "deg)");
  $('#second').css("transform", "rotate(" + second + "deg)");
}
function timedUpdate () {
  updateClock();
  setTimeout(timedUpdate, 1000);
}
timedUpdate();

//  function displayRealTime() {
//    setInterval(function(){
//      $('#current-time').html(moment().format('hh:mm A'))
//      }, 1000);
//    }
//    displayRealTime();
//   Initial Values

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;




// Capture Button Click
$("#add-train").on("click", function(event){
// Code in the logic for storing and retrieving the most recent user.
 event.preventDefault();
 trainName = $("#trainName-input").val().trim();
 destination= $("#destination-input").val().trim();
 frequency= $("#frequency-input").val().trim();
 firstTrain = $("#firstTrain-input").val().trim();
   
 dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain:firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

 });
// Firebase watcher + initial loader HINT: .on("value")
 
dataRef.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrain);
   
    // Store everything into a variable
    var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;

   
   //First time
var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current time
var currentTime = moment();
console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

// Difference between times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Mins until train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
   
   
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
// $("#full-train-list").append("<tr class='full-train-list'><th class='trainName-list'> " +
// childSnapshot.val().trainName + 
// "</th><td class='distination-list'> " + childSnapshot.val().destination +
// "</td><td class='frequency-list'> " + childSnapshot.val().frequency +
// "</td><td class='firstTrain-list'> " + childSnapshot.val().firstTrain +
// "</td><td class='nextArrival-list'> " + childSnapshot.val().nextTrain +
// "</td></th>");

 }, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

    // <tbody id="full-train-list">
  //   <tr>
  //   <th class="trainName-list" scope="row"></th>
  //   <td class="distination-list" ></td>
  //   <td class="firstTrain-list"></td>
  //   <td class="frequency-list"></td>
  //   <td></td>
  //   <td></td>
  // </tr>
    
// Change the HTML to reflect
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
$("#trainName-display").text(snapshot.val().trainName);
$("#distination-display").text(snapshot.val().destination);
$("#frequency-display").text(snapshot.val().frequency);
$("#firstTrain-display").text(snapshot.val().nextTrain);


// Train info
console.log(trainName);
console.log(destination);
console.log(firstTrain);
console.log(frequency);




 

});
      
    