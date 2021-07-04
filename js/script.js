//socket config
const socket = io();

socket.on('message', message => {
    outputOrder(message);
});
socket.on('accept', accept => {
    outputAccept(accept);
});
socket.on('decline', decline => {
    outputdecline(decline);
});
socket.on('ready', ready => {
    outputReady(ready);
});

const orderPage = document.getElementById("orderpage");
const recievePage = document.getElementById("recievepage");
const addOrder = document.querySelector(".addOrder");
const submitButton = document.querySelector(".submitOrder");
const navPage = document.querySelector(".nav")
const loginbutton = document.querySelector(".formButton")
const loginPage = document.querySelector(".loginPage")
const custLoginPage = document.querySelector(".custLoginPage")
const custFormButton = document.querySelector(".custFormButton")
const custname = document.querySelector("#custName")
const cusDetlOrd = document.querySelector(".cusDetlOrd")
const yourOrders = document.querySelector(".yourOrders")

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
    customerName = custname.value;
    if (customerName == "") {
        alert("empty");
        e.preventDefault();

    } else {
        e.preventDefault();
        custLoginPage.style.display = "none";
        orderPage.style.display = "block";

        custID = Math.floor(Math.random() * 1000000);
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
        socket.emit('serverOrder', data = { "text": text, "customerName": customerName, "custID": custID });
        orderLocal();
    }

});

function outputOrder(message) {
    //
    //recieve page
    //new div for order in recieve page
    //
    if (document.querySelector(".recieveList") == null) {
        const newRecList = document.createElement("li")
        newRecList.classList.add("recieveList")
        recievePage.appendChild(newRecList);
    }
    recieveList = document.querySelector(".recieveList");
    console.log(document.querySelector(`.${message.customerName[0]}${message.custID}`))
    if (document.querySelector(`.${message.customerName[0]}${message.custID}`) == null){
        console.log(recieveList)
        const custNameOrdRec = document.createElement("div")
        custNameOrdRec.classList.add("custNameOrdRec")
        custNameOrdRec.classList.add(`${message.customerName[0]}${message.custID}`)
        custNameOrdRec.innerHTML = `Customer name - ${message.customerName}`
        recieveList.appendChild(custNameOrdRec)
    }

    const custNameOrdRec = document.querySelector(`.${message.customerName[0]}${message.custID}`)
    const ordRecDiv = document.createElement("div")
    ordRecDiv.classList.add("OrdRecDiv")

    // finally the item in recieve page
    const ordRecItem = document.createElement("li")
    ordRecItem.innerHTML = `${message.text}`
    ordRecItem.classList.add("ordRecItem")
    ordRecDiv.appendChild(ordRecItem)

    const recButtonDiv = document.createElement("div");
    recButtonDiv.classList.add("recButtonDiv");
    ordRecDiv.appendChild(recButtonDiv);
    
    //button to accept the order
    const ordAccept = document.createElement("button");
    ordAccept.classList.add("ordAccept");
    ordAccept.innerHTML = "Available";
    recButtonDiv.appendChild(ordAccept);

    const ordDecline = document.createElement("button");
    ordDecline.classList.add("ordDecline");
    ordDecline.innerHTML = "Decline";
    recButtonDiv.appendChild(ordDecline);

    custNameOrdRec.appendChild(ordRecDiv)
}

function orderLocal() {
    var text = addOrder.value;

    if (document.querySelector(".ordered") == null) {
        const newRecListMain = document.createElement("li")
        newRecListMain.classList.add("ordered");
        yourOrders.appendChild(newRecListMain);
    }

    mainOrdList = document.querySelector(".ordered")

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
    ordStatus.innerHTML = "Status - <span>Waiting for Conformation</span>"
    mainOrdDiv.appendChild(ordStatus)

    mainOrdList.appendChild(mainOrdDiv)

    addOrder.value = ""
}

document.addEventListener('click', (e) => {
    if (e.target.classList == "ordAccept" || e.target.classList == "ordDecline") {
        console.log(e.target.classList)
        e.preventDefault();
        var target = e.target;
        var parent = target.parentNode;
        var superparent = parent.parentNode
        var superparentplus = superparent.parentNode
        var index = [].indexOf.call(superparentplus.children, superparent);
        $(parent).empty()

        if (e.target.classList == "ordAccept"){        
            socket.emit('serverAccept', index);
            //Add ready button in recieve
            const ordRecWaiting = document.createElement("div")
            ordRecWaiting.classList.add("recieveItemConf")
            ordRecWaiting.innerHTML = "waiting"
            parent.appendChild(ordRecWaiting)
        }
        else{
            socket.emit('serverDecline', index);
            const ordDeclined = document.createElement("div")
            ordDeclined.classList.add("ordDeclined")
            ordDeclined.innerHTML = "Order Declined"
            parent.appendChild(ordDeclined)
        }
    }
})

function outputAccept(accept) {
    mainOrdList.childNodes[accept].lastChild.innerHTML = "Status - <span>Available</span>";
    mainOrdList.childNodes[accept].lastChild.querySelector('span').style.background = "orange";
    mainOrdList.childNodes[accept].lastChild.querySelector('span').style.color = "black";
}

function outputdecline(decline) {
    mainOrdList.childNodes[decline].lastChild.innerHTML = "Status - <span>Item not available</span>";
    mainOrdList.childNodes[decline].lastChild.querySelector('span').style.backgroundColor = "red";
    mainOrdList.childNodes[decline].lastChild.querySelector('span').style.color = "white";

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
    mainOrdList.childNodes[ready].lastChild.innerHTML = "Status - <span>Order ready... Please Collect</span>";
    mainOrdList.childNodes[ready].lastChild.querySelector('span').style.background = "green";
}

// //for testing purpose
// customerName = "kek"
// custID = "1234"
