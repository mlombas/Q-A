function start() { 
    console.log("start");
    var names;
    var httpxmlnames = new XMLHttpRequest();
    httpxmlnames.onreadystatechange = function() {
        if(httpxmlnames.status == 200 && httpxmlnames.readyState == 4) {
            var recieved = httpxmlnames.responseText;
            var actualName = 0;
            for(var i = 0; i < recieved.length; i++) {
                if(recieved.charAt(i) == '\n') {
                    actualName++;
                    continue;
                }
                names[actualname] += recieved.charAt(i);
            }
            for(var name in names) Console.log(name + '\n'); 
        }
    }
    httpxmlnames.open("GET", "../Q-A XML/Names.txt", true);
    httpxmlnames.send();
} 
