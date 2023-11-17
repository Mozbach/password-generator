const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const clipboardEl = document.getElementById('clipboard');
const generateEl = document.getElementById('generate');

// I will actually separate the below code into a different file, but this dude never does things like that.
const randomFunc = {
    lower : getRandomLower,
    upper : getRandomUpper,
    number : getRandomNumber,
    symbol : getRandomSymbol 
}; // Creates an object with the values of returned functions - argh me gaawd this is cool

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if(!password) { return }

    textarea.value = password;

    document.body.appendChild(textarea);

    navigator.clipboard.writeText(password);
    textarea.remove();
    resultEl.innerText = "Password is copied to the clipboard";
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; // The + infront of the lengthEl.value, turns the length's value into a number - Whaaaat!?
    const hasLower = lowercaseEl.checked; // Checks if the checkbox is checked, if so - returns true, if not - returns false
    const hasUpper = uppercaseEl.checked; // Checks if the checkbox is checked, if so - returns true, if not - returns false
    const hasNumber = numbersEl.checked; // Checks if the checkbox is checked, if so - returns true, if not - returns false
    const hasSymbol = symbolsEl.checked; // Checks if the checkbox is checked, if so - returns true, if not - returns false

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
}); //

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    // typesCount gets true/false values from paramaters. If false = 0, if true = 1. Then counts them together
    // Then we know how many of the checkboxes are actually selected
    const typesCount = lower + upper + number + symbol;
    // This returns an array of lower, upper, number and symbol each assigned their boolean value
    // then filters all the ones out of the array that = false.
    const typesArr = [{lower}, {upper}, {number}, {symbol}]
        .filter(item => Object.values(item)[0])
        .sort( () => Math.random() - 0.5); // this bit randomizes the filling of the array

        if(typesCount === 0) {
            return '';
        }

        // for loop to return the type of each item in typesArr
        for(let i = 0; i < length; i+=typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName](); // This is going over my head a little
            // Ooook... He is getting the name of the function within the randomFunc object, the object containing all of the functions -> Then calling that function
            })
        } // end of for loop

        const finalPassword = generatedPassword.slice(0, length);

        return finalPassword;

    console.log(typesArr);
}

function getRandomLower() {
    // Never seen this before, it basically returns a random lower case number based on ASCII codes.... clever.
    // Honestly some of the techniques used is truly creative. I would have used arrays and loops and shit to get similar results. - The more you know, I guess.
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // ASCII lower case letters range from 97 -> 122
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // ASCII upper case letters range from 65 -> 90
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // ASCII numbers 0 - 9 range from 48 -> 57
}

// function getRandomSymbol() {
//     return String.fromCharCode(Math.floor(Math.random() * 13) + 33); // ASCII First set of symbols range from 33 -> 47 
// } // Guy wants to use an array looping through a string of specific symbols.... So this will work as the rest, but is not what the course is doing

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'; // Does really not matter which symbols you use... The more abstract, the better, I guess
    return symbols [Math.floor(Math.random() * symbols.length)]
}