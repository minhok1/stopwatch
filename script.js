let status = "stopped";
let starttime = null; //start time of the current run
let elapsedtime = 0; //sum total of all the runs
let previouslap = "00.00.00";
let displayedtime;

import {convertTime} from "./convertTime.js";
import {subtractTime} from "./subtractTime.js";

var btnstartstop = document.getElementById("start_stop");
var btnresetlap = document.getElementById("reset_lap");
var timedisplay = document.getElementById("time");
var laptable = document.getElementById("laps");

let token = undefined;
let newlap;
let laptime;
let laparray = [];
let minlap;
let maxlap;


function refresh() {
    timedisplay.innerHTML = convertTime(Date.now() - starttime + elapsedtime);
    token = requestAnimationFrame(refresh);
}

btnstartstop.onclick = function startstop() {
    if  (status === "stopped") { //start
        status = "running";
        btnstartstop.innerHTML = "stop";
        btnstartstop.classList.add('btn_stop');
        btnresetlap.innerHTML = "lap";
        starttime = Date.now();
        refresh();
    }
    else { //stop
        status = "stopped";
        btnstartstop.innerHTML = "start";
        btnstartstop.classList.add('btn_start');
        btnresetlap.innerHTML = "reset";
        cancelAnimationFrame(token);
        elapsedtime += Date.now() - starttime;
    }
}
 
btnresetlap.onclick = function resetlap() {
    if  (status === "stopped") { //reset
        starttime = null;
        elapsedtime = 0;
        previouslap = "00.00.00";
        timedisplay.innerHTML = "00.00.00";
        laptable.innerHTML = null;
        maxlap=0;
        minlap=0;
        laparray=[];
        btnstartstop.classList.remove('btn_start');
        btnstartstop.classList.remove('btn_stop');
    }
    else { //record lap
        displayedtime = document.getElementById("time").textContent;
        [laptime, newlap] = subtractTime(previouslap, displayedtime);
        previouslap = displayedtime;
        var row = laptable.insertRow(-1);
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
            laptable.rows[maxlap].cells[0].classList.add('maxvalue')
            laptable.rows[minlap].cells[0].classList.add('minvalue')
        }

        else {
            if (laparray[laparray.length-1] > laparray[maxlap]) {
                laptable.rows[maxlap].cells[0].classList.remove('maxvalue');
                maxlap = laparray.length - 1;
                laptable.rows[maxlap].cells[0].classList.add('maxvalue')
            }
            else if (laparray[laparray.length-1] < laparray[minlap]) {
                laptable.rows[minlap].cells[0].classList.remove('minvalue');
                minlap = laparray.length - 1;
                laptable.rows[minlap].cells[0].classList.add('minvalue')
            }
        }
    }
}