const divs = {
    redLightLeftDiv: document.getElementById("firstLeft"),
    redLightCenterDiv: document.getElementById("firstCenter"),
    redLightRightDiv: document.getElementById("firstRight"),

    orangeLightLeftDiv: document.getElementById("secondLeft"),
    orangeLightCenterDiv: document.getElementById("secondCenter"),
    orangeLightRightDiv: document.getElementById("secondRight"),

    greenLightLeftDiv: document.getElementById("thirdLeft"),
    greenLightCenterDiv: document.getElementById("thirdCenter"),
    greenLightRightDiv: document.getElementById("thirdRight")
};

const inputs = {
    timeForRedInput: document.getElementById("timeForRed"),
    timeForOrangeInput: document.getElementById("timeForOrange"),
    timeForGreenInput: document.getElementById("timeForGreen")
};

const bttns = {
    startBttn: document.getElementById("startBttn"),
    finishBttn: document.getElementById("finishBttn")
};

const imgs = {
    img01: document.querySelector(".pic1"),
    img02: document.querySelector(".pic2"),
    img03: document.querySelector(".pic3")
};

const colors = {
    black: "rgb(0, 0, 0)",
    red: "rgb(255, 0, 255)",
    orange: "rgb(255, 69, 0)",
    green: "rgb(0, 255, 127)"
};

let timerID;
let lastColor;
const select = document.getElementById("selImg");

function setBlackColor(div) {
    div.style.backgroundColor = colors.black;
}

function getTime(input) {
    return input.value * 1000;
}

function lightOn() {
    function changeColorsForRed() {
        divs.redLightCenterDiv.style.backgroundColor = colors.red;
        divs.greenLightRightDiv.style.backgroundColor = colors.green;
        divs.greenLightLeftDiv.style.backgroundColor = colors.green;
    }

    function changeColorsForOrange() {
        divs.orangeLightCenterDiv.style.backgroundColor = colors.orange;
        divs.orangeLightRightDiv.style.backgroundColor = colors.orange;
        divs.orangeLightLeftDiv.style.backgroundColor = colors.orange;
    }

    function changeColorsForGreen() {
        divs.greenLightCenterDiv.style.backgroundColor = colors.green;
        divs.redLightRightDiv.style.backgroundColor = colors.red;
        divs.redLightLeftDiv.style.backgroundColor = colors.red;
    }

    function greenProcess() {
        changeColorsForGreen();
        timerID = setTimeout(() => {
            setBlackColor(divs.greenLightCenterDiv);
            setBlackColor(divs.redLightLeftDiv);
            setBlackColor(divs.redLightRightDiv);
            orangeProcess();
            lastColor = "green";
        }, getTime(inputs.timeForGreenInput));
    }

    function orangeProcess() {
        changeColorsForOrange();
        timerID = setTimeout(() => {
            setBlackColor(divs.orangeLightCenterDiv);
            setBlackColor(divs.orangeLightLeftDiv);
            setBlackColor(divs.orangeLightRightDiv);
            if (lastColor === "red") {
                greenProcess();
            } else if (lastColor === "green") {
                redProcess();
            }
            lastColor = "orange";
        }, getTime(inputs.timeForOrangeInput));
    }

    function redProcess() {
        clearTimeout(timerID);
        changeColorsForRed();
        timerID = setTimeout(() => {
            setBlackColor(divs.redLightCenterDiv);
            setBlackColor(divs.greenLightLeftDiv);
            setBlackColor(divs.greenLightRightDiv);
            orangeProcess();
            lastColor = "red";
        }, getTime(inputs.timeForRedInput))
    }

    redProcess();
}

function lightOff() {
    setBlackColor(divs.redLightLeftDiv);
    setBlackColor(divs.redLightCenterDiv);
    setBlackColor(divs.redLightRightDiv);

    setBlackColor(divs.orangeLightLeftDiv);
    setBlackColor(divs.orangeLightCenterDiv);
    setBlackColor(divs.orangeLightRightDiv);

    setBlackColor(divs.greenLightLeftDiv);
    setBlackColor(divs.greenLightCenterDiv);
    setBlackColor(divs.greenLightRightDiv);
}

function processForStart() {
    lightOn();
    bttns.startBttn.disabled = true;
    bttns.finishBttn.disabled = false;
}

function processForFinish() {
    clearTimeout(timerID);
    lightOff();
    bttns.startBttn.disabled = false;
    bttns.finishBttn.disabled = true;
}

/*function processForChangeInInputs() {
    finishBttn.click();
    startBttn.click();
}*/

function processForChangeImg() {
    let selectInd = select.selectedIndex;

    if (selectInd === 0) {
        imgs.img01.style.visibility = "visible";
        imgs.img02.style.visibility = "hidden";
        imgs.img03.style.visibility = "hidden";
    } else if (selectInd === 1) {
        imgs.img01.style.visibility = "hidden";
        imgs.img02.style.visibility = "visible";
        imgs.img03.style.visibility = "hidden";
    } else if (selectInd === 2) {
        imgs.img01.style.visibility = "hidden";
        imgs.img02.style.visibility = "hidden";
        imgs.img03.style.visibility = "visible";
    }
}

bttns.startBttn.onclick = () => {
    processForStart();
};

bttns.finishBttn.onclick = () => {
    processForFinish();
};

select.onchange = () => {
    processForChangeImg();
};
