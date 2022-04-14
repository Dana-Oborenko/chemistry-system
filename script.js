/*common*/ 
const errorButton = document.querySelector('.error_button_container button')
errorButton.addEventListener('click', () => {
    alert('Paldies, Jūsu ziņojums par kļūdu ir saņemts!')
})
/*login*/
if (document.title == 'Pieslēgšanās') {
    const form = document.querySelector('.js-auth-form')
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
/*data*/
if (document.title == 'Publiskie dati') {
    const EMPTY_TABLE_CONTENTS = '<tr><td colspan = "7">Nekas nav atrasts</td><tr>'
    const table = document.querySelector('.data-table table tbody')
    
    var keys = []
    for (const cell of table.previousElementSibling.rows[0].cells) {
        keys.push(cell.textContent)
    }
    console.log(keys)
    
    const fetchJSONFiles = async () => {
        const VIELAS_DATA = await fetch('https://raw.githubusercontent.com/Dana-Oborenko/chemistry-system/main/data/vielas.json')
        const VIELAS = await VIELAS_DATA.json()
        
        const APRIKOJUMS_DATA = await fetch('https://raw.githubusercontent.com/Dana-Oborenko/chemistry-system/main/data/inventars.json')
        const APRIKOJUMS = await APRIKOJUMS_DATA.json()
        
        console.log(VIELAS);
        console.log(APRIKOJUMS);
    
        VIELAS.forEach((viela) => {
            let newRow = document.createElement('tr')
            Object.values(viela).forEach((value) => {
                for (const key of keys) {
                    let newCell = document.createElement('td')
                    if (key == 'ID') {
                        newCell.textContent = value['id']
                    }
                    if (key == 'Nosaukums') {
                        newCell.textContent = value['nosaukums']                    
                    }
                    /* ... */
                    newRow.appendChild(newCell)
                }
            })
            table.appendChild(newRow)
        })

        APRIKOJUMS.forEach((aprikojums) => {
            let newRow = document.createElement('tr')
            Object.values(aprikojums).forEach((value) => {
                let newCell = document.createElement('td')
                newCell.textContent = value
                newRow.appendChild(newCell)
            })
            table.appendChild(newRow)
        })

        var array = []
        for (const row of table.rows) {
            let obj = {}
            let i = 0
            for (const cell of row.cells) {
                obj[keys[i]] = cell.textContent
                i++
            }
            array.push(obj)
        }
        console.log(array)
    }
    fetchJSONFiles()

    
    
    function refreshTable(result) {
        table.innerHTML = ''
        if (result.length > 0) {
            result.forEach((obj) => {
                let newRow = document.createElement('tr')
                Object.values(obj).forEach((value) => {
                    let newCell = document.createElement('td')
                    newCell.textContent = value
                    newRow.appendChild(newCell)
                })
                table.appendChild(newRow)
            })
        } else {
            table.innerHTML = EMPTY_TABLE_CONTENTS
        }
    }
    
    const searchInput = document.getElementById('search_input')
    searchInput.addEventListener('keyup', function(event) {
        if (event.code === 'Enter') {
            searchButton.click()
        }
    })

    const searchButton = document.getElementById('search_buttom')
    searchButton.addEventListener('click', () => {
        if (searchInput.value.length === 0) {
            showAllButton.click()
        } else {
            const result = []
            for (const obj of array) {
                console.log(obj)
                for (const [key, value] of Object.entries(obj)) {
                    if (value.toUpperCase().includes(searchInput.value.toUpperCase())) {
                        result.push(obj)
                        break
                    }
                }
            }
            refreshTable(result)
        }
    })
    const showAllButton = document.getElementById('show_all_button')
    showAllButton.addEventListener('click', () => {
        refreshTable(array)
    })
    const showMaterialsButton = document.getElementById('show_materials_button')
    showMaterialsButton.addEventListener('click', () => {
        const result = array.filter(obj => obj.Tips == 'Viela' || obj.Tips == 'reaģents')
        console.log(result)
        refreshTable(result)
    })
    const showToolsButton = document.getElementById('show_tools_button')
    showToolsButton.addEventListener('click', () => {
        const result = array.filter(obj => obj.Tips == 'Aprīkojums' || obj.Tips == 'svari' || obj.Tips == 'sildītājs' || obj.Tips == 'trauks')
        console.log(result)
        refreshTable(result)
    })
}

//var header = document.querySelector('table');
//var section = document.querySelector('td');

//var requestURL = 'vielas.json';
//var request = new XMLHttpRequest();
//request.open('GET', requestURL);
//request.responseType = 'json';
//request.send();
//let json = JSON.stringify(value, [replacer, space])


/* function readJSON(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
 
} */



/*fetch('https://raw.githubusercontent.com/Dana-Oborenko/chemistry-system/main/data/inventars.json')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

/*document.getElementById("name").innerHTML = JSONObject.Klients.Vārds + " " + JSONObject.Klients.Uzvārds
document.getElementById("city").innerHTML = JSONObject["Piegādes adrese"].Pilsēta */
