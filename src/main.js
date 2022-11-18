
// let main = document.getElementById("mainCalcInput");
// let mainCalc = document.getElementById("mainCalc");

// function handleForm(event) {
//     event.preventDefault();
//     // console.log(mainCalc.querySelector('input[name="juan"]'));
//     const data = new FormData(event.target);
//     console.log([...data.entries()][0][1]);
//     mainCalc.reset();
// }
// mainCalc.addEventListener('submit', handleForm);

const input = document.querySelector("#inputText")

document.onkeydown = function (event) {
    event = event || window.event;
    // if (event.key == "e") {
    //     input.textContent = event.key;
    // }
    let text;
    // // if (event.key == "Shift") {
    // //     return;
    // // }
    // // else {
    // //     text = document.createTextNode(event.key);
    // }

    switch (event.key) {
        case "Shift":
            return;
        case "Alt":
            return;
        case "Control":
            return;
        case "Enter":
            input.textContent = "";
            return;
        case "Backspace":
            input.textContent = input.textContent.slice(0, input.textContent.length - 1);
            break;
        default:
            text = document.createTextNode(event.key);
    }
    input.appendChild(text);
};