// Program for activity picker website
    // Personal Use 
    // No framework like react


const activityBtn = document.getElementById("activityBtn");
const activityForm = document.getElementById("activityForm");
const activityTable = document.getElementById("activityTable");
const activityInput = document.getElementById("activityInput");
const selectedActivity = document.getElementById("selectedActivity");
const activityRows = document.querySelectorAll("#activityTable tbody tr");

// Retrieve from localStorage or return an empty object if null
let storedData = JSON.parse(localStorage.getItem('myData')) || {"activityList":[], "lastPicked":null, "priority":null};


//Pick a random activity
    //Use math to randomly pick a activity with activity from yesterday not being chosen(SIMPLE)
    //Use Math to randomly pick an acitivty with more recently activties having lower chance of being picked (ADVANCED)
activityBtn.addEventListener("click", ()=>{

    while(storedData.activityList && storedData.lastPickeds){

        const randIndex = Math.floor(Math.random() * storedData.activityList.length);
        const pickedObject = storedData.activityList[randIndex];

        if(pickedObject.name == storedData.lastPicked.name){
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
    while(activityRows.length > 0){ //Clear all rows from table
        activityRows.forEach(row => row.remove());
    }
    storedData.activityList.forEach((activity, index) => {
        // add the activity to table below as well as JSON
        let row = activityTable.insertRow(1); //index 0: insert at bottom. index 1: insert at top
        let nameCell = row.insertCell(0);
        let lastDateCell = row.insertCell(0);
        let priorityCell = row.insertCell(0);

        nameCell.innerHTML = activity.name;
        lastDateCell.innerHTML = "";
        priorityCell.innerHTML = "";

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