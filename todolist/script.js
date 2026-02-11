const add = document.querySelector(".add")
const body = document.querySelector(".data") 
const input = document.querySelector("input") 
const clearAll = document.getElementById("clearAll")
const num = document.querySelector(".num")
const form = document.getElementById("myForm")

form.addEventListener("submit", (e) => {
    e.preventDefault()
})

function updateCount() {
    num.innerHTML = body.childElementCount
}

function addFunc() {
    if (input.value.trim() === "") return

    const div = document.createElement("div")
    div.classList.add("d")

    div.innerHTML = `
    <p>${input.value}</p>
    <button><i class="dlt fa-solid fa-trash"></i></button>
    `
    body.append(div)
    
    const dltbtn =div.querySelector(".dlt")
    dltbtn.addEventListener("click",()=>{
        div.remove()
        updateCount()
    })

    input.value = ""
    updateCount()    
}
clearAll.addEventListener("click",()=> {
    body.innerHTML=""
    updateCount()
})