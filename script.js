let minutes = 0;
let seconds = 0;
let hundredth = 0;

let status = "stopped";
let runtime = null;

function pad(number) {
    if (number < 10) {
        return "0" + String(number);
    }
    else {
        return String(number);
    }
}

function count() {
    hundredth++;

    if (hundredth == 100) {
        hundredth = 0;
        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }

    }
    
    document.getElementById("time").innerHTML = pad(minutes) + "." + pad(seconds) + "." + pad(hundredth);
}

function startstop() {
    if  (status == "stopped") {
        runtime = window.setInterval(count, 10);
        status = "running";
        document.getElementById("start_stop").innerHTML = "Stop";
        document.getElementById("reset_lap").innerHTML = "Lap";
    }
    else {
        window.clearInterval(runtime);
        status = "stopped";
        document.getElementById("start_stop").innerHTML = "Start";
        document.getElementById("reset_lap").innerHTML = "Reset";
    }
}
 
function resetlap() {
    if  (status == "stopped") { //reset
        minutes = 0;
        seconds = 0;
        hundredth = 0;
        document.getElementById("time").innerHTML = pad(minutes) + "." + pad(seconds) + "." + pad(hundredth);
        document.getElementById("laps").innerHTML = null
    }
    else { //record lap
        document.getElementById("laps").innerHTML += pad(minutes) + "." + pad(seconds) + "." + pad(hundredth) + "<br>";
    }
}