// ==========================
// Cafe Menu v1.0
// ==========================

// ==========================
// QR 주소에서 시작 언어 확인
// ?lang=cn → 중국어
// ?lang=jp → 일본어
// ?lang=en → 영어
// 그 외 주소 → 중국어
// ==========================

const urlParams = new URLSearchParams(window.location.search);
const requestedLanguage = urlParams.get("lang");

let currentLanguage =
    requestedLanguage === "jp" ? "jp" :
    requestedLanguage === "en" ? "en" : "cn";

let currentCategory = "signature";
let lastLoadedCategory = "signature";
let changing = false;

// 버튼
const btnJP = document.getElementById("btnJP");
const btnCN = document.getElementById("btnCN");
const btnEN = document.getElementById("btnEN");

const btnSignature = document.getElementById("btnSignature");
const btnEspresso = document.getElementById("btnEspresso");
const btnColdBrew = document.getElementById("btnColdBrew");
const btnBeverage = document.getElementById("btnBeverage");

const menuImage = document.getElementById("menuImage");

// 이미지 파일 관리
const MENU = {

    cn:{
        signature:"cn_signature.png",
        espresso:"cn_espresso.png",
        coldbrew:"cn_coldbrew.png",
        beverage:"cn_beverage.png"
    },

    jp:{
        signature:"jp_signature.png",
        espresso:"jp_espresso.png",
        coldbrew:"jp_coldbrew.png",
        beverage:"jp_beverage.png"
    },

    en:{
        signature:"en_signature.png",
        espresso:"en_espresso.png",
        coldbrew:"en_coldbrew.png",
        beverage:"en_beverage.png"
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

    btnJP.src =
        currentLanguage==="jp"
        ? "images/japan_on.png"
        : "images/japan.png";

    btnCN.src =
        currentLanguage==="cn"
        ? "images/china_on.png"
        : "images/china.png";

    btnEN.src =
        currentLanguage==="en"
        ? "images/english_on.png"
        : "images/english.png";

    btnSignature.src =
        currentCategory==="signature"
        ? "images/signature_on.png"
        : "images/signature.png";

    btnEspresso.src =
        currentCategory==="espresso"
        ? "images/espresso_on.png"
        : "images/espresso.png";

    btnColdBrew.src =
        currentCategory==="coldbrew"
        ? "images/coldbrew_on.png"
        : "images/coldbrew.png";

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

        menuImage.onload = ()=>{

            menuImage.classList.remove("fade");

            lastLoadedCategory = currentCategory;
            changing = false;

        };

        menuImage.onerror = ()=>{

            // Cold Brew images must be added before this category can be displayed.
            menuImage.onerror = null;
            currentCategory = lastLoadedCategory;
            refreshButtons();
            menuImage.src = "images/" + MENU[currentLanguage][lastLoadedCategory];
            menuImage.classList.remove("fade");
            changing = false;
            alert("콜드브루 메뉴 이미지가 아직 등록되지 않았습니다.");

        };

        menuImage.src =
            "images/" +
            MENU[currentLanguage][currentCategory];

    },180);

}

// 언어 버튼
btnCN.onclick=()=>{

    if(changing || currentLanguage==="cn") return;

    currentLanguage="cn";

    changeMenu();

}

btnJP.onclick=()=>{

    if(changing || currentLanguage==="jp") return;

    currentLanguage="jp";

    changeMenu();

}

btnEN.onclick=()=>{

    if(changing || currentLanguage==="en") return;

    currentLanguage="en";

    changeMenu();

}

// 메뉴 버튼
btnSignature.onclick=()=>{

    if(changing || currentCategory==="signature") return;

    currentCategory="signature";

    changeMenu();

}

btnEspresso.onclick=()=>{

    if(changing || currentCategory==="espresso") return;

    currentCategory="espresso";

    changeMenu();

}

btnColdBrew.onclick=()=>{

    if(changing || currentCategory==="coldbrew") return;

    currentCategory="coldbrew";

    changeMenu();

}

btnBeverage.onclick=()=>{

    if(changing || currentCategory==="beverage") return;

    currentCategory="beverage";

    changeMenu();

}

// 시작
preload();

refreshButtons();

changeMenu();