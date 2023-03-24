const count = document.querySelectorAll(".count");
let interval = 3000;

count.forEach((i) => {
    let startValue = 0;
    let endValue = parseInt(i.getAttribute("data-count"))

    let duration = Math.floor(interval / endValue)
    let counter = setInterval(function () {
        startValue += 1;
        i.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter)
        }
    }, duration)
    console.log(endValue)
})

