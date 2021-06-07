const orderPage = document.getElementById("orderpage")
const recievePage = document.getElementById("recievepage")
const inputArea = document.getElementById("addOrder")
const submitButton = document.getElementById("submit")
var outputText = document.getElementsByClassName("recieve")


function recieveView() {
    recievePage.style.display = "block"
    orderPage.style.display = "none"
}
function orderView() {
    orderPage.style.display = "block"
    recievePage.style.display = "none"
}

function eventListeners() {
    //Form Submission
    document.querySelector('#form').addEventListener('submit', newTask);

    //Remove tasks from TaskList
    taskList.addEventListener('click', completeTask);

    //Remove tasks from TaskList
    taskList.addEventListener('click', removeTask);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}


submitButton.addEventListener("click", submitClick)

function submitClick(e) {
    var t = document.getElementById("recievepage")
    t.innerHTML = (inputArea.value)
    inputArea.value = ""
}