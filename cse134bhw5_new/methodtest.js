getButton.addEventListener('click', async function (e) {
    e.preventDefault();

    const method = document.getElementById('method').value;

    const id = document.getElementById('article_id').value;

    const name = document.getElementById('article_name').value;

    const body = document.getElementById('article_body').value;

    const date = new Date().getTime();

    const data = { id, name, body, date };

    const url = `https://httpbin.org/get?${Object.keys(data).map((key, i, arr) => `${key}=${data[key]}${i !== arr.length - 1 ? '&' : ''}`).join('')}`;

    sendGetRequest(url, method);

});


async function sendGetRequest(url, method) {
    console.log('method', method);
    if (method === 'fetch') {
        const res = await getData(url);
        console.log(res);
        CreateTableFromJSON(res);
        //document.getElementById("response").innerHTML = JSON.stringify(data);
    } else {
        xmlGetData(url);
    }
}


async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


postButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const method = document.getElementById('method').value;

    const id = document.getElementById('article_id').value;

    const name = document.getElementById('article_name').value;

    const body = document.getElementById('article_body').value;

    const date = new Date().getTime();

    const data = { id, name, body, date };


    //const res = await postData("https://httpbin.org/post", data);
    sendPostRequest("https://httpbin.org/post", method, data);
    //document.getElementById("response").innerHTML = JSON.stringify(data);
});

async function sendPostRequest(url, method, data) {

    console.log('method', method);
    if (method === 'fetch') {
        const res = await postData(url, data);
        console.log(res);
        CreateTableFromJSON(res);
        //document.getElementById("response").innerHTML = JSON.stringify(data);
    } else {
        const res = xmlPostData(url, data);
        // console.log(res);
        // CreateTableFromJSON(res);
    }
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


putButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const method = document.getElementById('method').value;

    const id = document.getElementById('article_id').value;

    const name = document.getElementById('article_name').value;

    const body = document.getElementById('article_body').value;

    const date = new Date().getTime();

    const data = { id, name, body, date };

    sendPutRequest("https://httpbin.org/put", method, data)
    //document.getElementById("response").innerHTML = JSON.stringify(data);
});


async function sendPutRequest(url, method, data) {

    console.log('method', method);
    if (method === 'fetch') {
        const res = await putData(url, data);
        console.log(res);
        CreateTableFromJSON(res);
        //document.getElementById("response").innerHTML = JSON.stringify(data);
    } else {
        const res = xmlPutData(url, data);
        // console.log(res);
        // CreateTableFromJSON(res);
    }
}


async function putData(url = '', data = {}) {
    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(data) // We send data in JSON format
    }

    return fetch(url, putMethod)
        .then(response => response.json())
        .then(data => data) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err))// Do something with the error

}


deleteButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const method = document.getElementById('method').value;

    const id = document.getElementById('article_id').value;

    const name = document.getElementById('article_name').value;

    const body = document.getElementById('article_body').value;

    const date = new Date().getTime();

    const data = { id, name, body, date };


    sendDeleteRequest("https://httpbin.org/delete", method, data);

    // const res = await deleteData("https://httpbin.org/delete", data);
    // console.log(res);
    // CreateTableFromJSON(res);
    //document.getElementById("response").innerHTML = JSON.stringify(data);

});


async function sendDeleteRequest(url, method, data) {


    console.log('method', method);
    if (method === 'fetch') {
        const res = await deleteData(url, data);
        console.log(res);
        CreateTableFromJSON(res);
        //document.getElementById("response").innerHTML = JSON.stringify(data);
    } else {
        const res = xmlDeleteData(url, data);
    }
}


async function deleteData(url = '', data = {}) {
    const deleteMethod = {
        method: 'DELETE', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(data) // We send data in JSON format
        // No need to have body, because we don't send nothing to the server.
    }

    return fetch(url, deleteMethod)
        .then(response => response.json())
        .then(data => (data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error
}

/*
    Create table function adopted and modified from: https://stackoverflow.com/questions/19901843/display-json-data-in-html-table
*/
function CreateTableFromJSON(obj) {

    var table = document.createElement('table');

    var tr = table.insertRow(-1);

    function iterate(obj, table, tr) {

        for (var props in obj) {

            if (obj.hasOwnProperty(props)) {

                if (typeof obj[props] == 'object') {
                    var trNext = table.insertRow(-1);
                    var tabCellHead = trNext.insertCell(-1);
                    var tabCell = trNext.insertCell(-1);
                    var table_in = document.createElement('table');
                    var tr_in;
                    var th = document.createElement("th");
                    th.innerHTML = props;

                    tabCellHead.appendChild(th);
                    tabCell.appendChild(table_in)
                    iterate(obj[props], table_in, tr_in);
                }
                else {
                    var tr = table.insertRow(-1);
                    var th = document.createElement("th");
                    th.innerHTML = props;
                    tr.appendChild(th);
                    var tabCell = tr.insertCell(-1);
                    console.log(props + ' * ' + obj[props]);
                    tabCell.innerHTML = obj[props];
                }
            }
        }
    }

    iterate(obj, table, tr);

    var divContainer = document.getElementById("response");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

}


// XMLHttpRequest
function xmlGetData(url = '', data = {}) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        console.log(this);

        const res = JSON.parse(this.response);
        CreateTableFromJSON(res);

    // Request finished. Do processing here.
    };

    xhr.send(null);
    // xhr.send('string');
    // xhr.send(new Blob());
    // xhr.send(new Int8Array());
    // xhr.send(document);
}


function xmlPostData(url = '', data = {}) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        const res = JSON.parse(this.response);
        CreateTableFromJSON(res);
    }
    xhr.send(`${Object.keys(data).map((key, i, arr) => `${key}=${data[key]}${i !== arr.length - 1 ? '&' : ''}`).join('')}`);
    // xhr.send(new Int8Array()); 
    // xhr.send(document);
}


function xmlPutData(url = '', data = {}){
    
    
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const res = JSON.parse(this.response);
        CreateTableFromJSON(res);
    }
    xhr.send(json);
}

// Delete 

function xmlDeleteData(url = '', data = {}){
    console.log('data', data)
    var json = JSON.stringify(data);
   
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.onload = function () {
        const res = JSON.parse(this.response);
        CreateTableFromJSON(res);
    }
    xhr.send(json);
}
