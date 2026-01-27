// 파일업로드 버튼 클릭시 input에 파일업로더 클릭
const fileInputF = document.getElementById("input05");
const fileInputS = document.getElementById("input06");
const uploadBtnF = document.getElementById("upload_button01");
const uploadBtnS = document.getElementById("upload_button02");

uploadBtnF.addEventListener("click", (e) => {
    fileInputF.click();
});

uploadBtnS.addEventListener("click", (e) => {
    fileInputS.click();
});

// 이미지 미리보기
const previewF = document.getElementById("imagePreviewF");
const previewS = document.getElementById("imagePreviewS");

// 파일이 선택되었을 때 실행하는 이벤트
fileInputF.addEventListener("change", (e) => {
    previewF.innerHTML = ""; //이전에 선택했던 이미지 제거(중복 방지)

    // 들어간 파일들을 배열로 변환(forEach,map 등 배열 메소드를 사용하기 위함)
    const files = Array.from(fileInputF.files);

    // 선택된 파일들을 하나씩 순회
    files.forEach((file) => {
        // 이미지 파일이 아니면 미리보기 x
        if (!file.type.startsWith("image/")) return;

        // 파일을 읽기 위해 FileReader객체 생성
        const reader = new FileReader();

        // 파일 읽기가 완료되었을 때 실행되는 콜백
        reader.onload = (e) => {
            // 이미지 태그 생성
            const img = document.createElement("img");
            // 이미지 데이터를 src에 세팅
            img.src = e.target.result;
            // 이미지 스타일 설정
            img.style.width = "120px";
            img.style.height = "120px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            img.style.marginRight = "8px";

            // previewF 영역에 이미지를 추가
            previewF.appendChild(img);
        };
        // 파일을 읽고 완료되면 reader.onload 실행
        reader.readAsDataURL(file);
    });
});

fileInputS.addEventListener("change", (e) => {
    previewS.innerHTML = "";

    const files = Array.from(fileInputS.files);

    files.forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "120px";
            img.style.height = "120px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            img.style.marginRight = "8px";

            previewS.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

// input값 없을 시 blur이벤트로 div출현하게 하는 js
const errordiv = document.querySelectorAll(
    ".funding-regist-form-input-finalvalue",
);
const inputNone = document.querySelectorAll(".data-validata");

inputNone.forEach((input, i) => {
    inputNone[i].addEventListener("blur", (e) => {
        if (!inputNone[i].value) {
            errordiv[i].style.display = "block";
        } else {
            errordiv[i].style.display = "none";
        }

        if (
            input.name === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
        ) {
            emailForm.style.display = "block";
        } else {
            emailForm.style.display = "none";
        }
    });
});

const fileIndex = 2;

fileInputF.addEventListener("change", (e) => {
    if (fileInputF.files.length === 0) {
        errordiv[fileIndex].style.display = "block";
    } else {
        errordiv[fileIndex].style.display = "none";
    }
});

// form에서 button으로 submit을 보낼 때 유효성 검사

const form = document.getElementById("funding-regist-form");
const submitBtn = document.querySelector(".funding-regist-form-submit");
const emailForm = document.querySelector(".finalvalue-email");

console.log(submitBtn);

form.addEventListener("submit", (e) => {
    let isValid = true;
    // 텍스트 검사
    inputNone.forEach((input, i) => {
        if (
            input.name === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
        ) {
            emailForm.style.display = "block";
            isValid = false;
        } else {
            emailForm.style.display = "none";
            isValid = true;
        }
        if (!input.value.trim()) {
            errordiv[i].style.display = "block";
            isValid = false;
        }
    });
    // 파일 검사
    if (fileInputF.files.length === 0) {
        errordiv[fileIndex].style.display = "block";
        isValid = false;
    }
    if (!isValid) {
        e.preventDefault();
    }
});

// 드롭다운
document.querySelectorAll(".custom-select-container").forEach((container) => {
    const input = container.querySelector(".funding-regist-form-input");
    const dropdown = container.querySelector(".custom-dropdown");
    const items = dropdown.querySelectorAll(".dropdown-item");

    // Input 클릭 시 드롭다운 토글
    input.addEventListener("click", (e) => {
        e.stopPropagation();

        // 다른 드롭다운 모두 닫기
        document.querySelectorAll(".custom-dropdown").forEach((dd) => {
            if (dd !== dropdown) {
                dd.classList.remove("show");
            }
        });

        // 현재 드롭다운 토글
        dropdown.classList.toggle("show");
    });

    // 아이템 선택
    items.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();

            // 선택된 값을 input에 설정
            const value = item.textContent;
            const dataValue = item.dataset.value;

            input.value = value;
            input.setAttribute("data-value", dataValue); // 실제 값 저장

            // 드롭다운 닫기
            dropdown.classList.remove("show");

            // 선택 이벤트 발생 (필요시 사용)
            input.dispatchEvent(new Event("change"));
        });
    });
});

// 외부 클릭 시 모든 드롭다운 닫기
document.addEventListener("click", () => {
    document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("show");
    });
});
