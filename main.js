const $ =  (str) =>{
    return document.querySelector(str)
}

// Cambio de cantidad de articulos ingresado por el usuario.

let minusBtn = $(".input__minus");
let plusBtn = $(".input__plus");
let userInput = $(".input__number");

let userInputNumber = 0;

plusBtn.addEventListener("click",()=> {
    userInputNumber++;
    userInput.value = userInputNumber
});

minusBtn.addEventListener("click", ()=> {
    if(userInputNumber <= 0 )return;
    userInputNumber--;
    userInput.value = userInputNumber
})

// Agregar el total de productos al carrito al presionar el boton ADD TO CART

const addToCartBtn = $(".details__button");
let cartNotification = $(".header__cart--notification");

let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener("click", ()=> {
    lastValue = lastValue + userInputNumber

    cartNotification.innerText = lastValue;
    cartNotification.style.display = "block";
    drawProductInModal()
})

// Mostrat el modal con el detalledel carrito

const cartIconBtn = $(".header__cart");
const cartModal = $(".cart-modal");
// let priceModal = $(".cart-modal__price");
const productContainer= $(".cart-modal__checkout-container");

cartIconBtn.addEventListener("click", ()=> {
    // cartModal.style.display = "block";
    cartModal.classList.toggle( "show" );

    if(lastValue === 0){
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        drawProductInModal()
    }

})

//Borrar el contenido del carrito. 

function deleteProduct () {
    const deleteProductBtn = $(".cart-modal__delete");
    
    deleteProductBtn.addEventListener("click", ()=> {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    })
}

// Cambiar imagenes cuando se presione los botones flecha.
const imageContainer = $(".gallery__image-container")
const previusGalleryBtn = $(".gallery__previus")
const nextGalleryBtn = $(".gallery__next")
let imgIndex = 1;

nextGalleryBtn.addEventListener("click",()=>{
    changeNextImage(imageContainer)
})

previusGalleryBtn.addEventListener("click",()=>{
    changePreviusImage(imageContainer)
})

// Mostrar modal si presiono la imagen principal (desktop)
const imagesModal = $(".modal-gallery__background");
const closeModalBtn = $(".modal-gallery__close")

imageContainer.addEventListener("click" , ()=> {
    if(window.innerWidth >= 1115){
        imagesModal.style.display = "grid";
    }
})
closeModalBtn.addEventListener("click",()=>{
    imagesModal.style.display = "none";
})

// Cambiar las imagenes principales desde los thumbnails
let thumbnails = document.querySelectorAll(".gallery__thumnail") 
thumbnails = [...thumbnails]

thumbnails.forEach((thumbnail)=>{
    thumbnail.addEventListener("click", (event)=> {
        console.log(event.target.id)
        imageContainer.style.backgroundImage = `url("../images/image-product-${event.target.id}.jpg")`

    })
})


//Cambiar las imagenes principales desde los thumbnails en el Modal
let modalThumbnails = document.querySelectorAll(".modal-gallery__thumnail");
const modalImageContainer = $(".modal-gallery__image-container")
modalThumbnails = [...modalThumbnails]

modalThumbnails.forEach((modalThumbnail)=>{
    modalThumbnail.addEventListener("click" , (event)=>{
        console.log(event.target.id.slice(-1))
        modalImageContainer.style.backgroundImage = `url("../images/image-product-${event.target.id.slice(-1)}.jpg")`
    })
})

// Cambiar imagen principal del modal desde flechas en el modal
const previusModalBtn = $(".modal-gallery__previus")
const nextModalBtn = $(".modal-gallery__next")
nextModalBtn.addEventListener("click",()=>{
    changeNextImage(modalImageContainer)
})

previusModalBtn.addEventListener("click",()=>{
    changePreviusImage(modalImageContainer)
})

// Mostrar el navbar cuando presiono el menu de hamburguesa

const hamburgerMenu = $(".header__menu");
const modalNavbar =$(".modal-navbar__background")
const closeModalNavbar = $(".modal-navbar__close-icon")

modalNavbar.style.display = "none"

hamburgerMenu.addEventListener("click",()=>{
    console.log("hola")
    modalNavbar.style.display = "block"
})

closeModalNavbar.addEventListener("click",()=>{
    modalNavbar.style.display = "none"
})


//Functions

function drawProductInModal () {
    productContainer.innerHTML= `
        <div class="cart-modal__details-container">
          <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnailcart">
          <div>
          <p class="cart-modal__product">Autumn Limited Edition...</p>
          <p class="cart-modal__price">$125 x3 <span>$375.00</span></p>
        </div>
          <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete element">
        </div>
        <button class="cart-modal__checkout-btn">Checkout</button>`
    deleteProduct()
    let priceModal = $(".cart-modal__price");
    priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>`;
}

function changeNextImage (imgContainer) {
    if(imgIndex === 4){
        imgIndex = 1;
    } else {
        imgIndex++;
    }
    imgContainer.style.backgroundImage = `url("../images/image-product-${imgIndex}.jpg")`
}

function changePreviusImage (imgContainer) {
    if(imgIndex === 1){
        imgIndex = 4;
    } else {
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url("../images/image-product-${imgIndex}.jpg")`
}