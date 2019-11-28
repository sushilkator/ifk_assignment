"use strict";
document.addEventListener("DOMContentLoaded", onDomLoad, false);

let startTimer;

function createTable() {
    let sortedData = TABLE_DATA.sortBy("id", "ASC");
    sortedData = sortedData.sortBy("price", "DESC");
    loadData(sortedData);
}
function onDomLoad(e) {
    let buttonStart = document.getElementById('start');
    let buttonStop = document.getElementById('stop');
    let buttonSort = document.getElementById('sort');

    buttonStart.onclick = (e) => {
        e.stopImmediatePropagation();
        buttonStart.disabled = true;
        startTimer = setInterval(() => {
            let shuffledData = shuffle(TABLE_DATA);
            loadData(shuffledData);
        }, 800);
    };

    buttonStop.onclick = (e) => {
        buttonStart.disabled = false;
        clearInterval(startTimer);
    };

    buttonSort.onclick = createTable;
    createTable();
}

function loadData(data) {
    let tableRef = document.getElementsByClassName("table")[0].getElementsByTagName('tbody')[0];

    while (tableRef.hasChildNodes()) {
        tableRef.removeChild(tableRef.firstChild);
    }
    TABLE_DATA.forEach((val, i) => {
        let newRow = tableRef.insertRow(tableRef.rows.length);
        let cellId = newRow.insertCell(0);
        let cellImage = newRow.insertCell(1);
        let cellName = newRow.insertCell(2);
        let cellPrice = newRow.insertCell(3);
        let DOM_img = document.createElement("img");
        DOM_img.src = data[i].thumbnailUrl;

        let id = document.createTextNode(data[i].id);
        let name = document.createTextNode(data[i].name);
        let price = document.createTextNode(data[i].price);

        cellId.appendChild(id);
        cellImage.appendChild(DOM_img);
        cellName.appendChild(name);
        cellPrice.appendChild(price);
    });

}

Array.prototype.sortBy = function (p, sortOrder) {
    return this.slice(0).sort((a, b) => {
        let x = parseInt(a[p]);
        let y = parseInt(b[p]);
        if (x > y) {
            return sortOrder === "ASC" ? 1 : -1;
        } else if (x < y) {
            return sortOrder === "ASC" ? -1 : 1;
        } else {
            return 0;
        }

    });
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const validateExpression = function (exp) {
    let expStack = [];
    let expIsValid = true;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '(') {
            expStack.push(exp[i]);
        } else {
            if (expStack.length === 0) {
                expIsValid = false;
                break;
            }
            expStack.pop();
        }
    }
    if (expIsValid && expStack.length > 0) {
        expIsValid = false;
    }
    return expIsValid;
}