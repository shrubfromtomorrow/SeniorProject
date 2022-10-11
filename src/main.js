// document.getElementById("mainCalcInput")
//     .addEventListener("keyup", function(event) {
//         event.preventDefault();
//         console.log(event.key)
//     }
// );

let main = document.getElementById("mainCalcInput");
let mainCalc = document.getElementById("mainCalc");

function handleForm(event) {
    event.preventDefault();
    // console.log(mainCalc.querySelector('input[name="juan"]'));
    const data = new FormData(event.target);
    console.log([...data.entries()][0][1]);
    mainCalc.reset();
}  
mainCalc.addEventListener('submit', handleForm);