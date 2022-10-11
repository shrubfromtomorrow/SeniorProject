// document.getElementById("mainCalcInput")
//     .addEventListener("keyup", function(event) {
//         event.preventDefault();
//         console.log(event.key)
//     }
// );

let main = document.getElementById("mainCalcInput");

function myKeyPress(e){
    if (e.key == "Enter") {
        console.log(e);
    }
}

// Form submit refreshing whole page
