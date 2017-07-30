/********************
 * All code designed*
 * and written by   *
 * mocoma           *
 ********************/

var questionsDiv;
var points_g = 0, questions_g = 0; //g here stands for global
var currXMLDoc;
var possibleIds = [];

function start() { 
    startEffects();
    questionsDiv = document.getElementById("questions");
    var names;
    //Get the name list by a socket message and put it into buttons
    var socket = io();
    socket.emit("requestNames");
    socket.on("names", function(data) {
        for(var i = 0; i < data.length; i++) {
            var curr = data[i];
            var child = document.createElement("button");
            child.addEventListener("click", function() {
                questions_g = 0;
                points_g = 0;
                req = new XMLHttpRequest();
                req.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        var parser = new DOMParser();
                        currXMLDoc = parser.parseFromString(this.responseText, "text/xml");
                        possibleIds = [];
                        for(var i = 0; i < currXMLDoc.getElementsByTagName("Question").length; i++) possibleIds.push(i);
                        generateNewQuestion();
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
    points_g++;
    generateNewQuestion();
}
function checkForBad() {
    generateNewQuestion();
}

function generateNewQuestion() {
    var title = questionsDiv.getElementsByTagName("h2")[0];
    questions_g++;
    var numOfNodes = currXMLDoc.getElementsByTagName("Question").length - 1;
    if (possibleIds.length == 0) {
        title.innerHTML = "All questions questioned";
        clearButtons();
        return;
    }
    var idtemptemp = Math.round(Math.random() * (possibleIds.length - 1));
    var idTemp = possibleIds[idtemptemp];
    for(var i = 0; i < possibleIds.length; i++)
        if(possibleIds[i] == idTemp)
            possibleIds.splice(i, 1);
    var currentElement = currXMLDoc.getElementsByTagName("Question")[idTemp];
    title.innerHTML = currentElement.getAttribute("Question");
    var ans = currentElement.getElementsByTagName("Ans");
    clearButtons();
    for(var i = 0; i < ans.length; i++) {
        var newChild = document.createElement("button");
        newChild.innerText = ans[i].innerHTML;
        newChild.addEventListener("click", (ans[i].getAttribute("Correct") === "true") ? checkForGood : checkForBad);
        questionsDiv.appendChild(newChild);
        questionsDiv.appendChild(document.createElement("br"));
    }
}

function clearButtons() {
    var ansHTML = questionsDiv.getElementsByTagName("Button");
    while(ansHTML.length) questionsDiv.removeChild(ansHTML[ansHTML.length - 1]);
    var newlines = questionsDiv.getElementsByTagName("br");
    while(newlines.length) questionsDiv.removeChild(newlines[newlines.length - 1]);
}