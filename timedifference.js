function refresh() {
    console.log(Date.now());
    requestAnimationFrame(refresh);
}
requestAnimationFrame(refresh);