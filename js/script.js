//socket config
const socket = io();

socket.on('message', message => {
    outputOrder(message);
});
socket.on('accept', accept => {
    outputAccept(accept);
});
socket.on('ready', ready => {
    outputReady(ready);
});

const orderPage = document.getElementById("orderpage");
const recievePage = document.getElementById("recievepage");
const addOrder = document.querySelector(".addOrder");
const submitButton = document.querySelector(".submitOrder");
const recieveList = document.querySelector(".recieveList");
const mainOrdList = document.querySelector(".ordered")
const navPage = document.querySelector(".nav")
const loginbutton = document.querySelector(".formButton")
const loginPage = document.querySelector(".loginPage")
const custLoginPage = document.querySelector(".custLoginPage")
const custFormButton = document.querySelector(".custFormButton")
const custname = document.querySelector("#custName")
const cusDetlOrd = document.querySelector(".cusDetlOrd")


//first page

function recieveView() {
    loginPage.style.display = "grid";
    navPage.style.display = "none";
}
function orderView() {
    custLoginPage.style.display = "grid";
    navPage.style.display = "none";
}

//login page

loginbutton.addEventListener('click', e => {
    e.preventDefault();
    loginPage.style.display = "none";
    recievePage.style.display = "block";
})

custFormButton.addEventListener('click', e => {
    var customerName = custname.value;
    if (customerName == "") {
        alert("empty");
        e.preventDefault();

    } else {
        e.preventDefault();
        custLoginPage.style.display = "none";
        orderPage.style.display = "block";

        var custID = Math.floor(Math.random() * 1000000);
        custname.value = ""
        const custNameDiv = document.createElement("div");
        custNameDiv.innerHTML = "Customer name - " + customerName;
        cusDetlOrd.appendChild(custNameDiv);
        const custIdDiv = document.createElement("div");
        custIdDiv.innerHTML = "Customer ID - " + custID;
        cusDetlOrd.appendChild(custIdDiv);
    }

});

//eventlist
submitButton.addEventListener('click', e => {
    e.preventDefault();
    var text = addOrder.value;
    if (text == "") {
        alert("empty order..u not hungry or wot!!")
    }
    else {
        socket.emit('serverOrder', text);
        orderLocal();
    }

});

function outputOrder(message) {

    var text = addOrder.value;

    //
    //recieve page
    //new div for order in recieve page
    //
    const ordRecDiv = document.createElement("div")
    ordRecDiv.classList.add("OrdRecDiv")

    // finally the item in recieve page
    const ordRecItem = document.createElement("li")
    ordRecItem.innerHTML = `${message}`
    ordRecItem.classList.add("ordRecItem")
    ordRecDiv.appendChild(ordRecItem)

    //button to accept the order
    const ordAccept = document.createElement("button")
    ordAccept.classList.add("ordAccept")
    ordAccept.innerHTML = "Accept"
    ordRecDiv.appendChild(ordAccept)

    recieveList.appendChild(ordRecDiv)
}
function orderLocal() {
    var text = addOrder.value;

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

    mainOrdList.appendChild(mainOrdDiv)

    addOrder.value = ""
}

document.addEventListener('click', (e) => {
    if (e.target.classList == "ordAccept") {
        e.preventDefault();
        var target = e.target;
        var parent = target.parentNode;
        var superparent = parent.parentNode
        var index = [].indexOf.call(superparent.children, parent);
        socket.emit('serverAccept', index);

        target.remove()
        //Add ready button in recieve
        const ordReady = document.createElement("button")
        ordReady.classList.add("ordReadyBtn")
        ordReady.innerHTML = "Order Ready"
        parent.appendChild(ordReady)
    }
})

function outputAccept(accept) {
    mainOrdList.childNodes[accept].lastChild.innerHTML = "Cooking";
    mainOrdList.childNodes[accept].lastChild.style.background = "orange";

}


document.addEventListener('click', (e) => {
    if (e.target.classList == "ordReadyBtn") {
        e.preventDefault();
        var target = e.target;
        var parent = target.parentNode;
        var superparent = parent.parentNode
        var index = [].indexOf.call(superparent.children, parent);
        socket.emit('serverReady', index);

        target.remove()
    }
})

function outputReady(ready) {
    mainOrdList.childNodes[ready].lastChild.innerHTML = "Ready";
    mainOrdList.childNodes[ready].lastChild.style.background = "green";
}
