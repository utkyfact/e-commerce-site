const kullaniciLog = document.getElementById("username-log")
const sifreLog = document.getElementById("pass-log")
const meyilLog = document.getElementById("mail-log")
const btnLog = document.getElementById("btn-log")

const kullaniciReg = document.getElementById("username-reg")
const sifreReg = document.getElementById("pass-reg")
const meyilReg = document.getElementById("mail-reg")
const btnReg = document.getElementById("btn-reg")

const wrapModal = document.querySelector(".wrapper-modal")

const formLog = document.querySelector(".form-login")
const formReg = document.querySelector(".form-register")
const title = document.getElementById("staticBackdropLabel")
const btnChange = document.querySelector(".btn-change")

// GİRİŞ KAYIT ARASI İNNER HTML DEĞİŞTİRMEK İÇİN BİR FONKSİYON
btnChange.addEventListener("click",()=>{
    formLog.classList.toggle("d-none")
    formReg.classList.toggle("d-none") 
    wrapModal.innerHTML = ""
})

// REGİSTER FONKSİYON
btnReg.addEventListener("click",register)
function kayit(){
    wrapModal.innerHTML = ""
    let kayitol = JSON.parse(localStorage.getItem("kayit"))
    if(userReg.value.trim() != "" && sifreReg.value.trim() != "" && meyilReg.value.trim() != ""){
        let kullanici = {
            ad:kullaniciReg.value,
            sifre:sifreReg.value,
            meyil:meyilReg.value
        }
        kayitol.push(kullanici)
        localStorage.setItem("kayit",JSON.stringify(kayitol))
        const p = document.createElement("p")
        p.textContent = "Başarı ile kayıt oldunuz."
        p.classList.add("text-success","p-2")
        wrapModal.append(p)
    }  
    kullaniciReg.value = ""
    sifreReg.value = ""
    meyilReg.value = ""
}

// LOGİN FONKSİYON
btnLog.addEventListener("click",login)
function giris(){
    wrapModal.innerHTML = ""
    let kayitol = JSON.parse(localStorage.getItem("kayit"))
    let eslesme = kayitol.filter(uye => uye.kullanici == kullaniciLog.value && uye.sifre == sifreLog.value && uye.meyil == meyilLog.value)
    if(eslesme.length != 0){
        const p = document.createElement("p")
        p.textContent = "Başarı ile giriş yaptın."
        p.classList.add("text-success","p-2")
        wrapModal.append(p)
    }else{
        const p = document.createElement("p")
        p.textContent = "Kayıt olmadan giriş yapılamaz."
        p.classList.add("text-danger","p-2")
        wrapModal.append(p)
    }
}