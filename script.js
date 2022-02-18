const form = document.querySelector('.js-auth-form')
const errorButton = document.querySelector('.error_button_container button')

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

errorButton.addEventListener('click', () => {
    alert('Paldies, Jūsu ziņojums par kļūdu ir saņemts!')
})