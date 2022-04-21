/*common*/
const errorButton = document.querySelector('.error_button_container button')
errorButton.addEventListener('click', () => {
    let issue_text = ''
    do {
        issue_text = prompt('Lūdzu, aprakstiet Jūsu kļūdu!')
    } while (issue_text === '')
    if (issue_text !== null) {
        let request_body = JSON.stringify({
            "title": "Kļūda no lapas \"" + document.title + "\"",
            "body": issue_text,
            "labels": ["bug"]
        })
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "https://api.github.com/repos/Dana-Oborenko/chemistry-system/issues")
        xhr.setRequestHeader("Accept", "application/vnd.github.v3+json")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Authorization", "token " + "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")
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                alert('Paldies, Jūsu ziņojums par kļūdu tika nosūtīts!')
            }
        })
        xhr.send(request_body)
    }
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

    const fetchJSONFiles = async () => {
        const VIELAS_DATA = await fetch('https://raw.githubusercontent.com/Dana-Oborenko/chemistry-system/main/data/vielas.json')
        const VIELAS = await VIELAS_DATA.json()
        
        const APRIKOJUMI_DATA = await fetch('https://raw.githubusercontent.com/Dana-Oborenko/chemistry-system/main/data/inventars.json')
        const APRIKOJUMI = await APRIKOJUMI_DATA.json()
        
        // console.log(VIELAS);
        // console.log(APRIKOJUMI);
    
        VIELAS.forEach((viela) => {
            let newRow = document.createElement('tr')
            for (const cell of table.previousElementSibling.rows[0].cells) {
                let newCell = document.createElement('td')
                switch (cell.textContent) {
                    case 'ID':
                        newCell.textContent = viela['id']
                        break
                    case 'Nosaukums':
                        newCell.textContent = viela['nosaukums']
                        break
                    case 'Tips':
                        newCell.textContent = viela['tips']
                        break
                    case 'Apakštips':
                        newCell.textContent = viela['apakstips']
                        break
                    case 'Skaits':
                        newCell.textContent = viela['skaits']
                        break
                    case 'Svars':
                        newCell.textContent = viela['daudzums'] + ' ' + viela['mervienibas']
                        break
                    case 'Komentāri':
                        newCell.textContent = viela['komentari']
                        break
                }
                newRow.appendChild(newCell)
            }
            table.appendChild(newRow)
        })

        APRIKOJUMI.forEach((aprikojums) => {
            let newRow = document.createElement('tr')
            for (const cell of table.previousElementSibling.rows[0].cells) {
                let newCell = document.createElement('td')
                switch (cell.textContent) {
                    case 'ID':
                        newCell.textContent = aprikojums['id']
                        break
                    case 'Nosaukums':
                        newCell.textContent = aprikojums['nosaukums']
                        break
                    case 'Tips':
                        newCell.textContent = aprikojums['tips']
                        break
                    case 'Apakštips':
                        newCell.textContent = aprikojums['apakstips']
                        break
                    case 'Skaits':
                        newCell.textContent = aprikojums['skaits']
                        break
                    case 'Svars':
                        break
                    case 'Komentāri':
                        newCell.textContent = aprikojums['komentari']
                        break
                }
                newRow.appendChild(newCell)
            }
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
        // console.log(array)
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
            if (searchInput.value === '') {
                showAllButton.click()
            } else {
                const result = []
                for (const obj of array) {
                    // console.log(obj)
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
            searchInput.value = ''
        })
        const showMaterialsButton = document.getElementById('show_materials_button')
        showMaterialsButton.addEventListener('click', () => {
            const result = array.filter(obj => obj.Tips == 'Viela' || obj.Tips == 'reaģents')
            // console.log(result)
            refreshTable(result)
            searchInput.value = ''
        })
        const showToolsButton = document.getElementById('show_tools_button')
        showToolsButton.addEventListener('click', () => {
            const result = array.filter(obj => obj.Tips == 'Aprīkojums' || obj.Tips == 'svari' || obj.Tips == 'sildītājs' || obj.Tips == 'trauks')
            // console.log(result)
            refreshTable(result)
            searchInput.value = ''
        })
    }
    fetchJSONFiles().catch(error => console.log(error))
}