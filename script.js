import {convertTime} from "./convertTime.js";
import {subtractTime} from "./subtractTime.js";

const btnStartStop = document.getElementById("start_stop");
const btnResetLap = document.getElementById("reset_lap");
const timeDisplay = document.getElementById("time");
const lapTable = document.getElementById("laps");

let status = "stopped";
let starttime = null; //start time of the current run
let elapsedtime = 0; //sum total of all the runs
let previouslap = "00.00.00";
let displayedtime;
let token = undefined;
let newlap;
let laptime;
let laparray = [];
let minlap;
let maxlap;


function updateTime() {
    timeDisplay.innerHTML = convertTime(Date.now() - starttime + elapsedtime);
    token = requestAnimationFrame(updateTime);
}

btnStartStop.onclick = function startstop() {

    if  (status === "stopped") { //start
        status = "running";
        btnStartStop.innerHTML = "stop";
        btnStartStop.style.backgroundColor = "rgb(100,30,30)";
        btnStartStop.style.color = "rgb(250, 50, 50)";
        btnResetLap.innerHTML = "lap";
        starttime = Date.now();
        updateTime();
    }

    else { //stop
        status = "stopped";
        btnStartStop.innerHTML = "start";
        btnStartStop.style.backgroundColor = "rgb(30,80,30)";
        btnStartStop.style.color = "rgb(100,200,100)";
        btnResetLap.innerHTML = "reset";
        cancelAnimationFrame(token);
        elapsedtime += Date.now() - starttime;
    }
}
 
btnResetLap.onclick = function resetlap() {

    if  (status === "stopped") { //reset
        starttime = null;
        elapsedtime = 0;
        previouslap = "00.00.00";
        timeDisplay.innerHTML = "00.00.00";
        lapTable.innerHTML = null;
        maxlap=0;
        minlap=0;
        laparray=[];
        btnStartStop.style.backgroundColor = "#808080";
        btnStartStop.style.color = "white";
    }
    
    else { //record lap
        displayedtime = document.getElementById("time").textContent;
        [laptime, newlap] = subtractTime(previouslap, displayedtime);
        previouslap = displayedtime;
        var row = lapTable.insertRow(-1);
        var cell = row.insertCell(0);

        cell.innerHTML = newlap;
        laparray.push(laptime);

        if (laparray.length ===1) {
            maxlap = 0;
            minlap = 0;
        }

        else if (laparray.length === 2) {
            if (laparray[0] > laparray[1]) {
                minlap = 1;
            }
            else {
                maxlap = 1;
            }
            lapTable.rows[maxlap].cells[0].classList.add('maxvalue');
            lapTable.rows[minlap].cells[0].classList.add('minvalue');
        }

        else {
            if (laparray[laparray.length-1] > laparray[maxlap]) {
                lapTable.rows[maxlap].cells[0].classList.remove('maxvalue');
                lapTable.rows[laparray.length-1].cells[0].classList.add('maxvalue');
                maxlap = laparray.length - 1;
            }
            else if (laparray[laparray.length-1] < laparray[minlap]) {
                lapTable.rows[minlap].cells[0].classList.remove('minvalue');
                lapTable.rows[laparray.length-1].cells[0].classList.add('minvalue');
                minlap = laparray.length - 1;
            }
        }
    }
}