function loadData(url, username, password) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            document.getElementById("status").innerHTML = this.status;
            if (this.status === 200) {
                document.getElementById("data").innerHTML = this.responseText;
            }
            else {
                document.getElementById("data").innerHTML = "";
            }
        }
    };
    xhttp.onerror = function() {
        document.getElementById("status").innerHTML = "Woops, there was an error making the request.";
    };
    xhttp.open("GET", url, true);
//        xhttp.setRequestHeader("Authorization", "Basic dXNlcjpwYXNzd29yZA==");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhttp.send();
}

export default loadData;