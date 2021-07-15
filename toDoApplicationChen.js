//creating const elements
const formElement = document.getElementById("formId");
tasksDiv = document.getElementById("taskList");

//creating allTasks object if does not exsist
if (!callSrotage("allTasks")) {
    const allTasks = {};
    updateSrotage("allTasks", allTasks);
}

//displays all tasks on lage load
function allTasksDisplay() {
    const storedTasks = callSrotage("allTasks");
    for (var key in storedTasks) {
        displayTask(storedTasks[key]);
    }
}

//Hellper function for geggint a task object and displays it in the UI
function displayTask(obj) {
    const newTask = document.createElement("div");
    newTask.id = obj["id"];
    const taskDivContent =
        `<button type="button" class="taskBtn btn-l bi bi-x-square-fill" onClick ="removeTask(${obj["id"]})"> 
        </button><br/>
    <div class="innerText">${obj["msg"]}</div><br/>
    <br/> <div class="dateText">${obj["timeStemp"]}</div>
    `;
    newTask.innerHTML = taskDivContent;
    // appending the new task to the UI at task list    
    tasksDiv.appendChild(newTask);
    // add two css classes
    newTask.classList.add("task", "task-faded-in");
    // and remove 'faded-out' in order to fade-in our element
    requestAnimationFrame(() => {
        newTask.classList.remove("task-faded-in")
    });
}

// creates the new task obj from (myInput,targetDate,targetTime)
function taskConstructor(myInputValue, targetDateValue, targetTimeValue) {
    // formElement.preventDefault();
    //deslpay date input
    // timeElement.className = "extraClass";
    //creating taskId and timeStemp
    const d = new Date();
    const taskId = d.getTime();
    // creating the task object
    const task = {};
    task["msg"] = myInputValue.value;
    task["id"] = taskId;
    task["timeStemp"] = `${targetDateValue.value}<br/> ${targetTimeValue.value}`;
    //displaying the task on the browser/UI:
    displayTask(task);
    updateAllTasks(task);
    formElement.reset();
}

// displaying input target date for the task
function timeStempAdd(theTime) {
    allTasks = callSrotage("allTasks");
    allTasks[lastId]["timeStemp"] = theTime.value;
    updateSrotage("allTasks", allTasks);
    taskContent.focus();
    taskContent.value = "";
    taskContent.style.display = "block";
}

//adding task to all tasks
function updateAllTasks(taskObj) {
    allTasks = callSrotage("allTasks");
    allTasks[taskObj.id] = taskObj;
    updateSrotage("allTasks", allTasks);
}

// sroting object in LocalSotrage
function updateSrotage(key, objectToStore) {
    const updateObjectJSON = JSON.stringify(objectToStore);
    localStorage.setItem(key, updateObjectJSON);
}

// getting object from LocalSotrage
function callSrotage(key) {
    const getObject = JSON.parse(localStorage.getItem(key));
    return (getObject);
}

// deletting a task
function removeTask(objectKey) {
    document.getElementById(objectKey).remove();
    allTasks = callSrotage("allTasks");
    delete allTasks[objectKey];
    updateSrotage("allTasks", allTasks);
}

//input valication
function checkField(field) {
    field.style.backgroundColor = null;

    let spanId = `${field.getAttribute('spanId')}`;
    const alertSpan = document.getElementById(spanId);
    alertSpan.innerHTML = "";

    if (field.value === "") {
        field.style.backgroundColor = "red";
        alertSpan.innerHTML += ` <b> חובה למלא </b>`;
        field.focus(); // Focus on the element
        event.preventDefault(); // Prevents from default form 'submit' from occurring
        drawingRadius = 0;
        return 0;
    }
    return 1;
}

// checks input of form, if ok, creates new note
function checkAndCrate(myInput, targetDate, targetTime) {
    if (checkField(myInput) + checkField(targetDate) === 2) {
        taskConstructor(myInput, targetDate, targetTime);
    }
}


//clear form clears the form from red markings 
function clearForm(myInput, targetDate) {

    myInput.style.backgroundColor = "";
    targetDate.style.backgroundColor = "";
    chen1.innerHTML = "";

}

