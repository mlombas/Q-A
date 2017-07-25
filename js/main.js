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
var points = 0, questions = 0;

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
                        var XMLDoc = parser.parseFromString(this.responseText, "text/xml");
                        generateNewQuestion(XMLDoc, false);
                    }
                }
                req.open("GET", "../Q-A_XML/" + this.innerHTML + ".xml", true);
                req.send();
            });
            child.textContent = curr.substr(0, curr.length - 4);
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

function generateQuestions(XMLName) {
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.statuc == 200) {
            var XMLDoc = this.responseXML; 
            generateNewQuestion(XMLDoc, false);
        }
    }
    req.open("GET", "Q-A_XML/" + XMLName, true);
    req.send();
}

function generateNewQuestion(XMLDoc, lastcorrect) {
    if(lastcorrect) {
        points++;
    } else {
        
    }
    questions++;
    console.log(points + "/" + questions);
    var numOfNodes = XMLDoc.getElementsByTagName("Question").length - 1;
    var currentElement = XMLDoc.getElementsByTagName("Question")[Math.round(Math.random() * numOfNodes)];
    var titleElement = document.createElement("h2");
    titleElement.innerText = currentElement.Question;
    questionsDiv.appendChild(titleElement);
    questionsDiv.appendChild(document.createElement("br"));
    var answers = currentElement.getElementsByTagName("Ans");
    for(var i = 0; i < answers.length; i++) {
        var newChild = document.createElement("button");
        newChild.onclick = "generateNewQuestion(" + XMLDoc + ", " + answers[i].Correct + ")";
        questionsDiv.appendChild(newChild);
        questionsDiv.appendChild(document.createElement("br"));
    }
}