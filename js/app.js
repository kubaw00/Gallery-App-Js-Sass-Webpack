import '../sass/style.scss';

//class approaches
// class Doggo {
//     constructor() {
//         this.apiUrl = 'https://dog.ceo/api';
//         this.imgEl = document.querySelector('.featured-dog img');
//         this.backgroundEl = document.querySelector('.featured-dog__background');
//         this.tilesEl = document.querySelector('.tiles');
//         this.spinnerEl = document.querySelector('.spinner');

//         this.init();
//     }

     const apiUrl = 'https://dog.ceo/api';
     const imgEl = document.querySelector('.featured-dog img');
     const backgroundEl = document.querySelector('.featured-dog__background');
     const tilesEl = document.querySelector('.tiles');
     const spinnerEl = document.querySelector('.spinner');


     function showLoading() {
        spinnerEl.classList.add('spinner--visible');
    }

     function hideLoading() {
        spinnerEl.classList.remove('spinner--visible');
    }

     function listBreeds() {
        return fetch(`${apiUrl}/breeds/list/all`)
            .then(resp => resp.json())
            .then(data => data.message);
    }

    function getRandomImage() {
        return fetch(`${apiUrl}/breeds/image/random`)
            .then(resp => resp.json())
            .then(data =>{
                return data.message
            } )
            
    }

     function getRandomImageByBreed(breed) {
        return fetch(`${apiUrl}/breed/${breed}/images/random`)
            .then(resp => resp.json())
            .then(data => data.message);
    }

    

    function showImageWhenReady(image) {
        imgEl.setAttribute('src', image);
        backgroundEl.style.backgroundImage = `url("${image}")`;
        hideLoading();
    }

     function addBreed(breed, subBreed) {
        let name;
        let type;

        if (typeof subBreed === 'undefined') {
            name = breed;
            type = breed;
        } else {
            name = `${breed} ${subBreed}`;
            type = `${breed}/${subBreed}`;
        }

        const tile = document.createElement('div');
        tile.classList.add('tiles__tile');

        const tileContent = document.createElement('div');
        tileContent.classList.add('tiles__tile-content');

        tileContent.innerText = name;
        tileContent.addEventListener('click', () => {
            window.scrollTo(0, 0);
            showLoading();
            getRandomImageByBreed(type)
                .then(img => showImageWhenReady(img));
        });

        tile.appendChild(tileContent);
        tilesEl.appendChild(tile);
    }

     function showAllBreeds() {
        listBreeds()
            .then(breeds => {
                for (const breed in breeds) {
                    if (breeds[breed].length === 0) {
                        addBreed(breed);
                    } else {
                        for (const subBreed of breeds[breed]) {
                            addBreed(breed, subBreed);
                        }
                    }
                }
            });
    }


function init() {
    showLoading();
    getRandomImage()
        .then(img => showImageWhenReady(img));

    showAllBreeds();
}

init();

// document.addEventListener('DOMContentLoaded', () => {
//     new Doggo();
// });