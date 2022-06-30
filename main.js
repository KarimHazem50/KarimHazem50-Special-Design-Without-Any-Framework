let myBtn = document.querySelector(".landing .header button");
let myLinks = document.querySelector(".landing .header ul");
let myLanding = document.querySelector(".landing")

myBtn.onclick = function(e) {
    e.stopPropagation();
    myLinks.classList.toggle("links-open");
    myBtn.classList.toggle("arrow");
}
myLinks.onclick = function() {
    myLinks.classList.remove("links-open");
    myBtn.classList.remove("arrow")
}
document.addEventListener("click",function(e) {
    if (e.target.parentNode.parentNode != myLinks) {
        if (myLinks.classList.contains("links-open")) {
            myLinks.classList.remove("links-open")
            myBtn.classList.remove("arrow");
        }
    }
})

let change = function (i) {
        myLanding.style.setProperty("background-image",`url('images/0${i}.jpg')`)
}
let i =1 ;
background = function() {
    counter = setInterval(() => {
        i++
        change(i)
        if (i==5) {
            i=0
        }
    }, 12000);
}
background();



// ----Start Setting box---- //

let divIcon = document.querySelector(".setting .icon")
let myIcon = document.querySelector(".setting .icon i")
let operations = document.querySelector(".setting .operations")


divIcon.onclick = function() {
    myIcon.classList.toggle("spin");
    operations.classList.toggle("open")
    divIcon.classList.toggle("open")
}


// change colors 
let myColor = document.querySelectorAll(".setting .colors span")
let mainColor = document.querySelector(":root")

clear = function () {
    myColor.forEach(e => {
        e.classList.remove("focus")
    })
}

myColor.forEach(element => {
    element.onclick = function() {
        let data = element.getAttribute("data");
        mainColor.style.cssText = `--main-color: ${data}`
        clear();
        element.classList.add("focus")
        window.localStorage.setItem("color",`${data}`)
    }
});
if (window.localStorage.color) {
    mainColor.style.cssText = `--main-color: ${window.localStorage.getItem("color")}`
    myColor.forEach(e => {
        if (e.getAttribute("data") === window.localStorage.getItem("color")) {
            clear();
            e.classList.add("focus")
        }
    });
}


// Control background
condition = function (e) {
    if (e.value === "Yes") {
        background();
    }
    else if (e.value === "No") {
        clearInterval(counter)
    }
}

let b = document.querySelectorAll(".setting .operations .control input")

c = function () {
    b.forEach(e => {
        e.classList.remove("active")
    })
}
b.forEach(element => {
    element.onclick = function() {
        c();
        element.classList.add("active")
        condition(element);
        window.localStorage.setItem("background",`${element.value}`)
    }
});
if (window.localStorage.background) {
    if (window.localStorage.getItem("background") === "No") {
        clearInterval(counter)
        c();
        b.forEach(e => {
            if (e.className === "no") {
                e.classList.add("active")
            }
        });
    }
}







// Show Bullets

let s = document.querySelectorAll(".setting .operations .show-bullets input");
let bullets = document.querySelector(".bullets")

conditionBullets = function(e) {
    if (e.value === "No") {
        bullets.style.display = "none"
    }
    else if (e.value === "Yes") {
        bullets.style.display = "block"
    }
}

ss = function () {
    s.forEach(e => {
        e.classList.remove("active")
    })
}
s.forEach(element => {
    element.onclick = function () {
        ss();
        element.classList.add("active")
        conditionBullets(element)
        window.localStorage.setItem("bullets",`${element.value}`)
    }
});
if (window.localStorage.bullets) {
    if (window.localStorage.getItem("bullets")  === "No") {
        bullets.style.display = "none"
        ss();
        s.forEach(e => {
            if (e.className === "no") {
                e.classList.add("active")
            }
        });
    }
}



// Reset Options

let reset = document.querySelector(".reset input")

reset.onclick = function() {

    mainColor.style.cssText = "--main-color: #FF9800"
    clear();
    myColor.forEach(element => {
        if (element.getAttribute("data") === "#FF9800") {
            element.classList.add("focus")
        }
    });


    let k = document.querySelector(".setting .operations .control input.active")
    if (k.value === "No") {
        c();
        b.forEach(element => {
            if (element.className === "yes") {
                element.classList.add("active")
                condition(element)
            }
        });
    };


    ss();
    s.forEach(element => {
        if (element.className === "yes") {
            element.classList.add("active")
            conditionBullets(element)
        }
    });


    // clear LocalStorage
    window.localStorage.clear();
}


// ----End Setting box---- //








// Animation On Skills

let skill = document.querySelector(".skills .box")
let mySkills = document.querySelectorAll(".skills .box .skill .progress span")

window.onscroll = function() {
    let elementOffsetTop = skill.offsetTop;
    let elementOffsetHeight = skill.offsetHeight;
    let pageHeight = window.innerHeight;
    let scrollOnWindow = window.scrollY;

    if (scrollOnWindow > (elementOffsetTop + (elementOffsetHeight / 2) - pageHeight)) {
        mySkills.forEach(e => {
            e.style.cssText = `width: ${e.getAttribute("progress")}; background-color: var(--main-color)`
        });
    }
    else {
        mySkills.forEach(e => {
            e.style.cssText = `width: 0; background-color: transparent`
        });
    }
}



// Popup Box

let images = document.querySelectorAll(".gallery .mainBox .box img")

images.forEach(element => {
    element.onclick = function () {
        let overlay = document.createElement("div")
        overlay.className = "overlay-popup"
        document.body.appendChild(overlay)

        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"
        document.body.appendChild(popupBox)
        
        if (element.alt != null) {
            let popupText = document.createElement("h3")
            popupText.append(element.alt)
            popupBox.appendChild(popupText)
        }
        
        let popupImage = document.createElement("img")
        popupImage.src = element.src;
        popupBox.appendChild(popupImage)

        let closePopup = document.createElement("span")
        closePopup.className = "close-popup"
        closePopup.append(document.createTextNode("X"))
        popupBox.appendChild(closePopup)
    }
});


addEventListener("click", function(e) {
    if (e.target.className === "close-popup") {
        e.target.parentNode.remove();
        document.querySelector(".overlay-popup").remove();
    }
    if(e.target.className=="overlay-popup"){
        document.querySelector(".overlay-popup").remove();
        document.querySelector(".popup-box").remove();
    }
})
