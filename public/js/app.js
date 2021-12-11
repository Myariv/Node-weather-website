const domForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#messsage-1')
const messageTwo = document.querySelector('#messsage-2')


domForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?adress=${location}`).then(res => {
    
        res.json()
            .then(res => {
                if (res.error) {
                    messageOne.textContent = `Error: ${res.error} `
                    return
                }
                messageOne.textContent = `Loaction: ${res.location}` 
                messageTwo.textContent = `Forcast: ${res.forcast}` 
                console.log(res.forcast)
                console.log(res.location)
            })
    })

})