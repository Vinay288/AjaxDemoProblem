let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType,url,async=true,data=null)
{
    return new Promise(function(resolve,request)
    {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log(methodType+" state changed called Ready state: "+xhr.readyState+" Status: "+xhr.status)
            if(xhr.readyState==4)
            {
                if(xhr.status>=400)
                {
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    });
                    console.log("XHR failed");        
                }
                else
                {
                    resolve(xhr.responseText)
                }

            }
            
        }
        xhr.open(methodType,url,async);

        if(data)
        {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
        console.log(methodType+" Request sent to server ")
    });
}

const getURL="http://127.0.0.1:3000/employees/"
makePromiseCall("GET",getURL,true)
    .then(responseText=>{
        console.log("Get user data: "+responseText)
    })
    .catch(error=>console.log("GET Error status: "+JSON.stringify(error)));

const deleteURL="http://127.0.0.1:3000/employees/4";
makePromiseCall("DELETE",deleteURL,false)
    .then(responseText=>{
        console.log("User deleted: "+responseText)
    })
    .catch(error=>console.log("DELETE Error status: "+JSON.stringify(error)));


const postURL="http://127.0.0.1:3000/employees";
const emplData={"name":"Harry","salary":"50000"}

makePromiseCall("POST",postURL,true,emplData)
    .then(responseText=>{
        console.log("User added: "+responseText)
    })
    .catch(error=>console.log("POST Error status: "+JSON.stringify(error)));