document.addEventListener('DOMContentLoaded', function() {

    // Taschenrechner
    let rechner = {
        num_previous: false,
        num_calculat: false,
        num_isnumber: false,
        num_isdotdot: false,
        dis_upper: '',
        dis_lower: '',
        opr_allow: false
    }


    // Number Buttons:
    document.querySelectorAll('.number').forEach((button) => {
        // When each number button is clicked
        button.onclick = () => {
            // ensure no double dots
            if (button.dataset.todo === "." && rechner.num_isdotdot === true) {
                return;
            }

            // if lower screen exceeds 20 digits
            if (rechner.dis_lower.length === 18) {
                console.log("MAXIMUM DIGIT MET")
                return;
            }

            // if input after calculation, reset
            if (rechner.num_calculat === true) {
                rechner.dis_lower = '';
                rechner.dis_upper = '';
                rechner.num_calculat = false;
                rechner.num_previous = false;
                // display both screens
                document.querySelector('#display-upper').innerHTML = rechner.dis_upper;
                document.querySelector('#display-lower').innerHTML = rechner.dis_lower;
                console.log("RESET");
            }

            // indicate that input is number
            rechner.num_isnumber = true;

            // if previous input is a number
            if (rechner.num_previous === true) {
                // add the value 
                rechner.dis_lower += button.dataset.todo;
                // display lowerscreen
                document.querySelector('#display-lower').innerHTML = rechner.dis_lower;
            // else if previous input is not a number
            } else {
                // add the value on calScreen.lower to calScreen.upper
                rechner.dis_upper += rechner.dis_lower;
                // assign the value to calScreen.lower
                rechner.dis_lower = button.dataset.todo;
                // allow operator input
                rechner.opr_allow = true;
                // let the next input know that the previous input is a number
                rechner.num_previous = true;
                // display both screens
                document.querySelector('#display-upper').innerHTML = rechner.dis_upper;
                document.querySelector('#display-lower').innerHTML = rechner.dis_lower;
                console.log(rechner);
            };

            // if input ".", disable next dot input
            if (button.dataset.todo === ".") {
                rechner.num_isdotdot = true;
            }
            console.log(rechner);

            // Digit control
            // if exceeds 12 digits, shrink font-size
            if (rechner.dis_lower.length > 10) {
                console.log("DIGIT LIMIT MET")
                document.querySelector('#display-lower').style.fontSize = "30px";
            };
        };
    });
    

    // PERCENT
    // When percent button is clicked
    document.querySelector('#percent').onclick = () => {
        // if the value on lower screen is number
        if (rechner.num_isnumber === true) {
            rechner.dis_lower = rechner.dis_lower / 100;
        };

        // Adjust display
        if (rechner.dis_lower.length > 7) {
            document.querySelector('#display-lower').style.fontSize = "30px";
        } else if (rechner.dis_lower.length > 20) {
            document.querySelector('#display-lower').style.fontSize = "20px";
        } else if (rechner.dis_lower.length <= 7) {
            document.querySelector('#display-lower').style.fontSize = "50px";
        }


        // display both screens
        document.querySelector('#display-upper').innerHTML = rechner.dis_upper;
        document.querySelector('#display-lower').innerHTML = rechner.dis_lower;
        console.log(rechner);
    }


    // OPERATOR
    document.querySelectorAll('.operator').forEach((button) => {
        // When operator button is clicked
        button.onclick = () => {
            // indicate that input is NOT number
            rechner.num_isnumber = false;     
            // enable next dot input
            rechner.num_isdotdot = false;
            // display
            document.querySelector('#display-lower').style.fontSize = "50px";       

            // if the input is from last calculation
            if (rechner.num_calculat === true) {
                // assign the last calculation to upper screen
                rechner.dis_upper = rechner.dis_lower;
            }

            // if the previous input is not an operator
            if (rechner.opr_allow === true) {
                // let the next input know that the previous input is an operator
                rechner.opr_allow = false;
                // let the next input know that the previous input is not a number
                rechner.num_previous = false;
                // if not calculated input
                if (rechner.num_calculat === false) {
                    // add the value on lower screen to upper screen
                    rechner.dis_upper += rechner.dis_lower;
                }
                // assign the input value to lower screen
                rechner.dis_lower = button.dataset.todo;
                // display both values on screen
                document.querySelector('#display-upper').innerHTML = rechner.dis_upper;
                document.querySelector('#display-lower').innerHTML = rechner.dis_lower;
                console.log(rechner);
            };
            
            // reset the calculated indicator
            rechner.num_calculat = false;
        };
    });

    // EQUAL
    // When equal button is clicked
    document.querySelector('#equal').onclick = () => {

        // Reset display
        document.querySelector('#display-lower').style.fontSize = "50px";

        // if the last input is not an operator
        if (rechner.opr_allow === true) {
            // Enable input of operator
            rechner.opr_allow = true;
            // Indicate the result is calculated
            rechner.num_calculat = true;
            // add values in the lower screen to the end of upper screen
            rechner.dis_upper += rechner.dis_lower;
            // calculation
            rechner.dis_lower = eval(rechner.dis_upper).toString();
            
            // Adjust display
            if (rechner.dis_lower.length > 7){
                document.querySelector('#display-lower').style.fontSize = "30px";
            }

            // display both screens
            document.querySelector('#display-upper').innerHTML = rechner.dis_upper;
            document.querySelector('#display-lower').innerHTML = rechner.dis_lower;
            console.log(rechner);
        };
    };

    // RESET
    // When reset button is clicked
    document.querySelector('#reset').onclick = () => {
        // reset everything
        rechner.num_previous = false;
        rechner.num_calculat = false;
        rechner.num_isnumber = false;
        rechner.num_isdotdot = false;
        rechner.dis_upper = '';
        rechner.dis_lower = '';
        rechner.opr_allow = false;
        // display both screens
        document.querySelector('#display-upper').innerHTML = rechner.dis_upper;
        document.querySelector('#display-lower').innerHTML = rechner.dis_lower;
        document.querySelector('#display-lower').style.fontSize = "50px";
        console.log(rechner);
    };

});
