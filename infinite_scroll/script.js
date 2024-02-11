const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;    
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'IrxGTwpSzrjxaja1PDZ0IaB3BycKEoRLXrz0BeXxwx4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true;
    }
}
function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
// Create Elements for links and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        // check if finished loading
        img.addEventListener('load', imageLoaded);
        img.setAttribute('title', photo.alt_description);
        // put <img> inside <a>, then both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {

    }
}

// Check to see if user is near bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
       ready = false; 
       getPhotos();
    }
})

getPhotos();