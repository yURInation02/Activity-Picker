// Program for activity picker website
    // Personal Use 
    // No framework like react


const activityBtn = document.getElementById("activityBtn");
const activityForm = document.getElementById("activityForm");
const activityTable = document.querySelector("#activityTable tbody");
const activityInput = document.getElementById("activityInput");
const selectedActivity = document.getElementById("selectedActivity");

//localStorage.clear();


// Retrieve from localStorage or return an empty object if null
let storedData = JSON.parse(localStorage.getItem('myData')) || {"activityList":[], "lastPicked":null, "priority":null};


//Pick a random activity
    //Use math to randomly pick a activity with activity from yesterday not being chosen(SIMPLE)
    //Use Math to randomly pick an acitivty with more recently activties having lower chance of being picked (ADVANCED)
activityBtn.addEventListener("click", ()=>{
    if(storedData.activityList){
        while(true){

            const randIndex = Math.floor(Math.random() * storedData.activityList.length);
            const pickedObject = storedData.activityList[randIndex];
    
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
        console.log("Please Add activities first...");
    }
    

    // Save the updated version back to localStorage
    saveToStorage();
    updateTable();
})


//Generate a list of objects using Class constructor. 
    //Each Object = An acitivty (name, last date, priority)
    //String Submitted from the form -> object.name
    //Date of it was entered -> object.lastDate
        //Update lastDate when chosen randomly

activityForm.addEventListener("submit", event =>{
    event.preventDefault();

    const activity = activityInput.value.trim();
    const newActivity = {"name":activity, "lastUpdateDate":null, "priority":null};

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
        console.log("Please enter an activity")
    }
})


function updateTable(){
    //Code to delete all the rows (Overhaul of all table/its rows related variables)
    while(activityTable.rows.length > 0){
        activityTable.deleteRow(0);
        console.log("check");
    }
    storedData.activityList.forEach((activity, index) => {
        // add the activity to table below as well as JSON
        let row = activityTable.insertRow(); //index 0: insert at bottom. index 1: insert at top
        let nameCell = row.insertCell(0);
        let lastDateCell = row.insertCell(1);
        let priorityCell = row.insertCell(2);

        nameCell.innerHTML = activity.name;
        lastDateCell.innerHTML = "null";
        priorityCell.innerHTML = "null";

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