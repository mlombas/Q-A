/********************
 * All code designed*
 * and written by   *
 * mocoma           *
 ********************/

var bgColor = {
    R: Math.random() * 255,
    G: Math.random() * 255,
    B: Math.random() * 255
};
var changingBg = {
    interval: null,
    isChanging: false
};
var questionsDiv;
var points_g = 0, questions_g = 0; //g here stands for global
var currXMLDoc;

function start() { 
    console.log("start");
    questionsDiv = document.getElementById("questions");
    var names;
    //Get the name list by a socket message and put it into buttons
    var socket = io();
    socket.emit("requestNames");
    socket.on("names", function(data) {
        console.log(data);
        for(var i = 0; i < data.length; i++) {
            var curr = data[i];
            console.log("added a node");
            var child = document.createElement("button");
            child.addEventListener("click", function() {
                req = new XMLHttpRequest();
                req.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        var parser = new DOMParser();
                        currXMLDoc = parser.parseFromString(this.responseText, "text/xml");
                        generateNewQuestion(false);
                    }
                }
                req.open("GET", "../Q-A_XML/" + this.innerHTML + ".xml", true);
                req.send();
            });
            child.textContent = curr.substr(0, curr.length - 4);
            document.getElementById("linkDiv").appendChild(child);
            if(i % 3 == 0) document.getElementById("linkDiv").appendChild(document.createElement("br"));
        }
    });
} 

function checkForGood() {
    console.log("correct");
    points_g++;
    generateNewQuestion();
}
function checkForBad() {
    console.log("bad");
    generateNewQuestion();
}

function generateNewQuestion() {
    var title = questionsDiv.getElementsByTagName("h2")[0];
    questions_g++;
    console.log(points_g + "/" + questions_g);
    var numOfNodes = currXMLDoc.getElementsByTagName("Question").length - 1;
    var currentElement = currXMLDoc.getElementsByTagName("Question")[Math.round(Math.random() * numOfNodes)];
    title.innerHTML = currentElement.getAttribute("Question");
    var ans = currentElement.getElementsByTagName("Ans");
    var ansHTML = questionsDiv.getElementsByTagName("Button");
    while(ansHTML.length) questionsDiv.removeChild(ansHTML[ansHTML.length - 1]);
    var newlines = questionsDiv.getElementsByTagName("br");
    while(newlines.length) questionsDiv.removeChild(newlines[newlines.length - 1]);
    for(var i = 0; i < ans.length; i++) {
        var newChild = document.createElement("button");
        newChild.innerText = ans[i].innerHTML;
        newChild.addEventListener("click", (ans[i].getAttribute("Correct") === "true") ? checkForGood : checkForBad);
        questionsDiv.appendChild(newChild);
        questionsDiv.appendChild(document.createElement("br"));
    }
}