const getElem = document.querySelector("#get_services");
const getURL = "http://127.0.0.1:3000/employees/1"
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        getElem.textContent = "Get user data: " + responseText;
    })
    .catch(error => {
        getElem.textContent = "GET Error status: " + JSON.stringify(error)
    });


const deleteElem = document.querySelector("#delete_services");
const deleteURL = "http://127.0.0.1:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        deleteElem.textContent = "User deleted: " + responseText;
    })
    .catch(error => { deleteElem.textContent = "DELETE Error status: " + JSON.stringify(error) });

const postElem = document.querySelector("#post_services");
const postURL = "http://127.0.0.1:3000/employees";
const emplData = { "name": "Harry", "salary": "50000" }

makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        postElem.textContent = "User added: " + responseText;
    })
    .catch(error => { postElem.textContent = "POST Error status: " + JSON.stringify(error) });
