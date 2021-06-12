const orderPage = document.getElementById("orderpage");
const recievePage = document.getElementById("recievepage");
const addOrder = document.querySelector(".addOrder");
const submitButton = document.querySelector(".submitOrder");
const recieveList = document.querySelector(".recieveList");
const mainOrdList = document.querySelector(".ordered")


//Navbar 

function recieveView() {
    recievePage.style.display = "block";
    orderPage.style.display = "none";
}
function orderView() {
    orderPage.style.display = "block";
    recievePage.style.display = "none";
}

//eventlist
submitButton.addEventListener('click', addItem);


function addItem(e) {
    // the input text
    var text = addOrder.value;

    //
    //recieve page
    //new div for order in recieve page
    //
    const ordRecDiv = document.createElement("div")
    ordRecDiv.classList.add("OrdRecDiv")

    // finally the item in recieve page
    const ordRecItem = document.createElement("li")
    ordRecItem.innerHTML = text
    ordRecItem.classList.add("ordRecItem")
    ordRecDiv.appendChild(ordRecItem)

    //button to accept the order
    const ordAccept = document.createElement("button")
    ordAccept.classList.add("ordAccept")
    ordAccept.innerHTML = "Accept"
    ordRecDiv.appendChild(ordAccept)


    //
    //main page list
    //new div to mainlist
    //
    const mainOrdDiv = document.createElement("div")
    mainOrdDiv.classList.add("mainOrdDiv")

    //Add the order to main div
    const MainOrdItem = document.createElement("li")
    MainOrdItem.innerHTML = text
    MainOrdItem.classList.add("mainOrdItem")
    mainOrdDiv.appendChild(MainOrdItem)

    //status of the order in main
    const ordStatus = document.createElement("div")
    ordStatus.classList.add("ordStatus")
    ordStatus.innerHTML = "Waiting for Conformation"
    mainOrdDiv.appendChild(ordStatus)

    //
    //add to the recieve page and main page
    //
    recieveList.appendChild(ordRecDiv)
    mainOrdList.appendChild(mainOrdDiv)

    addOrder.value = ""
}

document.addEventListener('click', function (e) {
    if (e.target.classList == "ordAccept") {
        //select the corresponding div on main page
        var target = e.target;
        var parent = target.parentNode;
        var superparent = parent.parentNode
        var index = [].indexOf.call(superparent.children, parent);
        //test
        console.log("index:", index);
        //add cooking status
        mainOrdList.childNodes[index].lastChild.innerHTML = "Cooking"
        mainOrdList.childNodes[index].lastChild.style.background = "green"
        //Add ready button in recieve
        target.remove()
        const ordReady = document.createElement("button")
        ordReady.classList.add("ordReadyBtn")
        ordReady.innerHTML = "Order Ready"
        parent.appendChild(ordReady)

    }
})