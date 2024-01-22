// ====================================
const tasks = [];
// ====================================
// Functions for input validation purposes.
function validateEmptyInput(input, category, suffix = "") {
  if (input === null)
    return null;
  else if (input.trim().length === 0) {
    alert(`The ${category} field cannot be empty${suffix}. Please try again once it is filled.`);
    return null;
  }

  return input;
}

function printEmptyTaskMessage(actionTypeMessage) {
  alert("There are currently no tasks in the list. Unable to " + actionTypeMessage + ". Please add at least 1 task first.");
}
// ====================================
// Functions for task manipulation. (E.g. Add/View/Modify/Remove/Sort/Duplicate Detection + Removal/etc.)
function addTask() {
  const task = prompt("Enter a new task: ");
  if (validateEmptyInput(task, "task to add") === null)
    return;
  
  tasks.push(task);
  alert(`Task (${task}) successfully added!`);
}

function viewTasks() {
  let taskList = "Tasks:\n\n";

  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; ++i) {
      const task = tasks[i];
      taskList += `${i + 1}. ${task}\n`;
    }
    alert(taskList);
  }
  else
    alert(`The list is currently empty. Unable to view list. Please add at least 1 task first.`);
}

function modifyTask() {
  if (tasks.length == 0) {
    printEmptyTaskMessage("modify any task");
    return;
  }
  
  const task = prompt("Which task from the list would you like to modify? ");
  if (validateEmptyInput(task, "task to modify") === null)
    return;
  
  const taskIndex = tasks.indexOf(task);

  if (taskIndex === -1) {
    alert(`The task, (${task}) does not currently exist in the list. Please try again.`);
    return;
  }
  else {
    const newTask = prompt("Enter the new task name to replace: ");
    tasks[taskIndex] = newTask;
    alert(`Task (${task}) successfully modified to (${newTask})!`);
  }
}

function removeTask() {
  if (tasks.length == 0) {
    printEmptyTaskMessage("remove any task");
    return;
  }

  const task = prompt("Which task from the list would you like to remove? ");
  if (validateEmptyInput(task, "task to remove") === null)
    return;

  const taskIndex = tasks.indexOf(task);

  if (taskIndex === -1) {
    alert(`The task (${task}) does not currently exist in the list. Please try again.`);
    return;
  }
  
  tasks[taskIndex].slice(taskIndex, 1);
  alert(`Task (${task}) successfully removed!`);
}

function sortAlphabeticallyAsc() {
  if (tasks.length == 0) {
    printEmptyTaskMessage("sort the list");
    return;
  }
  
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  // For characters in strings comparisons.
  tasks.sort((a, b) => a.localeCompare(b));
  alert("Successfully sorted list by an alphabetically ascending order.");
}

function sortAlphabeticallyDesc() {
  if (tasks.length == 0) {
    printEmptyTaskMessage("sort the list");
    return;
  }
  
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  // For characters in strings comparisons.
  tasks.sort((a, b) => b.localeCompare(a));
  alert("Successfully sorted list by an alphabetically descending order.");
}

function removeDuplicates() {  
  if (tasks.length == 0) {
    printEmptyTaskMessage("remove duplicate tasks");
    return;
  }
  const uniqueTasks = [];
  const uniqueTaskRepeatCountList = [];
  
  for (let i = 0; i < tasks.length; ++i) {
    const task = tasks[i];
    let elementIndex = uniqueTasks.indexOf(task);
    if (elementIndex === -1) {
      uniqueTasks.push(task);
      uniqueTaskRepeatCountList.push(0);
    }
    else {      
      tasks.splice(i, 1);
      
      ++uniqueTaskRepeatCountList[elementIndex];
      --i;
    }
  }

  var foundDuplicates = false;
  let successfulDisplayMessage = "Successfully removed duplicate task entries.\n\n";
  uniqueTasks.forEach((element, iter) => {
    if (uniqueTaskRepeatCountList[iter] == 0)
      return;
    
      successfulDisplayMessage += `${element}: ${uniqueTaskRepeatCountList[iter]} time(s).\n`;
    if (foundDuplicates === false)
      foundDuplicates = true;
  });
  
  let zeroRepetitionDisplayMessage = "There were no duplicate task entries.";

  alert(foundDuplicates ? successfulDisplayMessage : zeroRepetitionDisplayMessage);
}
// ====================================