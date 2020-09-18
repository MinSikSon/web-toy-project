function click_number(id) {
    console.log("[click_number] id: " + id);

    let num = 0;
    if (id === "num_0") {
        num = 0;
    }
    else if (id === "num_1") {
        num = 1;
    }
    else if (id === "num_2") {
        num = 2;
    }
    else if (id === "num_3") {
        num = 3;
    }
    else if (id === "num_4") {
        num = 4;
    }
    else if (id === "num_5") {
        num = 5;
    }
    else if (id === "num_6") {
        num = 6;
    }
    else if (id === "num_7") {
        num = 7;
    }
    else if (id === "num_8") {
        num = 8;
    }
    else if (id === "num_9") {
        num = 9;
    }
    else {
        num = 100;
    }
    set_result(num);
}

let sum = 0
function set_result(num) {
    console.log("[set_result] num: " + num);
    // caculator
    sum += num;

    document.getElementById("td_5").innerText = sum;
}