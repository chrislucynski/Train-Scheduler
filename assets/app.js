var firebaseConfig = {
    apiKey: "AIzaSyBmK8cxrEiMPqYqYBg1arWfZxdb4stdozA",
    authDomain: "train-schedule-54500.firebaseapp.com",
    databaseURL: "https://train-schedule-54500.firebaseio.com",
    projectId: "train-schedule-54500",
    storageBucket: "",
    messagingSenderId: "477211195523",
    appId: "1:477211195523:web:2bd2753e4894d5ec"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database()

$('#submit').click(function(event){
    event.preventDefault()
    var nameInput = $('#train-name-input').val()
    var destinationInput = $('#destination-input').val()
    var firstTrainInput = $('#first-train-input').val()
    var frequencyInput = $('#frequency-input').val()

    database.ref().push({
        name: nameInput,
        destination: destinationInput,
        firstTrain: firstTrainInput,
        frequency: frequencyInput
    })
})

database.ref().on('child_added', function(snapshot){
    console.log(snapshot.val())
    var row = $('<tr>')
    var nameDisplay = $('<td>')
    var destinationDisplay = $('<td>')
    var firstTrainDisplay = $('<td>')
    var frequencyDisplay = $('<td>')

    var tFrequency = snapshot.val().frequency;
    // Time is 3:30 AM
    var firstTime = snapshot.val().firstTrain;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    nameDisplay.text(snapshot.val().name) 
    destinationDisplay.text(snapshot.val().destination) 
    firstTrainDisplay.text(snapshot.val().firstTrain) 
    frequencyDisplay.text(snapshot.val().frequency) 

    row.append(nameDisplay, destinationDisplay, firstTrainDisplay, frequencyDisplay)
    $('#data-fill').append(row)
})





