var base = localStorage.base;
var token = localStorage.userKey;


/**
 * @summary Gets token by sending a username and password in an http header
 *
 * @param {string} url         The URL to open a POST request with.
 * @param {string} username    The username
 * @param {string} password    The password
 */

function httpGetToken(url, user, password, callback)
{
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4){
            callback(xmlHttp.responseText, xmlHttp.status);
        }
    }

    if("withCredentials" in xmlHttp){
   xmlHttp.open("POST", url + "/api/user/token", true);
   xmlHttp.setRequestHeader ("Authorization", "Basic " + btoa(user + ":" + password));
   //xmlHttp.send(null);
 }
 else if (typeof XDomainRequest != "undefined") {
   xmlHttp = new XDomainRequest();
   xmlHttp.open("POST", url + "/api/user/token");
 }
 else{
   xmlHttp = null;
 }
 return xmlHttp;
}

function makeCorsRequest(url, user, password){

  var xhr = httpGetToken(url, user, password, validateKey);
  if(!xhr){
    alert('CORS not supported');
    return;
  }

  xhr.onload = function(){
    var text = xhr.responseText;
    var title = text.match('<title>(.*)?</title>')[1];
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function(){
    alert("There was an error making the request.");
  };

  xhr.send();
}







/**
 * @summary Asynchronously creates an HTTP POST request to the given URL and
 * executes a callback function with the response & status.
 *
 * @param {string} url         The URL to open a POST request with.
 * @param {function} callback  A function to execute on completion
 *                             of the request.
 */

function httpPostAsync(url, args, callback)
{
   args.token = token;

   $.ajax({
     type: "POST",
     url: base + url,
     data: args,
     success: callback,
   });
}


/**
 * @summary Asynchronously creates an HTTP GET request to the given URL and executes
 * a callback function with the response & status.
 *
 * @param {string} url            The URL to open a GET request with.
 * @param {function} callback     A function to execute on completion of the request.
 */
function httpGetAsync(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4){
            callback(xmlHttp.responseText, xmlHttp.status);
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

/**
 * @summary Send the enetered access key to FCAS to be validated
 */
function sendKey(){
  var username = $('#user-enter').val();
  var password = $('#key-enter').val();
  base =  $('#instance').val();

  //httpGetToken(base, username, password, validateKey);
  makeCorsRequest(base, username, password);
}

/**
 * @summary Send a hash and recieve the k-nearest malware to it.
 *
 * @param {string} hash           SHA256 hash of the file to get the k-nearest malware of.
 * @param {function} callback     A function to execute on completetion of the request.
 */
function knearest(hash, callback){
  var key = localStorage.userKey;

 // httpGetAsync(base + key + '/knearest/' + hash, callback);
}
