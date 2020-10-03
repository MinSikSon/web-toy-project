// 사칙연산 logic 먼저 짜야할 듯,,,

/* global variables */
RESET_NUMBER = null;
INVALID = null;
// null, undefined

// TODO: oldnumber 를 알기 쉽게 변경, currentnumber 도 마찬가지. backup 도 왜 필요한지..
let gSum = 0
let gUnderDecimal = 0;
let gUnderDecimalNonZero = 0;
let gOldNumber = INVALID;
let gCurrentNumber = INVALID;
let gBackup = 0;
let gRule = INVALID;
let gPoint = false;
let DEBUG = false;
function debug() {
    if (DEBUG === true)
    {
        console.log("["+arguments.callee.name+"] " + "gSum: " + gSum + ", gOldNumber: " + gOldNumber + ", gCurrentNumber: " + gCurrentNumber + ", gRule: " + gRule + ", gPoint: " + gPoint + ", gUnderDecimal: " + gUnderDecimal);
    }
}

function click_number(id) {
    console.log("["+arguments.callee.name+"]");
    console.log("id: " + id);

    if (id === "all_clear")
    {
        all_clear();
        // document.getElementById("all_clear").innerText = "AC";
        jQuery("#all_clear").text("AC");
    }
    else if (id >= 0 && id <= 9)
    {
        if (gSum === 0) {
            // document.getElementById("all_clear").innerText = "C";
            $("#all_clear").text("C");
        }
        set_number(Number(id)); // Number() 를 사용해도 되고, id + 0 같이 연산을 하더라도 int 로 자동 변환 됨.
    }
    else
    {
        console.error("["+arguments.callee.name+"] ERROR");
    }
}

function click_rules(id) {
    console.log("["+arguments.callee.name+"]");
    debug();

    point_clear();
    
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
        case "rule_equal": rule_equal(); break; // =
        case "rule_plus": gRule = "+"; break; // +
        case "rule_substract": gRule = "-"; break; // -
        case "rule_multiply": gRule = "*"; break; // *
        case "rule_division": gRule = "/"; break; // / 
        default: console.warn("[ERROR] [click_gRules]"); break;
    }

    // TODO: refac
    if (doPostProcess == true) {
        if (id !== "rule_equal") {
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
            // document.getElementById("calculator_display").innerText = gOldNumber;
            $("#calculator_display").text(gOldNumber);
        }
        gCurrentNumber = INVALID;
    }
    else {
        if (gRule === "/") {
            if (gCurrentNumber === 0) {
                // document.getElementById("calculator_display").innerText = "숫자 아님";
                $("#calculator_display").text("숫자 아님");
            }
        }
    }

    debug();
}
function rule_equal() {
    console.log("["+arguments.callee.name+"]");
    switch (gRule) {
        case "+": gOldNumber += gBackup; break;
        case "-": gOldNumber -= gBackup; break;
        case "*": gOldNumber *= gBackup; break;
        case "/": gOldNumber /= gBackup; break;
        default: console.warn("["+arguments.callee.name+"] ERROR"); break;
    }

    set_display_font_size();
    // document.getElementById("calculator_display").innerText = gOldNumber;
    $("#calculator_display").text(gOldNumber);
}

function click_swap() {
    console.log("["+arguments.callee.name+"]");
    if (gCurrentNumber === INVALID) {
        if (gOldNumber !== INVALID) {
            gOldNumber *= (-1);
            // document.getElementById("calculator_display").innerHTML = gOldNumber;
            $("#calculator_display").text(gOldNumber);
        }
    }
    else {
        gCurrentNumber *= (-1);
        gBackup = gCurrentNumber;
        // document.getElementById("calculator_display").innerHTML = gCurrentNumber;
        $("#calculator_display").text(gCurrentNumber);
    }
}

function click_percent() {
    console.log("["+arguments.callee.name+"]");
    if (gCurrentNumber === INVALID) 
    {
        if (gOldNumber !== INVALID) 
        {
            gOldNumber *= (0.01);
            // document.getElementById("calculator_display").innerHTML = gOldNumber;
            $("#calculator_display").text(gOldNumber);
        }
    }
    else 
    {
        gCurrentNumber *= (0.01);
        // document.getElementById("calculator_display").innerHTML = gCurrentNumber;
        $("#calculator_display").text(gCurrentNumber);
        let tmpStr = String(gCurrentNumber);
        let pointIndex = tmpStr.indexOf(".");
        console.log("tmpStr: " + tmpStr + ", pointIndex: " + pointIndex);
        if (pointIndex !== -1)
        {
            let strLen = tmpStr.length;
            gPoint = true;
            gUnderDecimal += (strLen - pointIndex - 2);
            console.log("strLen: " + strLen + ", gUnderDecimal: " + gUnderDecimal);
            gUnderDecimalNonZero = gUnderDecimal;
        }
    }
}

function all_clear() {
    console.log("["+arguments.callee.name+"]");
    gSum = 0;

    gCurrentNumber = INVALID;
    gBackup = 0;
    gOldNumber = INVALID;
    gRule = INVALID;
    point_clear();

    // document.getElementById("calculator_display").innerText = 0;
    $("#calculator_display").text(0);

    // text 길이에 따른 text 크기 설정
    // document.getElementById("calculator_display").setAttribute("style", "font-size:46px;");
    $("#calculator_display").attr("style", "font-size:46px;");
}

function point_clear() {
    gPoint = false;
    gUnderDecimal = 0;
    gUnderDecimalNonZero = 0;
}

function set_number(num) {
    console.log("["+arguments.callee.name+"]");
    console.log("num: " + num);

    if (gCurrentNumber === INVALID) {
        gCurrentNumber = 0;
    }
    // caculator
    // 리팩!strCurrentNumber
    let strCurrentNumber = "";
    if (gPoint === true) {
        debug();
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

    set_display_font_size();

    console.log("gCurrentNumber: " + gCurrentNumber);
    if (gPoint === true && num === 0)
    {
        // document.getElementById("calculator_display").innerText = strCurrentNumber;
        $("#calculator_display").text(strCurrentNumber);
    }
    else
    {
        // document.getElementById("calculator_display").innerText = gCurrentNumber;
        $("#calculator_display").text(gCurrentNumber);
    }
}

function set_display_font_size(){
    console.log("["+arguments.callee.name+"]");
    let numLen = 0;
    let currentNumLength = (gCurrentNumber + "").length;
    let oldNumLength = (gOldNumber + "").length;
    if (gCurrentNumber === INVALID)
    {
        numLen = oldNumLength;
    }
    else
    {
        numLen = (currentNumLength >= oldNumLength) ? currentNumLength : oldNumLength;
    }

    let px = 46;
    let baseLen = 8;
    if (numLen > baseLen + 11){
        px = 17;
    }
    else if (numLen > baseLen + 10){
        px = 19;
    }
    else if (numLen > baseLen + 9){
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

    // document.getElementById("calculator_display").setAttribute("style", "font-size:" + px + "px;");
    $("#calculator_display").attr("style", "font-size:" + px + "px;");
}

function click_point() {
    console.log("["+arguments.callee.name+"]");
    if (gPoint === false) {
        if (gCurrentNumber === INVALID) {
            // document.getElementById("calculator_display").innerText = "0.";
            $("#calculator_display").text("0.");
        }
        else
        {
            // document.getElementById("calculator_display").innerText = gCurrentNumber + ".";
            $("#calculator_display").text(gCurrentNumber + ".");
        }

        gPoint = true;
    }
}