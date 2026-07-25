// ==========================
// Cafe Menu v1.0
// ==========================

// ==========================
// QR 주소에서 시작 언어 확인
// ?lang=cn → 중국어
// ?lang=jp → 일본어
// 그 외 주소 → 중국어
// ==========================

const urlParams = new URLSearchParams(window.location.search);
const requestedLanguage = urlParams.get("lang");

let currentLanguage =
    requestedLanguage === "jp" ? "jp" : "cn";

let currentCategory = "signature";
let changing = false;

// 버튼
const btnCN = document.getElementById("btnCN");
const btnJP = document.getElementById("btnJP");

const btnSignature = document.getElementById("btnSignature");
const btnEspresso = document.getElementById("btnEspresso");
const btnTea = document.getElementById("btnTea");
const btnBeverage = document.getElementById("btnBeverage");

const menuImage = document.getElementById("menuImage");

// 이미지 파일 관리
const MENU = {

    cn:{
        signature:"cn_signature.jpg",
        espresso:"cn_espresso.jpg",
        tea:"cn_tea.jpg",
        beverage:"cn_beverage.jpg"
    },

    jp:{
        signature:"jp_signature.jpg",
        espresso:"jp_espresso.jpg",
        tea:"jp_tea.jpg",
        beverage:"jp_beverage.jpg"
    }

};

// 미리 로딩
function preload(){

    Object.values(MENU).forEach(lang=>{

        Object.values(lang).forEach(file=>{

            const img = new Image();
            img.src = "images/" + file;

        });

    });

}

// 버튼 이미지 갱신
function refreshButtons(){

    btnCN.src =
        currentLanguage==="cn"
        ? "images/china_on.png"
        : "images/china.png";

    btnJP.src =
        currentLanguage==="jp"
        ? "images/japan_on.png"
        : "images/japan.png";

    btnSignature.src =
        currentCategory==="signature"
        ? "images/signature_on.png"
        : "images/signature.png";

    btnEspresso.src =
        currentCategory==="espresso"
        ? "images/espresso_on.png"
        : "images/espresso.png";

    btnTea.src =
        currentCategory==="tea"
        ? "images/tea_on.png"
        : "images/tea.png";

    btnBeverage.src =
        currentCategory==="beverage"
        ? "images/beverage_on.png"
        : "images/beverage.png";

}

// 메뉴 변경
function changeMenu(){

    if(changing) return;

    changing = true;

    refreshButtons();

    menuImage.classList.add("fade");

    setTimeout(()=>{

        menuImage.src =
            "images/" +
            MENU[currentLanguage][currentCategory];

        menuImage.onload = ()=>{

            menuImage.classList.remove("fade");

            changing = false;

        };

    },180);

}

// 언어 버튼
btnCN.onclick=()=>{

    if(currentLanguage==="cn") return;

    currentLanguage="cn";

    changeMenu();

}

btnJP.onclick=()=>{

    if(currentLanguage==="jp") return;

    currentLanguage="jp";

    changeMenu();

}

// 메뉴 버튼
btnSignature.onclick=()=>{

    if(currentCategory==="signature") return;

    currentCategory="signature";

    changeMenu();

}

btnEspresso.onclick=()=>{

    if(currentCategory==="espresso") return;

    currentCategory="espresso";

    changeMenu();

}

btnTea.onclick=()=>{

    if(currentCategory==="tea") return;

    currentCategory="tea";

    changeMenu();

}

btnBeverage.onclick=()=>{

    if(currentCategory==="beverage") return;

    currentCategory="beverage";

    changeMenu();

}

// 시작
preload();

refreshButtons();

changeMenu();