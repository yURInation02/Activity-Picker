// Program for activity picker website
    // Personal Use 
    // No framework like react


const activityBtn = document.getElementById("activityBtn");
const activityForm = document.getElementById("activityForm");
const activityTable = document.querySelector("#activityTable tbody");
const activityInput = document.getElementById("activityInput");
const priorityInput = document.getElementById("priorityInput");
const selectedActivity = document.getElementById("selectedActivity");
const errorMsg = document.getElementById("errorMsg");

//localStorage.clear();

// Retrieve from localStorage or return an empty object if null
let storedData = JSON.parse(localStorage.getItem('myData')) || {"activityList":[], "lastPicked":{}};


//Pick a random activity
    //✅Use math to randomly pick a activity with activity from yesterday not being chosen(SIMPLE)
    //Use Math to randomly pick an acitivty with more recently activties having lower chance of being picked (ADVANCED)
activityBtn.addEventListener("click", ()=>{
    if(storedData.activityList){
        while(true){

            pickedObject = weightedRandomPick(storedData.activityList);

            console.log(pickedObject);

            errorMsg.style.display = "none";
    
            if(storedData.lastPicked && pickedObject.name == storedData.lastPicked.name){
                continue;
            }
            else{
                storedData.lastPicked = null;
                storedData.lastPicked = pickedObject;
    
                selectedActivity.textContent = pickedObject.name;
                selectedActivity.style.display = "block";
                break;
            }
        }
    }
    else{
        //Add Message to show when no activity is in a list
        errorMsg.textContent = "Please Add activities first...";
        errorMsg.style.display = "block";
    }
    

    // Save the updated version back to localStorage
    saveToStorage();
    updateTable();
})


//Add a new activity (and its priority) as an object
activityForm.addEventListener("submit", event =>{
    event.preventDefault();

    //take value from HTML form
    const activity = activityInput.value.trim();
    const priority = priorityInput.value;

    //object constructor
    const newActivity = {"name":activity,
                        "lastUpdateDate":new Date().toISOString().split("T")[0], //initial lastUpdateDate = date created
                        "priority":priority};

    errorMsg.style.display = "none";

    if(activity){
        try{

            //add the new activity object to the array of objects on localStorage, then reset the HTML input
            storedData.activityList.push(newActivity);
            activityInput.value = "";

            saveToStorage();
            updateTable();
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        errorMsg.textContent = "Type in an activity to add";
        errorMsg.style.display = "block";
    }
})

//Function for weighted random picker
function weightedRandomPick(activities) {
    const now = new Date();
  
    // Calculate weight as the number of days since the item was added, and priority
    const activitiesWithWeights = activities.map(activity => {
        //New array of objects with weight value for each activity
      const lastUpdate = new Date(activity.lastUpdateDate);
      const timeDiff = now - lastUpdate;
      const daysSinceUpdate = Math.max(1, Math.floor(timeDiff / (1000 * 60 * 60 * 24))); // At least 1 day
      return { ...activity, weight: daysSinceUpdate * activity.priority };
    });
  
    const totalWeight = activitiesWithWeights.reduce((sum, activity) => sum + activity.weight, 0);
    let random = Math.random() * totalWeight;
  

    //Iterate through all the acitivity and pick one item. And return that item
    for (let i = 0; i < activitiesWithWeights.length; i++) {
        const activity = activitiesWithWeights[i];
        if (random < activity.weight) {
          // Update the original array's lastUpdateDate
          activities[i].lastUpdateDate = now.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
          return activities[i];
        }
        random -= activity.weight;
    }
  }

//Function to generate each rows of the activity table after each action (addition, deletion, picked..)
function updateTable(){
    //delete all the rows (Overhaul of all table/its rows related variables)
    while(activityTable.rows.length > 0){
        activityTable.deleteRow(0);
        console.log("check");
    }
    storedData.activityList.forEach((activity, index) => {
        // add the activity to table below
        let row = activityTable.insertRow();
        let nameCell = row.insertCell(0);
        let lastDateCell = row.insertCell(1);
        let priorityCell = row.insertCell(2);

        nameCell.innerHTML = activity.name;
        lastDateCell.innerHTML = activity.lastUpdateDate;
        priorityCell.innerHTML = activity.priority;

        row.onclick = () =>{
            storedData.activityList.splice(index, 1) //remove item on click
            saveToStorage();
            updateTable();
        }
    })
}

//function to save the array of activity objects to localStorage everytime an action is done to the array.
function saveToStorage(){
    localStorage.setItem('myData', JSON.stringify(storedData));
}

updateTable();