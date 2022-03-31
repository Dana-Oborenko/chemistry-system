const form = document.querySelector('.js-auth-form')
const errorButton = document.querySelector('.error_button_container button')
const table = document.querySelector('.data-table table')

if (form != null) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const username = document.querySelector('#js-form-username')
        const password = document.querySelector('#js-form-password')
        if (username.value === '') {
            alert('Lūdzu, ievadiet savu lietotājvārdu!')
            return
        }
        if (password.value === '') {
            alert('Lūdzu, ievadiet savu paroli!')
            return
        }
        window.open("data.html", "_self")
    })
}

if (table != null) {
    // ...
}

//var header = document.querySelector('table');
//var section = document.querySelector('td');

//var requestURL = 'vielas.json';
//var request = new XMLHttpRequest();
//request.open('GET', requestURL);
//request.responseType = 'json';
//request.send();
//let json = JSON.stringify(value, [replacer, space])


function readJSON(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
 
}
 
readJSON("vielas.json", function(text){
    let data = JSON.parse(text);
    console.log(vielas);
});




errorButton.addEventListener('click', () => {
    alert('Paldies, Jūsu ziņojums par kļūdu ir saņemts!')
})