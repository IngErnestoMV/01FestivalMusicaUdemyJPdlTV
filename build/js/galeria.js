document.addEventListener('DOMContentLoaded', function(){
    iniciarGaleria();
});

function iniciarGaleria(){
    crearGaleria();
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    galeria.textContent = 'Vamos a Crear la galería';
}