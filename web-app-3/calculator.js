// 사칙연산 logic 먼저 짜야할 듯,,,

/* global variables */
RESET_NUMBER = 0xfedcfedc;
INVALID = 0xfedcfedc;
VALID = 0xfedcfedd;
// null, undefined

let gSum = 0
let gUnderDecimal = 0;
let gUnderDecimalNonZero = 0;
let gOldNumber = INVALID;
let gCurrentNumber = INVALID;
let gBackup = 0;
let gRule = INVALID;
let gPoint = false;

function DEBUG() {
    console.log("gSum: " + gSum + ", gOldNumber: " + gOldNumber + ", gCurrentNumber: " + gCurrentNumber + ", gRule: " + gRule + ", gPoint: " + gPoint + ", gUnderDecimal: " + gUnderDecimal);
}

function click_number(id) {
    console.log("[click_number] id: " + id);

    let num = 0;
    switch (id) {
        case "td_ac": num = RESET_NUMBER; break;
        case "num_0": num = 0; break;
        case "num_1": num = 1; break;
        case "num_2": num = 2; break;
        case "num_3": num = 3; break;
        case "num_4": num = 4; break;
        case "num_5": num = 5; break;
        case "num_6": num = 6; break;
        case "num_7": num = 7; break;
        case "num_8": num = 8; break;
        case "num_9": num = 9; break;
        default: console.warn("[ERROR] [click_number]"); break;
    }
    // id 를 숫자로?
    // string 자르는 방법도 있음.

    if (num === RESET_NUMBER) {
        all_clear();
        document.getElementById("td_ac").innerText = "AC";
    }
    else {
        if (gSum === 0) {
            document.getElementById("td_ac").innerText = "C";
        }
        set_number(num);
    }
}

function click_rules(id) {
    DEBUG();

    // point
    gPoint = false;
    gUnderDecimal = 0;
    gUnderDecimalNonZero = 0;

    let doPostProcess = false;
    if (gRule === INVALID) {

        gOldNumber = gCurrentNumber;
        gBackup = gCurrentNumber;
        gCurrentNumber = INVALID;
    }
    else {
        if (gOldNumber !== 0 && gCurrentNumber !== INVALID) {
            doPostProcess = true;
        }
    }

    let tmpRule = gRule;
    switch (id) {
        case "td_0": rule_equal(); break; // =
        case "td_1": rule_plus(); break; // +
        case "td_2": rule_substract(); break; // -
        case "td_3": rule_multiply(); break; // *
        case "td_4": rule_division(); break; // / 
        default: console.warn("[ERROR] [click_gRules]"); break;
    }

    if (doPostProcess == true) {
        if (id !== "td_0") {
            let tmpRule2 = gRule;
            if (gRule !== tmpRule) {
                gRule = tmpRule;
            }
            if (gRule === "+") {
                gOldNumber += gCurrentNumber;
            }
            else if (gRule === "-") {
                gOldNumber -= gCurrentNumber;
            }
            else if (gRule === "*") {
                gOldNumber *= gCurrentNumber;
            }
            else if (gRule === "/") {
                gOldNumber /= gCurrentNumber;
            }
            gRule = tmpRule2;

            gBackup = gCurrentNumber;
            document.getElementById("td_display").innerText = gOldNumber;
        }
        gCurrentNumber = INVALID;
    }
    else {
        if (gRule === "/") {
            if (gCurrentNumber === 0) {
                document.getElementById("td_display").innerText = "숫자 아님";
            }
        }
    }

    console.log("gRule: " + gRule);
    console.log("gOldNumber: " + gOldNumber + ", gCurrentNumber: " + gCurrentNumber);
}
function rule_equal() {
    let tmp = 0;
    DEBUG();
    switch (gRule) {
        case "+":
            tmp = gOldNumber + gBackup;
            gOldNumber = tmp;
            break;
        case "-":
            tmp = gOldNumber - gBackup;
            gOldNumber = tmp;
            break;
        case "*":
            tmp = gOldNumber * gBackup;
            gOldNumber = tmp;
            break;
        case "/":
            tmp = gOldNumber / gBackup;
            gOldNumber = tmp;
            break;
        default: console.warn("[ERROR] [click_gRules]"); break;
    }
    DEBUG();

    set_display_font_size(false);
    document.getElementById("td_display").innerText = tmp;
}
function rule_plus() {
    gRule = "+";
}
function rule_substract() {
    gRule = "-";
}
function rule_multiply() {
    gRule = "*";
}
function rule_division() {
    gRule = "/";
}

function click_swap() {
    if (gCurrentNumber === INVALID) {
        if (gOldNumber !== INVALID) {
            gOldNumber = gOldNumber * (-1);
            document.getElementById("td_display").innerHTML = gOldNumber;
        }
    }
    else {
        gCurrentNumber = gCurrentNumber * (-1);
        gBackup = gCurrentNumber;
        document.getElementById("td_display").innerHTML = gCurrentNumber;
    }
}

function click_percent() {
    if (gCurrentNumber === INVALID) {
        if (gOldNumber !== INVALID) {
            gOldNumber = gOldNumber * (0.01);
            document.getElementById("td_display").innerHTML = gOldNumber;
        }
    }
    else {
        gCurrentNumber = gCurrentNumber * (0.01);
        document.getElementById("td_display").innerHTML = gCurrentNumber;
    }
}

function all_clear() {
    gSum = 0;
    gUnderDecimal = 0;
    gUnderDecimalNonZero = 0;
    gCurrentNumber = INVALID;
    gBackup = 0;
    gOldNumber = INVALID;
    gRule = INVALID;
    document.getElementById("td_display").innerText = 0;
    gPoint = false;

    // text 길이에 따른 text 크기 설정
    document.getElementById("td_display").setAttribute("style", "font-size:46px;");

    DEBUG();
}

function set_number(num) {
    console.log("[set_number] num: " + num);

    if (gCurrentNumber === INVALID) {
        gCurrentNumber = 0;
    }
    // caculator
    // 리팩!strCurrentNumber
    let strCurrentNumber = "";
    if (gPoint === true) {
        gUnderDecimal++;
        gCurrentNumber = gCurrentNumber + (num / Math.pow(10, gUnderDecimal));
        if (num === 0)
        {
            if (gCurrentNumber === 0)
            {
                strCurrentNumber = "0.";
            }
            else
            {
                strCurrentNumber = gCurrentNumber;
            }

            // console.log("gCurrentNumber len: " + (gCurrentNumber + "").length + ", gUnderDecimal: " + gUnderDecimal + ", gUnderDecimalNonZero: " + gUnderDecimalNonZero);
            if (strCurrentNumber !== "0.")
            {
                if (gUnderDecimal === 1)
                {
                    strCurrentNumber += ".";
                }
                else if(gUnderDecimalNonZero === 0)
                {
                    strCurrentNumber += ".";
                }
            }

            for(let i = 0; i < (gUnderDecimal - gUnderDecimalNonZero); i++)
            {
                strCurrentNumber += "0";
            }
        }
        else
        {
            
            gUnderDecimalNonZero = gUnderDecimal;
        }
    }
    else {
        gCurrentNumber *= 10;
        gCurrentNumber += num;
    }
    gBackup = gCurrentNumber;


    set_display_font_size(true);

    console.log("!! gCurrentNumber: " + gCurrentNumber);
    if (gPoint === true && num === 0)
    {
        document.getElementById("td_display").innerText = strCurrentNumber;
    }
    else
    {
        document.getElementById("td_display").innerText = gCurrentNumber;
    }
}

function set_display_font_size(bCheckCurrentOnly)
{
    let currentNumberLen = (gCurrentNumber + "").length;
    let oldNumLen = (gOldNumber + "").length;
    let numLen = 0;
    if (bCheckCurrentOnly === true)
    {
        numLen = currentNumberLen;
    }
    else
    {
        if (gOldNumber !== INVALID)
        {
            numLen = (currentNumberLen > oldNumLen) ? currentNumberLen : oldNumLen;
        }
        else
        {
            numLen = currentNumberLen;
        }
    }
    
    console.log("currentNumberLen: " + numLen);
    let px = 46;
    let baseLen = 8;
    if (numLen > baseLen + 11){
        px = 18;
    }
    else if (numLen > baseLen + 10){
        px = 20;
    }
    else if (numLen > baseLen + 8){
        px = 22;
    }
    else if (numLen > baseLen + 6){
        px = 24;
    }
    else if (numLen > baseLen + 5){
        px = 26;
    }
    else if (numLen > baseLen + 4){
        px = 28;
    }
    else if (numLen > baseLen + 3){
        px = 30;
    }
    else if (numLen > baseLen + 2){
        px = 34;
    }
    else if (numLen > baseLen + 1){
        px = 36;
    }
    else if (numLen > baseLen) {
        px = 40;
    }
    else {
        px = 46;
    }

    document.getElementById("td_display").setAttribute("style", "font-size:" + px + "px;");
}

function click_point() {
    if (gPoint === false) {
        if (gCurrentNumber === INVALID) {
            document.getElementById("td_display").innerText = "0.";
        }
        else
        {
            document.getElementById("td_display").innerText = gCurrentNumber + ".";
        }

        gPoint = true;
        DEBUG();
    }
}

// 브라우저 창 닫기 : 동작 안함
function win_close() {
    // window.open().close();
    window.open("file:///Users/sonminsik/Desktop/PROGRAMMING/web-toy-project/web-app-3/calculator.html", "_self").close();
}