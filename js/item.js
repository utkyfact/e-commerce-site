const bigImages = document.querySelector('.lg-img img');
const smallImages = document.querySelectorAll('.sm-img img');

const btnCat = document.getElementById("btn-category")
const catOpen = document.querySelector(".category-open")

// ÜRÜN DETAY ÜZERİNE GELİNEN RESMİ BÜYÜK RESİMDE GÖSTERME
smallImages.forEach((smallImg, index) => {
    smallImg.addEventListener('mouseover', function() {
        bigImages.src = smallImg.src
        
    });
});

// SEPETE YÖNLENDİRME İÇİN BİR FONKSİYON
function gönder() {
    window.location.href = "sepet.html"
}