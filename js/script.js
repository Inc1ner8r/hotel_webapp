const orderPage = document.getElementById("orderpage")
const recievePage = document.getElementById("recievepage")
const addOrder = document.querySelector(".addOrder")
const submitButton = document.querySelector(".submitOrder")
const orderedList = document.querySelector(".orderedList")
var outputText = document.getElementsByClassName("recieve")


function recieveView() {
    recievePage.style.display = "block"
    orderPage.style.display = "none"
}
function orderView() {
    orderPage.style.display = "block"
    recievePage.style.display = "none"
}
submitButton.addEventListener('click', addItem);

function addItem(e) {
    console.log("work")
    //make order div
    const orderDiv = document.createElement("div")
    orderDiv.classList.add("orderItem")
    //order list
    const newOrder = document.createElement("li")
    newOrder.innerText = "hey"
    newOrder.classList.add("newOrderItem")
    orderDiv.appendChild(newOrder)
    //button
    const orderAccept = document.createElement('button')
    orderAccept.innerText = 'accept order'
    orderDiv.appendChild(orderAccept)
    orderedList.appendChild(orderDiv)

}





function submitClick(e) {
    var t = document.getElementById("recievepage")
    t.innerHTML = (inputArea.value)
    inputArea.value = ""
}