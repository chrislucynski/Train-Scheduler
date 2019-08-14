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

    var tFrequency = frequencyInput;
    var firstTime = moment(firstTrainInput, 'HH:mm').format('HH:mm');
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    database.ref().push({
        name: nameInput,
        destination: destinationInput,
        frequency: frequencyInput,
        nextArrival: moment(nextTrain).format('hh:mm'),
        minutesAway: tMinutesTillTrain
    })
    console.log(nextTrain)
})

database.ref().on('child_added', function(snapshot){
    console.log(snapshot.val())
    var row = $('<tr>')
    var nameDisplay = $('<td>')
    var destinationDisplay = $('<td>')
    var frequencyDisplay = $('<td>')
    var nextArrivalDisplay = $('<td>')
    var minutesAwayDisplay = $('<td>')

    nameDisplay.text(snapshot.val().name) 
    destinationDisplay.text(snapshot.val().destination) 
    frequencyDisplay.text(snapshot.val().frequency) 
    nextArrivalDisplay.text(snapshot.val().nextArrival) 
    minutesAwayDisplay.text(snapshot.val().minutesAway) 

    row.append(nameDisplay, destinationDisplay, frequencyDisplay, nextArrivalDisplay, minutesAwayDisplay)
    $('#data-fill').append(row)
})





