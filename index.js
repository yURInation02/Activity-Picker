// Program for activity picker website
    // Personal Use 
    // No framework like react

const activityBtn = document.getElementById("activityBtn");
const activityForm = document.getElementById("activityForm");
const activityTable = document.getElementById("activityTable");
const activityInput = document.getElementById("activityInput");

//Pick a random activity
    //Use math to randomly pick a activity with activity from yesterday not being chosen(SIMPLE)
    //Use Math to randomly pick an acitivty with more recently activties having lower chance of being picked (ADVANCED)

//Generate a list of objects using Class constructor. 
    //Each Object = An acitivty (name, last date, priority)
    //String Submitted from the form -> object.name
    //Date of it was entered -> object.lastDate
        //Update lastDate when chosen randomly

activityForm.addEventListener("submit", event =>{
    event.preventDefault();

    const activity = activityInput.value;

    if(activity){
        try{
            // add the activity to table below as well as JSON
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        displayError("Please Enter an activity");
    }
})