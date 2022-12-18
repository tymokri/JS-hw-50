'use strict';

const API_URL = 'https://jsonplaceholder.typicode.com';
const photoAlbum = document.querySelector('.photo-album');


function extractAlbumIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('albumId');
}

async function fetchAlbum(albumId) {
    const response = await fetch(API_URL + '/photos?albumId=' + albumId);

    return await response.json();
}


async function renderAlbumPhotos(jsonAlbumPhotos) {
    jsonAlbumPhotos.forEach(albumPhotos => {
        photoAlbum.innerHTML += `
            <div class="column">
                <div class="card">
                    <div class="card-image">
                        <div class="image">
                            <img src="${albumPhotos.url}" class="card-img-top" alt="Album photo">
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}


async function showAlbumPhotos() {
    void await fetchAlbum(extractAlbumIdFromUrl())
        .then(item => renderAlbumPhotos(item));
}

void showAlbumPhotos();