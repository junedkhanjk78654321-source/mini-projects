const slider = document.querySelector(".slider")
const track = document.querySelectorAll(".track")
let i = 0
function slidercontainer() {
slider.style.transform=`translateX(${i * -100}%)`;

}
console.log(track)
function prev() {
    i--
    if (i < 0) {
        i = track.length - 1
    }
    console.log(i)
slidercontainer()

}

function next() {
    i++
    if (i >= track.length) {
        i = 0
    }
    console.log(i)
slidercontainer()

}