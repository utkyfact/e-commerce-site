const basket = document.querySelector(".basket");
const arkaPlan = document.querySelector(".arka-plan");
const badge = document.querySelector(".badge");

const totalPay = document.querySelector('.total-pay');

const discount = document.getElementById("discount");
const discountInp = document.getElementById("discount-inp");
const pieceInfo = document.getElementById("piece-info");


// LOCAL STORAGE ÇEKİLEN SEPET VERİLERİNİ SEPET SAYFASINA YAZDIRMA FONKSİYONU
function ekranaYazdir(){
    let items = JSON.parse(localStorage.getItem("sepet"))
    for(let i of items){
        const div = document.createElement("div")
        div.classList.add("d-flex","p-3","bg-white","rounded-3","mt-2")
        div.setAttribute("id",`${i.id}`)
        div.innerHTML = 
        `
        <div class="d-flex gap-2">
            <div class="position-relative">
                <input class="position-absolute top-0 checkbox-item" type="checkbox">
                <div class="sepet-logo ms-3">
                    <img src="${i.resim}">
                </div>
            </div>

            <div>
            <p class="hide-p">${i.name}</p>
            <div class="text-secondary">Teslimat: 19-42 gün</div>
                <div class="d-flex align-items-center gap-2">
                    <button class="subtract-btn border border-0 rounded-3 px-2">-</button>
                    <span id="piece-info" class="adet">${i.adet}</span>
                    <button class="add-btn border border-0 rounded-3">+</button>
                    <button id="${i.id}" class="remove-btn border border-0 rounded-3"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div>
                <span class="text-secondary text-decoration-line-through">₺${i.price * 2}</span>
                <span>₺<span class="fiyat">${i.price}</span></span>
            </div>
        </div>
    `
    basket.append(div)
    }
    badge.textContent = items.length
    
    // SEPET BOŞ OLDUĞUNDA GÖRÜNECEK OLAN KISIM
    backgroundUpdate()

    const butonlarSil = basket.querySelectorAll(".remove-btn")
    const butonlarArttir = basket.querySelectorAll(".add-btn")
    const butonlarAzalt = basket.querySelectorAll(".subtract-btn")
    
    butonlarArttir.forEach(btn => {
        btn.addEventListener("click",function(){
            arttir(this,this.parentElement.children[0])
            totalCost()
        })
    })

    butonlarAzalt.forEach(btn => {
        items.forEach(item => {
            if(item.adet === 1) {
                btn.disabled = true
            }
        });
        btn.addEventListener("click",function(){
            azalt(this)
            totalCost()
        })
    })

    butonlarSil.forEach(btn => {
        btn.addEventListener("click",function(){
            sil(this)
            totalCost()
            backgroundUpdate()
        })
    })
    localStorage.setItem("sepet",JSON.stringify(items))

    setupCheckboxes();

    // Seçili ürünleri silme fonksiyonu
    function deleteSelectedItems() {
        const checkboxes = document.querySelectorAll('.checkbox-item');
        const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

        const choesenItems = document.querySelector('.choesen-items');

        if (selectedCount === 0) {
            alert('Lütfen silmek istediğiniz ürünleri seçin');
            return;
        }

        if (confirm(`${selectedCount} adet ürünü silmek istediğinize emin misiniz?`)) {
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const productDiv = checkbox.closest(`div[id]`);
                    if (productDiv) {
                        const productId = productDiv.id;
                        // Local storage'dan ürünü sil
                        items = items.filter(item => item.id != productId);
                        // DOM'dan ürünü sil
                        productDiv.remove();
                    }
                }
            });

            // Local storage'ı güncelle
            localStorage.setItem("sepet", JSON.stringify(items));
            
            // Sepet badge'ini güncelle
            badge.textContent = items.length;

            // Ana checkbox'ın işaretini kaldır
            const selectAllCheckbox = document.querySelector('#selectAllCheckbox');
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = false;
            }

            choesenItems.textContent = 'Ürün seçilmedi';

            // Sepet boşsa ekranı güncelle
            backgroundUpdate();

            // Toplam tutarı güncelle
            totalCost();
        }
        totalCost();
        backgroundUpdate()
    }

    // Checkbox'ları ayarla
    setupCheckboxes();

    // Seçili ürünleri silme butonuna event listener ekle
    const choesenDelete = document.getElementById('choesen-delete');
    if (choesenDelete) {
        // Önceki event listener'ları temizle
        choesenDelete.replaceWith(choesenDelete.cloneNode(true));
        const newChoesenDelete = document.getElementById('choesen-delete');
        newChoesenDelete.addEventListener('click', deleteSelectedItems);
    }
    
    localStorage.setItem("sepet",JSON.stringify(items))
}

// Checkbox işlemleri
function setupCheckboxes() {
    const selectAllCheckbox = document.querySelector('#selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.checkbox-item');

    // Seçili ürün sayısını güncelleme fonksiyonu
    function updateSelectedCount() {
        const choesenItems = document.querySelector('.choesen-items'); // Fetch within function
        const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        if (choesenItems) {
            choesenItems.textContent = selectedCount > 0 ? `${selectedCount} ürün seçildi` : 'Ürün seçilmedi';
        }
    }
    updateSelectedCount();

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("click", function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            updateSelectedCount();
        });
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);
                selectAllCheckbox.checked = allChecked;
                updateSelectedCount();
            });
        });
    }
}
ekranaYazdir();

// SEPET ÜRÜNLERİNİ ARTTIRMA
function arttir(btn,btn2){
    let items = JSON.parse(localStorage.getItem("sepet"))

    let fiyat = btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent
    let adet = btn.parentElement.children[1].textContent
    let birimFiyat = fiyat / adet
    let secilenUrun = items.find(item => item.price == fiyat)
    adet++
    if(adet != 1){
        btn2.disabled = false
    }
    secilenUrun.price = adet * birimFiyat
    secilenUrun.adet = adet
    fiyat = secilenUrun.price
    adet = secilenUrun.adet
    let promosyonsuz = fiyat * 2

    btn.parentElement.parentElement.parentElement.children[2].children[0].textContent = promosyonsuz
    btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent = fiyat
    btn.parentElement.children[1].textContent = adet
    localStorage.setItem("sepet",JSON.stringify(items))
}

// SEPET ÜRÜNLERİNİ AZALTMA
function azalt(btn){

    let items = JSON.parse(localStorage.getItem("sepet"))
    let fiyat = btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent
    let adet = btn.parentElement.children[1].textContent
    
    let birimFiyat = fiyat / adet
    let secilenUrun = items.find(item => item.price == fiyat)

    adet--
    if(adet == 1){
        btn.disabled = true
    }
    
    secilenUrun.price = adet * birimFiyat
    secilenUrun.adet = adet
    
    fiyat = secilenUrun.price
    adet = secilenUrun.adet
    
    let promosyonsuz = fiyat * 2
    btn.parentElement.parentElement.parentElement.children[2].children[0].textContent = promosyonsuz
    btn.parentElement.parentElement.parentElement.children[2].children[1].children[0].textContent = fiyat
    btn.parentElement.children[1].textContent = adet
    localStorage.setItem("sepet",JSON.stringify(items))
}

// SEPET ÜRÜNLERİNİ SİLME
function sil(btn){
    let remove = btn.parentElement.parentElement.parentElement.parentElement
    let items = JSON.parse(localStorage.getItem("sepet"))
    let updateİtems = items.filter((item)=> (item.id != remove.id))
    
    backgroundUpdate()
    remove.remove()
    badge.textContent -= 1
    localStorage.setItem("sepet",JSON.stringify(updateİtems)) 
}

// Boş sepetten anasayfaya göndermek için bir fonksiyon
function gönder() {
    window.location.href = "index.html"
}

// Sepet boşsa ekranı güncelle
function backgroundUpdate() {
    let items = JSON.parse(localStorage.getItem("sepet"))
    if (items.length === 0) {
        arkaPlan.innerHTML = `
        <div class="ana">
            <a class="anasayfa" href="./index.html">Ana sayfa</a>
            <div class="d-flex flex-column align-items-center justify-content-center">
                <div class="empty-basket text-center">
                    <img src="./img/sepet.png">
                </div>
                <div class="d-flex flex-column align-items-center gap-3 mb-3">
                    <h4>Sepetin boş</h3>
                    <button onclick="gönder()" class="btn btn-danger p-2 px-3">Ürünleri gör</button>
                </div>
            </div>
        </div>
        `;
    }
}

// Toplam Sepet Tutarı
function totalCost(){
    let items = JSON.parse(localStorage.getItem("sepet"))
    let toplamFiyat = items.reduce((acc, i) => acc + parseInt(i.price) , 0)
    totalPay.textContent = toplamFiyat
    discount.addEventListener("click", function() {
        if (discountInp.value.trim() !== "" && /^\d+$/.test(discountInp.value)) {
            let discountPercentage = discountInp.value / 100;
            let YeniToplamFiyat = toplamFiyat * (1 - discountPercentage);
            totalPay.textContent = YeniToplamFiyat
        } else {
            console.log("Lütfen yalnızca rakam giriniz.");
        }
    });
    localStorage.setItem("sepet",JSON.stringify(items))
}
totalCost()
