function checkActive() {
    const url = document.URL
    if (url.includes("/food")){
        document.querySelector("#Food").classList.add("active")
    }
    else if (url.includes("/campus-life")) {
        document.querySelector("#Campus-life").classList.add("active")
    }
    else if (url.includes("/about-us")) {
        document.querySelector("#About-us").classList.add("active")
    }
    else if (url.includes("/study-forum")) {
        document.querySelector("#Study-Forum").classList.add("active")
    } else {
        document.querySelector("#Home").classList.add("active")
    }

}

checkActive()

document.querySelector(".create-post").addEventListener("click", () => {
    document.querySelector(".dialog").classList.toggle("dialog-none")
})

