const userLog = document.getElementById("username-log")
const passLog = document.getElementById("pass-log")
const mailLog = document.getElementById("mail-log")
const btnLog = document.getElementById("btn-log")

const userReg = document.getElementById("username-reg")
const passReg = document.getElementById("pass-reg")
const mailReg = document.getElementById("mail-reg")
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
function register(){
    wrapModal.innerHTML = ""
    let kayitol = JSON.parse(localStorage.getItem("kayit"))
    if(userReg.value.trim() != "" && passReg.value.trim() != "" && mailReg.value.trim() != ""){
        let kullanici = {
            user:userReg.value,
            pass:passReg.value,
            mail:mailReg.value
        }
        kayitol.push(kullanici)
        localStorage.setItem("kayit",JSON.stringify(kayitol))
        const p = document.createElement("p")
        p.textContent = "Başarı ile kayıt oldunuz."
        p.classList.add("text-success","p-2")
        wrapModal.append(p)
    }  
    userReg.value = ""
    passReg.value = ""
    mailReg.value = ""
}

// LOGİN FONKSİYON
btnLog.addEventListener("click",login)
function login(){
    wrapModal.innerHTML = ""
    let kayitol = JSON.parse(localStorage.getItem("kayit"))
    let eslesme = kayitol.filter(uye => uye.user == userLog.value && uye.pass == passLog.value && uye.mail == mailLog.value)
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