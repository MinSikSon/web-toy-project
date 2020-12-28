// 사칙연산 logic 먼저 짜야할 듯,,,

/* global variables */
RESET_NUMBER = null;
INVALID = null;
// null, undefined

// TODO: oldnumber 를 알기 쉽게 변경, currentnumber 도 마찬가지. backup 도 왜 필요한지..
let gCalculationResult = INVALID;
let gInputNumber = INVALID;
let gStrInputNumber = INVALID;
let gBackupNumberForEqualOperation = 0;
let gOperator = INVALID;
let gPoint = false;

let DEBUG = true;
function debug(name)
{
    if (DEBUG === true)
    {
        console.log("["+name+"] " + ", gCalculationResult: " + gCalculationResult + ", gInputNumber: " + gInputNumber + ", gStrInputNumber: " + gStrInputNumber + ", gOperator: " + gOperator + ", gPoint: " + gPoint);
    }
}

// $("#idid").on()
function click_number(id)
{
    debug(arguments.callee.name)
    console.log("id: " + id);

    if (id === "all_clear")
    {
        all_clear();
        // document.getElementById("all_clear").innerText = "AC";
        jQuery("#all_clear").text("AC");
    }
    else if (Number(id) >= 0 && id <= 9) // !
    {
        if ($("#all_clear").text() === "AC")
        {
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

function click_operator(id)
{
    console.log("["+arguments.callee.name+"]");
    debug();

    point_clear();

    let firstClickOnOperator = (gOperator === INVALID) || (gCalculationResult === INVALID);
    let performCalculation = false;
    
    // NOTE: 연산자를 최초로 클릭한 경우.
    if (firstClickOnOperator === true)
    {
        gCalculationResult = gInputNumber;
        gBackupNumberForEqualOperation = gInputNumber;
        gInputNumber = INVALID;
    }
    else
    {
        performCalculation = (gCalculationResult !== INVALID) && (gInputNumber !== INVALID);
    }

    let gPrevOperator = gOperator;
    switch (id)
    {
        case "op_equal": op_equal(); break; // =
        case "op_plus": gOperator = "+"; break; // +
        case "op_substract": gOperator = "-"; break; // -
        case "op_multiply": gOperator = "*"; break; // *
        case "op_division": gOperator = "/"; break; // / 
        default: console.warn("[ERROR] [click_gOperators]"); break;
    }

    let divideByZero = (gOperator === "/") && (gInputNumber === 0);

    if (performCalculation === true)
    {
        if (id !== "op_equal")
        {
            let backupCurrentOperator = gOperator;
            let operatorChanged = (gOperator !== gPrevOperator);
            if (operatorChanged === true)
            {
                gOperator = gPrevOperator;
            }

            calculate(gInputNumber);

            gBackupNumberForEqualOperation = gInputNumber;
            // document.getElementById("calculator_display").innerText = gCalculationResult;
            $("#calculator_display").text(gCalculationResult);
        }

        gInputNumber = INVALID;
    }
    else if (divideByZero === true)
    {
        // document.getElementById("calculator_display").innerText = "숫자 아님";
        $("#calculator_display").text("숫자 아님");
    }

    debug();
}

function calculate(inputNumber)
{
    console.log("["+arguments.callee.name+"]");
    switch (gOperator)
    {
        case "+": gCalculationResult += Number(inputNumber); break;
        case "-": gCalculationResult -= Number(inputNumber); break;
        case "*": gCalculationResult *= Number(inputNumber); break;
        case "/": gCalculationResult /= Number(inputNumber); break;
        default: console.warn("["+arguments.callee.name+"] ERROR"); break;
    }
}

function op_equal()
{
    console.log("["+arguments.callee.name+"]");
    calculate(gBackupNumberForEqualOperation);

    set_display_font_size();
    // document.getElementById("calculator_display").innerText = gCalculationResult;
    $("#calculator_display").text(gCalculationResult);
}

function click_swap() {
    console.log("["+arguments.callee.name+"]");
    if (gInputNumber === INVALID)
    {
        if (gCalculationResult !== INVALID)
        {
            gCalculationResult *= (-1);
            // document.getElementById("calculator_display").innerHTML = gCalculationResult;
            $("#calculator_display").text(gCalculationResult);
        }
    }
    else
    {
        gInputNumber *= (-1);
        gBackupNumberForEqualOperation = gInputNumber;
        // document.getElementById("calculator_display").innerHTML = gInputNumber;
        $("#calculator_display").text(gInputNumber);
    }
}

function click_percent()
{
    console.log("["+arguments.callee.name+"]");
    if (gInputNumber === INVALID) 
    {
        if (gCalculationResult !== INVALID) 
        {
            gCalculationResult *= (0.01);
            // document.getElementById("calculator_display").innerHTML = gCalculationResult;
            $("#calculator_display").text(gCalculationResult);
        }
    }
    else 
    {
        gStrInputNumber = Number(gStrInputNumber) * (0.01); // NOTE: 문자열 연산의 치명적인 단점.
        gStrInputNumber += "";
        gInputNumber = Number(gStrInputNumber);

        // document.getElementById("calculator_display").innerHTML = gInputNumber;
        $("#calculator_display").text(gInputNumber);
        gPoint = String(gInputNumber).includes(".");
    }

    debug();

    set_display_font_size();
}

function all_clear()
{
    console.log("["+arguments.callee.name+"]");
    gInputNumber = INVALID;
    gBackupNumberForEqualOperation = 0;
    gCalculationResult = INVALID;
    gOperator = INVALID;
    point_clear();

    // document.getElementById("calculator_display").innerText = 0;
    $("#calculator_display").text(0);

    // text 길이에 따른 text 크기 설정
    // document.getElementById("calculator_display").setAttribute("style", "font-size:46px;");
    $("#calculator_display").attr("style", "font-size:46px;");
}

function point_clear()
{
    gPoint = false;
}

function set_number(num)
{
    console.log("["+arguments.callee.name+"]");
    console.log("num: " + num);

    if (gInputNumber === INVALID) 
    {
        gInputNumber = 0;
        gStrInputNumber = "";
    }

    gStrInputNumber += num;

    debug();
    gInputNumber = Number(gStrInputNumber)
    debug();
    
    $("#calculator_display").text(gStrInputNumber);
    gBackupNumberForEqualOperation = gInputNumber;

    set_display_font_size();
}

function set_display_font_size(){
    console.log("["+arguments.callee.name+"]");
    let numLen = 0;
    let currentNumLength = (gInputNumber + "").length;
    let oldNumLength = (gCalculationResult + "").length;
    console.log("gInputNumber: " + gInputNumber);
    if (gInputNumber === INVALID)
    {
        numLen = oldNumLength;
    }
    else
    {
        if (gCalculationResult === INVALID)
        {
            numLen = currentNumLength;
        }
        else
        {
            numLen = (currentNumLength >= oldNumLength) ? currentNumLength : oldNumLength;
        }
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

function click_point()
{
    console.log("["+arguments.callee.name+"]");
    if (gPoint === false)
    {
        if (gInputNumber === INVALID)
        {
            // document.getElementById("calculator_display").innerText = "0.";
            $("#calculator_display").text("0.");
            gStrInputNumber += "0.";
            console.log("gStrInputNumber: " + gStrInputNumber);
        }
        else
        {
            // document.getElementById("calculator_display").innerText = gInputNumber + ".";
            $("#calculator_display").text(gInputNumber + ".");
            gStrInputNumber += ".";
            console.log("gStrInputNumber: " + gStrInputNumber);
        }

        gPoint = true;
    }
}