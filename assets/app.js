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
    var firstTime = moment(firstTrainInput, 'h:mm a').format('h:mm a');
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "h:mm a").subtract(1, "years");
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Current Time
    var currentTime = moment()
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
        nextArrival: moment(nextTrain).format('h:mm a'),
        minutesAway: tMinutesTillTrain
    })
    nameInput = $('#train-name-input').val('')
    destinationInput = $('#destination-input').val('')
    firstTrainInput = $('#first-train-input').val('')
    frequencyInput = $('#frequency-input').val('')
    
})

database.ref().on('child_added', function(snapshot){
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


// issues noted:
//      min away does not update, both in real time, as well as when the screen is refreshed
            // have all the input fields push to database, and do timing calculation when we do database.ref()?






