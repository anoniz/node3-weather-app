
console.log('i m in the browser');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    msg1.textContent = 'loading the data WAIT!!!'
    msg2.textContent = ''

fetch('http://127.0.0.1:3000/weather?addr=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)

            msg1.textContent = data.error
           

        }  else {
            console.log(data.location)
            console.log(data.forecast)
            
            msg1.textContent = JSON.stringify(data.location)
            msg2.textContent = JSON.stringify(data.forecast)

        }
    })
})


    console.log(location)
})