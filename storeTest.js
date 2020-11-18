// JavaScript Document
const key = "asad";

var elements = [];
var empty = document.querySelector(".empty");
var draggableitem = document.getElementsByClassName("cart-row");

function displayEach() {
    getElementFromStorage().forEach(element => {
        displayYourCartBefore(element);
    });
}

const getElementFromStorage = () => {
    var itemGot = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(itemGot)) return itemGot;;
    return [];
}

function displayYourCartBefore(item) {
    var title = item.title;
    var source = item.source;
    var price = item.price;
    var creatdiv = document.createElement("div");
    creatdiv.classList.add("cart-row");
    let str = "";
    str += ' <div class="cart-item cart-column">'
        + ' <img src="' + source + '" width="100" height="100" class="cart-item-image">'
        + ' <span class="cart-item-title">' + title + '</span>'
        + ' </div>'
        + ' <span class="cart-price cart-column">' + price + '</span>'
        + ' <div class="cart-quantity cart-column">'
        + '   <input type="number" value="1" class="cart-quanlity-input">'
        + '  <button class="btn btn-danger" type="button">REMOVE</button>'
        + ' </div>';
    creatdiv.innerHTML = str;
    var addCartItems = document.getElementsByClassName("cart-items")[0];
    addCartItems.appendChild(creatdiv);
    var removebutton = document.getElementsByClassName("btn-danger");
    removeItemFunction(removebutton);
    addEventListenerDrag(draggableitem);

}

displayEach();

const addElementToStorage = (item) => {
    localStorage.setItem(key, JSON.stringify(item));
    console.log("luu tc");
}

var addbtn = document.getElementsByClassName("shop-item-button");
for (var i = 0; i < addbtn.length; i++) {
    addbtn[i].addEventListener("click", getInformItem);
}

function getInformItem(event) {
    var catchthis = event.target;
    var shopItem = catchthis.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerHTML;
    var source = shopItem.getElementsByClassName("shop-item-image")[0].getAttribute("src");
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerHTML;
    var creatdiv = document.createElement("div");
    creatdiv.classList.add("cart-row");
    let str = "";
    str += ' <div class="cart-item cart-column">'
        + ' <img src="' + source + '" width="100" height="100" class="cart-item-image">'
        + ' <span class="cart-item-title">' + title + '</span>'
        + ' </div>'
        + ' <span class="cart-price cart-column">' + price + '</span>'
        + ' <div class="cart-quantity cart-column">'
        + '   <input type="number" value="1" class="cart-quanlity-input">'
        + '  <button class="btn btn-danger" type="button">REMOVE</button>'
        + ' </div>';
    var removebutton = document.getElementsByClassName("btn-danger");
    creatdiv.innerHTML = str;
    var addCartItems = document.getElementsByClassName("cart-items")[0];
    addCartItems.appendChild(creatdiv);
    var eachEle = {
        'title': title,
        'source': source,
        'price': price
    }
    elements.push(eachEle);
    addElementToStorage(elements);
    removeItemFunction(removebutton);
    addEventListenerDrag(draggableitem);
}

function removeItemFunction(removebutton) {
    for (var i = 0; i < removebutton.length; i++) {
        removebutton[i].addEventListener("click", function (event) {
            var catchIt = event.target;
            var parentRemove = catchIt.parentElement.parentElement;
            parentRemove.remove();
            changeTotal();
            elements = [];
            console.log("Elements old length: " + elements.length)
            localStorage.removeItem(key);
            addEventListenerDrag(draggableitem);
            for (var h = 0; h < draggableitem.length; h++) {
                console.log("Cart-row: " + draggableitem[h]);
                var newtitle = draggableitem[h].getElementsByClassName("cart-item-title")[0].innerHTML;
                var newsource = draggableitem[h].getElementsByClassName("cart-item-image")[0].getAttribute("src");
                var newprice = draggableitem[h].getElementsByClassName("cart-price")[0].innerHTML;
                var newobj = {
                    'title': newtitle,
                    'source': newsource,
                    'price': newprice
                }
                elements.push(newobj);
                addElementToStorage(elements);
            }
        });
        changeTotal();
    }
}


function changeTotal() {
    var allInput = document.getElementsByClassName("cart-quanlity-input");
    var allcartprice = document.getElementsByClassName("cart-price");
    console.log("hi: " + allInput.length);
    var carttotal = document.getElementsByClassName("cart-total-price")[0];
    var total = 0;
    for (var i = 0; i < allInput.length; i++) {
        var valuefromprice = allcartprice[i + 1].innerHTML.replace("$", "")
        if (isNaN(parseFloat(allInput[i].value)) || parseFloat(allInput[i].value) <= 0)
            allInput[i].value = 1;
        var valueInput = parseFloat(allInput[i].value)
        total = total + (parseFloat(valuefromprice) * valueInput);
    }
    total = Math.round(total * 100) / 100;
    carttotal.innerHTML = "$" + total;

    console.log(total);
    autochange(allInput);
}

function autochange(allInput) {
    for (var i = 0; i < allInput.length; i++)
        allInput[i].addEventListener("change", changeTotal);
}

var purchase = document.getElementsByClassName("btn-purchase")[0];
purchase.addEventListener("click", resetAll)

function resetAll() {
    localStorage.removeItem(key);
    var row = document.getElementsByClassName("cart-row");
    for (var i = 0; i < row.length; i++) {
        row[i].remove();
        changeTotal();
    }
}

//DRAG AND DROP TO REMOVE

function removeItemByDrag(row) {
    for (var i = 0; i < row.length; i++) {
        row[i].remove();
        elements = [];
        localStorage.removeItem(key);
        for (var h = 0; h < row.length; h++) {
            console.log("Cart-row: " + row[h]);
            var newtitle = row[h].getElementsByClassName("cart-item-title")[0].innerHTML;
            var newsource = row[h].getElementsByClassName("cart-item-image")[0].getAttribute("src");
            var newprice = row[h].getElementsByClassName("cart-price")[0].innerHTML;
            var newobj = {
                'title': newtitle,
                'source': newsource,
                'price': newprice
            }
            elements.push(newobj);
            console.log("Elements new length: " + elements.length);
            addElementToStorage(elements);
        }
        changeTotal();
    }
}


function allowDrag(item) {
    item.setAttribute("draggable", "true");
}

function addEventListenerDrag(item) {
    for (var i = 0; i < item.length; i++) {
        item[i].addEventListener("dragstart", dragStart);
        allowDrag(item[i]);
    }
}

empty.addEventListener("dragenter", dragEnter);
empty.addEventListener("dragover", dragOver);
empty.addEventListener("dragleave", dragLeave);
empty.addEventListener("drop", dragDrop);


function dragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("thank enter");

}
function dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("thank over")
}
function dragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("thank leave")
}
function dragDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    removeItemByDrag(draggableitem);
    empty.style.display = "none";
    console.log("thank drop");

}
function dragStart() {
    console.log("drag Starts");
    empty.style.display = "block";
}



// {
//     e.preventDefault();
//     console.log("da vao ham ");
//     var appear = document.querySelector(".empty");
//     appear.removeAttribute("display");
// });

