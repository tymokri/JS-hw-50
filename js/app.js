'use strict';

const API_URL = 'https://jsonplaceholder.typicode.com';
const galleryElements = document.querySelector('.gallery');
const button = document.querySelector('.go-button');


async function fetchAlbumList() {
    const response = await fetch(API_URL + '/albums');
    return await response.json();
}


async function enrichAlbumList(jsonAlbumList) {
    const response = await fetch(API_URL + '/photos');
    const jsonPhotoList = await response.json();

    jsonAlbumList.forEach(galleryItem => {
        galleryItem.firstPhotoThumbnailUrl = jsonPhotoList
            .filter(photoItem => photoItem.albumId === galleryItem.id)
            .at(0).thumbnailUrl;
    });
    return jsonAlbumList;
}


async function renderAlbumList(jsonAlbumList) {
    jsonAlbumList.forEach(galleryItem => {
        galleryElements.innerHTML += `
            <div class="column" id="${galleryItem.id}">
                <div class="card">
                    <div class="card-image">
                        <div class="image">
                            <img src="${galleryItem.firstPhotoThumbnailUrl}" class="card-img-top" alt="Album image">
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}


async function showAlbumList() {
    void await fetchAlbumList()
        .then(item => enrichAlbumList(item))
        .then(item => renderAlbumList(item));
}


button.addEventListener('click', showAlbumList);


function linkToAlbumElement () {
    galleryElements.addEventListener('click', e => {
        e.stopPropagation();

        const selectedGalleryElement = e.target.closest('[id]');
        const albumId = selectedGalleryElement.id;

        window.open('../html/photoAlbum.html?albumId=' + albumId,'_blank');
    });
}

linkToAlbumElement();