let data = ""

const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("input") 


buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        let value = button.innerHTML

        if (value === "AC") {
            data = ""
            display.value = ""
            return
        }
        if (value === "DEL") {
            data = data.slice(0,-1)
            display.value = data
            return
        }
        if (value === "=") {
            data = eval(display.value)
            display.value = ""
        }

        data += value
        display.value = data
    })
})