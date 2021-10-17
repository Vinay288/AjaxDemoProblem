let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Seconds";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(methodType + " state changed called at: " + showTime() +
            "RS: " + xhr.readyState + " Status: " + xhr.status)
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                callback(xhr.responseText)
            }
            else if (xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server error at " + showTime());
            }

        }

    }
    xhr.open(methodType, url, async);

    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
    console.log(methodType + " Request sent to server at: " + showTime())
}

const getURL = "http://127.0.0.1:3000/employees/"
function getUserDetails(data) {
    console.log("get user data : " + data)
}
makeAJAXCall("GET", getURL, getUserDetails, true);
