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
            // const randIndex = Math.floor(Math.random() * storedData.activityList.length);
            // const pickedObject = storedData.activityList[randIndex];

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


//Generate a list of objects using Class constructor. 
    //Each Object = An acitivty (name, last date, priority)
    //Date of it was entered -> object.lastDate
        //Update lastDate when chosen randomly

activityForm.addEventListener("submit", event =>{
    event.preventDefault();

    const activity = activityInput.value.trim();
    const priority = priorityInput.value;
    const newActivity = {"name":activity,
                        "lastUpdateDate":new Date().toISOString().split("T")[0],
                        "priority":priority};

    errorMsg.style.display = "none";

    if(activity){
        try{

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


function weightedRandomPick(activities) {
    const now = new Date();
  
    // Calculate weight as the number of days since the item was added
    const activitiesWithWeights = activities.map(activity => {
      const lastUpdate = new Date(activity.lastUpdateDate);
      const timeDiff = now - lastUpdate;
      const daysSinceUpdate = Math.max(1, Math.floor(timeDiff / (1000 * 60 * 60 * 24))); // At least 1 day
      return { ...activity, weight: daysSinceUpdate * activity.priority };
    });
  
    const totalWeight = activitiesWithWeights.reduce((sum, activity) => sum + activity.weight, 0);
    let random = Math.random() * totalWeight;
  

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


function updateTable(){
    //Code to delete all the rows (Overhaul of all table/its rows related variables)
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

function saveToStorage(){
    localStorage.setItem('myData', JSON.stringify(storedData));
}

updateTable();