var bgColor = {
    R: Math.random() * 255,
    G: Math.random() * 255,
    B: Math.random() * 255
};
var changingBg = {
    interval: null,
    isChanging: false
};

function start() { 
    console.log("start");
    var names;
    //Get the name list by a socket message
    var socket = io();
    socket.emit("requestNames");
    socket.on("names", function(data) {
        console.log(data);
        for(var i = 0; i < data.length; i++) {
            console.log("added a node");
            var child = document.createElement("a");
            child.onclick = "generateQuestions(" + data[i] + ")";
            child.textContent = data[i];
            document.getElementById("linkDiv").appendChild(child);
        }
    });
} 



function changeBg() {
    do { bgColor.R += Math.random() - 0.5 } while (bgColor.R < 0 || bgColor.R > 255);
    do { bgColor.G += Math.random() - 0.5 } while (bgColor.R < 0 || bgColor.G > 255);
    do { bgColor.B += Math.random() - 0.5 } while (bgColor.B < 0 || bgColor.B > 255);
    console.log("change color to " + bgColor.R + " " + bgColor.G + " " + bgColor.B);
    document.body.bgColor = "rgb(" + bgColor.R + "," + bgColor.G + "," + bgColor.B + ");";
}

function triggerBg() {
    console.log("hey");
    if(changingBg.isChanging) {
        clearInterval(changingBg.interval);
        changingBg.isChanging = false;
        document.getElementById("bgButton").innerHTML = "Activate changing background (epilepsy warning)";
    } else {
        changingBg.interval = setInterval(changeBg, 100);
        changingBg.isChanging = true;
        document.getElementById("bgButton").innerHTML = "Deactivate changing background";
    }
}

function generateNewQuestion(XMLName) {

}