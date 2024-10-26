const btnCat = document.getElementById("btn-category")
const catOpen = document.querySelector(".category-open")

const contentAlt = document.querySelector(".content-alt")
const cardsAlt = document.querySelector(".cards-alt")
const contentSlide = document.querySelector(".content-slide")
const wrapper = document.querySelector(".wrapper")
const badge = document.querySelector(".badge")


// Local Storage ile kullanıcı kaydı
function first() {
    let kayitol = JSON.parse(localStorage.getItem("kayit"))
    if (!kayitol) {
        localStorage.setItem("kayit", "[]")
    }
}
first()

// SAYFA İLK AÇILDIĞINDA ÇALIŞAN FONKSİYON
function basketCreate() {
    const sepet = JSON.parse(localStorage.getItem("sepet"))
    if (!sepet) {
        localStorage.setItem("sepet", "[]")
    }
}
basketCreate()

// LOCAL STORAGE SEPET VERİLERİNİ KAYDETME
function sepeteEkle(id) {
    const card = document.getElementById(id)
    const resim = card.querySelector("img").src
    const bilgi = card.querySelector(".bilgi").textContent
    const fiyat = card.querySelector(".fiyat").textContent

    const item = {
        "id": id,
        "name": bilgi,
        "price": fiyat,
        "resim": resim,
        "adet": 1,
    }

    let items = JSON.parse(localStorage.getItem("sepet"))
    let choesenİtem = items.find(i => i.id == item.id)

    if (choesenİtem == undefined) {
        items.push(item)
    } else if (choesenİtem) {
        choesenİtem.adet += 1
        let guncel = choesenİtem.adet * Number(fiyat)
        choesenİtem.price = guncel
    }
    badge.textContent = items.length
    localStorage.setItem("sepet", JSON.stringify(items))
}

// ÜST CARD YAPISI FETCH İLE VERİ ÇEKME VE YAZDIRMA
fetch("card.json")
    .then(res => res.json())
    .then(veri => cardYazdir(veri))

function cardYazdir(veri) {
    let items = JSON.parse(localStorage.getItem("sepet"))
    for (let i of veri) {
        const cardsSlide = document.createElement("div")
        cardsSlide.classList.add("cards-slide", "cards", "d-flex", "position-relative", "py-1", "gap-3")
        cardsSlide.innerHTML =
            `
        <div class="card" id=${i.id}>
            <div class="position-relative rounded-4 overflow-hidden">
                <i class="fa-regular fa-heart position-absolute end-0 p-2 m-1 text-black bg-white rounded-5 like"></i>
                <img class="imic" src="./${i.image}">
            </div>
            <div class="d-flex align-items-center gap-2 mt-1">
                <span class="px-1">-%60</span>
                <i class="fa-solid fa-bolt cevir"></i>
                <div>
                    <i class="fa-solid fa-turkish-lira-sign"></i><span class="ms-1 fiyat">${i.price}</span>
                </div>
            </div>
            <p class="gizle bilgi">${i.info}</p>
            <div class="d-flex  card-alt gap-1">
                <div class="d-flex">
                    <div class="bg-ver">Satış</div>
                    <div class="bg-ver">
                        <i class="fa-solid fa-star"></i>4.5/2000+
                    </div>
                    <div class="bg-ver">
                        <i class="fa-solid fa-fire"></i>Çok satanlar
                    </div>
                </div>
                <button onclick=sepeteEkle(${i.id}) class="btn btn-danger basket-btn w-50 p-0">Sepete Ekle</button>
            </div>
        </div>
        `
        wrapper.append(cardsSlide)
        contentSlide.append(wrapper)

        badge.textContent = items.length
        localStorage.setItem("sepet", JSON.stringify(items))
        let card = wrapper.querySelector(".imic")
        card.addEventListener("click", function () {
            window.location.href = "item.html"
        })
    }
}

// EN ALTTAKİ CARD YAPISI FETCH İLE VERİ ÇEKME VE YAZDIRMA
fetch("items.json")
    .then(res => res.json())
    .then(data => ekranaYazdir(data))

function ekranaYazdir(data) {
    for (let i of data) {
        const div = document.createElement("div")
        div.classList.add("card", "py-1")

        div.innerHTML =
            `
        <div class="position-relative rounded-4 overflow-hidden">
            <i class="fa-regular fa-heart position-absolute end-0 p-2 m-1 text-black bg-white rounded-5 like"></i>
            <img src="./${i.image}">
        </div>
        <div class="d-flex align-items-center gap-2 mt-1">
            <span class="px-1">-%60</span>
            <i class="fa-solid fa-bolt cevir"></i>
            <div>
                <i class="fa-solid fa-turkish-lira-sign"></i><span class="ms-1">${i.price}</span>
            </div>
        </div>
        <p class="gizle">${i.info}</p>
        <div class="d-flex card-alt gap-1 align-items-center">
            <div class="bg-ver">Satış</div>
            <div class="bg-ver">
                <i class="fa-solid fa-star"></i>4.5/2000+
            </div>
            <div class="bg-ver">
                <i class="fa-solid fa-fire"></i>Çok satanlar
            </div>
        </div>
        `
        cardsAlt.append(div)
        contentAlt.append(cardsAlt)
    }
}

// AÇILIR KAPANIR KATALOG FONKSİYON
btnCat.addEventListener("click", () => {
    catOpen.classList.toggle("d-none")
})

// SEPETE YÖNLENDİRME İÇİN BİR FONKSİYON
function gönder() {
    window.location.href = "sepet.html"
}