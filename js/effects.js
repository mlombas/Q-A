function startEffects() {
    setInterval(checkAndDoEffects, 16);
}

function checkAndDoEffects() {
    if(questions_g > 5) {
        if(points_g / questions_g > 1/5) {
            changeBg();
        } else {
            document.body.bgColor = "rgb(" + 255 + "," + 255 + "," + 255 + ");";
        }
    }
}

function changeBg() {
    do { bgColor.R += Math.random() - 0.5 } while (bgColor.R < 0 || bgColor.R > 255);
    do { bgColor.G += Math.random() - 0.5 } while (bgColor.R < 0 || bgColor.G > 255);
    do { bgColor.B += Math.random() - 0.5 } while (bgColor.B < 0 || bgColor.B > 255);
    console.log("change color to " + bgColor.R + " " + bgColor.G + " " + bgColor.B);
    document.body.bgColor = "rgb(" + bgColor.R + "," + bgColor.G + "," + bgColor.B + ");";
}