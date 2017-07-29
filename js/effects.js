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
var framecounter = 0, lasersCounter = 0;

function startEffects() {
    var interval = setInterval(checkAndDoEffects, 16);
}

function checkAndDoEffects() {
    framecounter++;
    var ratio = points_g / (questions_g - 1);
    if(questions_g > 1) document.getElementById("ratio").innerHTML = ratio * 100 + "% of questions correct (" + points_g + " of " + (questions_g - 1) + ")";
    if(questions_g > 20 && ratio > (3/5)) changeBg();
    if(questions_g > 30 && ratio > (7/8) && framecounter % 5 == 0) doLasers(); else if(ratio < (7/8)) document.getElementById("lasersImg").src = "";
    var meterNum = 0;
    if(ratio * 100 > 70 && questions_g > 25) {
        meterNum = 100;
    } else if(ratio * 100 > 50) {
        meterNum = 70;
    } else if(ratio * 100 > 35) {
        meterNum = 50;
    } else if(ratio * 100 > 20) {
        meterNum = 35;
    } else if(ratio * 100 > 5){
        meterNum = 20;
    } else {
        meterNum = 5;
    }
    document.getElementById("meterImg").src = "img/Meter_" + meterNum + ".png";
}

function doLasers() {
    lasersCounter++;
    if(lasersCounter > 3) lasersCounter = 1;
    document.getElementById("lasersImg").src = "img/Lasers_" + lasersCounter + ".png";
}

function changeBg() {
    if(framecounter % 7 != 0) return;
    do { bgColor.R += Math.random() / 10 - 0.05 } while (bgColor.R < 0 || bgColor.R > 255);
    do { bgColor.G += Math.random() / 10 - 0.05 } while (bgColor.R < 0 || bgColor.G > 255);
    do { bgColor.B += Math.random() / 10 - 0.05 } while (bgColor.B < 0 || bgColor.B > 255);
    document.body.bgColor = "rgb(" + bgColor.R + "," + bgColor.G + "," + bgColor.B + ");";
}