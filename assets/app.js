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


// Things that need to be addressed:
//                                          First Train Time has to be in military time
//      Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; 
            // only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).
//      Try adding update and remove buttons for each train. Let the user edit the row's elements-- 
            // allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
//      Make it so that only users who log into the site with their Google or GitHub accounts can use your site. 
            // You'll need to read up on Firebase authentication for this bonus exercise.


//      min away does not update, both in real time, as well as when the screen is refreshed
            // have all the input fields push to database, and do timing calculation when we do database.ref()?






