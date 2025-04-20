// Program for activity picker website
    // Personal Use 
    // No framework like react

const activityBtn = document.getElementById("activityBtn");
const activityForm = document.getElementById("activityForm");
const activityTable = document.getElementById("activityTable");
const activityInput = document.getElementById("activityInput");
const selectedActivity = document.getElementById("selectedActivity");
const activityRows = document.querySelectorAll("tr");

// const data = {

//     "activityList":[
//         {"name":"Break", "lastUpdateDate": null},
//         {"name":"Guitar", "lastUpdateDate": null},
//         {"name":"Finance", "lastUpdateDate": null}, 
//         {"name":"Game", "lastUpdateDate": null}, 
//         {"name":"E Game", "lastUpdateDate": null},
//         {"name":"Career", "lastUpdateDate": null}, 
//         {"name":"Reading", "lastUpdateDate": null},
//         {"name":"Magic", "lastUpdateDate": null},
//         {"name":"Beatbox", "lastUpdateDate": null},
//         {"name": "Drawing", "lastUpdateDate": null}
//     ],
 
//     "lastPicked":{}
// }

// Save it to localStorage
// localStorage.setItem('myData', JSON.stringify(data));

// Retrieve from localStorage or return an empty object if null
let storedData = JSON.parse(localStorage.getItem('myData')) || {};


//Pick a random activity
    //Use math to randomly pick a activity with activity from yesterday not being chosen(SIMPLE)
    //Use Math to randomly pick an acitivty with more recently activties having lower chance of being picked (ADVANCED)
activityBtn.addEventListener("click", ()=>{

    while(true){

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
})


//Generate a list of objects using Class constructor. 
    //Each Object = An acitivty (name, last date, priority)
    //String Submitted from the form -> object.name
    //Date of it was entered -> object.lastDate
        //Update lastDate when chosen randomly

activityForm.addEventListener("submit", event =>{
    event.preventDefault();

    const activity = activityInput.value.trim();
    const newActivity = {"name":activity, "lastUpdateDate":null};

    if(activity){
        try{
            // add the activity to table below as well as JSON
            let row = activityTable.insertRow(1); //index 0: insert at bottom. index 1: insert at top
            let nameCell = row.insertCell(0);
            //let lastDateCell = row.insertCell(1);

            storedData.activityList.push(newActivity);
            nameCell.innerHTML = newActivity.name;

            activityInput.value = "";

            saveToStorage();
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        console.log("Please enter an activity")
    }
})

activityRows.addEventListener("click", (event)=>{
    //Delete a row that is clicked as well as its corresponding object from storedDate and then update the localStorage
})

function saveToStorage(){
    localStorage.setItem('myData', JSON.stringify(storedData));
}