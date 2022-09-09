const next_btn = document.querySelector('#next-btn')
const img_container = document.querySelector('.img-container')


const getNewDog = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            img_container.innerHTML = ` <img src="${data.message}" alt="Dog Image">`
        })
}


getNewDog();

next_btn.addEventListener('click', getNewDog);
