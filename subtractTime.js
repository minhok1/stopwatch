import {string_pad} from "./convertTime.js";

//convert previous and next times in the format of 00.00.00 into miliseconds and subtract one from another to r

export function subtractTime(prev, next) { //both in "00.00.00"

    let hundreds
    let seconds
    let minutes

    let [prev_min, prev_sec, prev_hun] = prev.split('.').map(function(item) {
        return parseInt(item, 10);
    });

    let [next_min, next_sec, next_hun] = next.split('.').map(function(item) {
        return parseInt(item, 10);
    });

    let prev_total = 6000 * prev_min + 100 * prev_sec + prev_hun;
    let next_total = 6000 * next_min + 100 * next_sec + next_hun;

    let subresult = next_total - prev_total;

    let __return;
    ({ __return, minutes, seconds, hundreds } = formatTime(minutes, subresult, seconds, hundreds));
    return __return;

}

function formatTime(minutes, subresult, seconds, hundreds) {
    minutes = Math.floor(subresult / 6000);
    seconds = Math.floor((subresult % 6000) / 100);
    hundreds = subresult % 100;
    return { __return: [subresult, `${string_pad(minutes)}.${string_pad(seconds)}.${string_pad(hundreds)}`], minutes, seconds, hundreds };
}
