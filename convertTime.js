function string_pad(unpad_time) {
    let str = unpad_time.toString(10);
    if (str.length === 1) {
        return "0" + str;
    }
    else {
        return unpad_time;
    }
}

export function convertTime(total_time) { //total_ms refers to the total miliseconds that needs to be converted to minute-second-hundredth
    let minutes = Math.floor(total_time/60000);
    let seconds = Math.floor((total_time % 60000)/1000);
    let hundredth = Math.floor((total_time % 1000)/10);

    return `${string_pad(minutes)}.${string_pad(seconds)}.${string_pad(hundredth)}`;

}