//socket config
const socket = io();

socket.on('message', message => {
    outputOrder(message);
});
socket.on('accept', data => {
    outputAccept(data);
});
socket.on('decline', decline => {
    outputdecline(decline);
});
socket.on('ready', ready => {
    outputReady(ready);
});
socket.on('socketid', socketid => {
    id = socketid
})
socket.on('del', data =>{
    delItemRec(data)
})
socket.on('placeIndex', data =>{
    ordPlacedFinal(data)
})

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
const orderConfButton = document.querySelector(".orderConfButton")
const customerName = "test"

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
        orderPage.style.display = "flex";

        custname.value = ""
        const custNameDiv = document.createElement("div");
        custNameDiv.innerHTML = "Customer name - " + customerName;
        cusDetlOrd.appendChild(custNameDiv);
        const custIdDiv = document.createElement("div");
        custIdDiv.innerHTML = "Customer ID - " + id;
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
        socket.emit('serverOrder', data = { "text": text, "customerName": customerName, "custID": id });
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
    if (document.querySelector(`.${message.customerName[0]}${message.custID}`) == null){
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
        e.preventDefault();
        var target = e.target;
        var parent = target.parentNode;
        var superparent = parent.parentNode
        var superparentplus = superparent.parentNode
        var index = [].indexOf.call(superparentplus.children, superparent);
        idCust = superparentplus.classList[1].slice(1)
        $(parent).empty()

        if (e.target.classList == "ordAccept"){        
            socket.emit('serverAccept', {"index": index, "idCust": idCust});
            //Add ready button in recieve
            const ordRecWaiting = document.createElement("div")
            ordRecWaiting.classList.add("recieveItemConf")
            ordRecWaiting.innerHTML = "waiting"
            parent.appendChild(ordRecWaiting)
            
        }
        else{
            socket.emit('serverDecline', {"index": index, "idCust": idCust});
            //Add ready button in recieve);
            const ordDeclined = document.createElement("div")
            ordDeclined.classList.add("ordDeclined")
            ordDeclined.innerHTML = "Order Declined"
            parent.appendChild(ordDeclined)
        }
    }
})

function outputAccept(data) {
    var tempOrderDiv = mainOrdList.childNodes[data.index]
    tempOrderDiv.lastChild.innerHTML = "Status - <span>Available</span>";
    tempOrderDiv.lastChild.querySelector('span').style.background = "orange";
    tempOrderDiv.lastChild.querySelector('span').style.color = "black";
    delBtn(tempOrderDiv)
    if (orderConfButton.style.display = "none"){
        orderConfButton.style.display = "block"
    }
}

function outputdecline(data) {
    var tempOrderDiv = mainOrdList.childNodes[data.index]
    tempOrderDiv.lastChild.innerHTML = "Status - <span>Item not available</span>";
    tempOrderDiv.lastChild.querySelector('span').style.backgroundColor = "red";
    tempOrderDiv.lastChild.querySelector('span').style.color = "white";
    delBtn(tempOrderDiv)
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
 function delBtn(orderDiv){
    var delBtn = document.createElement("div")
    delBtn.classList.add("delBtn")
    delBtn.innerHTML = "Delete"
    delBtn.onclick = function(e){
        DelBtnFn(e);
    }
    orderDiv.appendChild(delBtn)
 }


function DelBtnFn(e){ 
    orditemDivv = e.target.parentNode
    ordListt = e.target.parentNode.parentNode
    index = [].indexOf.call(ordListt.children, orditemDivv)
    orditemDivv.remove()
    socket.emit('delItemCust', {"index": index, "divID": customerName[0]+id })
    if (document.querySelector(".mainOrdDiv") == null){
        document.querySelector(".ordered").remove()
        document.querySelector(".orderConfButton").remove()
    }
}
function delItemRec(data){
    document.querySelector(`.${data.divID}`).childNodes[data.index + 1].remove()
}

function ordFinal(){
    ordStatus = document.querySelectorAll("span")
    isAvail = true;
    for (i=0; i < ordStatus.length; i++){
        if (ordStatus[i].innerHTML !== "Available"){
            isAvail = false;
            break;
        }
    }
    if (isAvail == true){
        socket.emit('placeOrderFinal', {"divID": customerName[0]+id })
    }else{
        alert("delete orders which are not available \nor wait for all orders to get confirmation")
    }
}

function ordPlacedFinal(data){
    
    const ordDiv = document.querySelector(`.${data.divID}`)
    const btnDivs = ordDiv.querySelectorAll('.recButtonDiv')
    $(btnDivs).empty()
    function btnCreate(elem){
        var pickupBtn = document.createElement("button")
        pickupBtn.classList.add("pickupBtn")
        pickupBtn.innerHTML = "ready"
        elem.appendChild(pickupBtn)
    }
    btnDivs.forEach( i => {
        btnCreate(i)
    })
}