import {string_pad} from "./convertTime.js";

export function subtractTime(prev, next) { //both in "00.00.00"

    let res_hun, res_sec, res_min

    let [prev_min, prev_sec, prev_hun] = prev.split('.').map(function(item) {
        return parseInt(item, 10);
    });

    let [next_min, next_sec, next_hun] = next.split('.').map(function(item) {
        return parseInt(item, 10);
    });

    let prev_total = 6000 * prev_min + 100 * prev_sec + prev_hun;
    let next_total = 6000 * next_min + 100 * next_sec + next_hun;

    let subresult = next_total - prev_total;

    res_min = Math.floor(subresult/6000);
    res_sec = Math.floor((subresult % 6000)/100);
    res_hun = subresult % 100;

    return [subresult, `${string_pad(res_min)}.${string_pad(res_sec)}.${string_pad(res_hun)}`];

}