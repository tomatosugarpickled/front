// 파일업로드 버튼 클릭시 input에 파일업로더 클릭
const fileInputF = document.getElementById("input08");
const fileInputS = document.getElementById("input09");
const uploadBtnF = document.getElementById("upload_button01");
const uploadBtnS = document.getElementById("upload_button02");

if (uploadBtnF && fileInputF) {
    uploadBtnF.addEventListener("click", function () {
        fileInputF.click();
    });
}

if (uploadBtnS && fileInputS) {
    uploadBtnS.addEventListener("click", function () {
        fileInputS.click();
    });
}

// 이미지 미리보기
const previewF = document.getElementById("imagePreviewF");
const previewS = document.getElementById("imagePreviewS");

// 파일이 선택되었을 때 실행하는 이벤트
if (fileInputF && previewF) {
    fileInputF.addEventListener("change", function (e) {
        previewF.innerHTML = "";
        const files = Array.from(fileInputF.files);
        files.forEach(function (file) {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.width = "120px";
                img.style.height = "120px";
                img.style.objectFit = "cover";
                img.style.borderRadius = "8px";
                img.style.marginRight = "8px";
                previewF.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });
}

if (fileInputS && previewS) {
    fileInputS.addEventListener("change", function (e) {
        previewS.innerHTML = "";
        const files = Array.from(fileInputS.files);
        files.forEach(function (file) {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = function (e) {
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
}

// input값 없을 시 blur이벤트로 div출현하게 하는 js
const errordiv = document.querySelectorAll(
    ".funding-regist-form-input-finalvalue",
);
const inputNone = document.querySelectorAll(".data-validata");
const emailForm = document.querySelector(".finalvalue-email");

inputNone.forEach(function (input, i) {
    input.addEventListener("blur", function () {
        if (errordiv[i]) {
            if (!input.value) {
                errordiv[i].style.display = "block";
            } else {
                errordiv[i].style.display = "none";
            }
        }
        if (input.name === "email" && emailForm) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                emailForm.style.display = "block";
            } else {
                emailForm.style.display = "none";
            }
        }
    });
});

const fileIndex = 5;

if (fileInputF) {
    fileInputF.addEventListener("change", function () {
        if (errordiv[fileIndex]) {
            if (fileInputF.files.length === 0) {
                errordiv[fileIndex].style.display = "block";
            } else {
                errordiv[fileIndex].style.display = "none";
            }
        }
    });
}

// form에서 button으로 submit을 보낼 때 유효성 검사
const form = document.getElementById("funding-regist-form");

if (form) {
    form.addEventListener("submit", function (e) {
        let isValid = true;
        inputNone.forEach(function (input, i) {
            if (input.name === "email" && emailForm) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                    emailForm.style.display = "block";
                    isValid = false;
                } else {
                    emailForm.style.display = "none";
                }
            }
            if (!input.value.trim() && errordiv[i]) {
                errordiv[i].style.display = "block";
                isValid = false;
            }
        });
        if (
            fileInputF &&
            fileInputF.files.length === 0 &&
            errordiv[fileIndex]
        ) {
            errordiv[fileIndex].style.display = "block";
            isValid = false;
        }
        if (!isValid) {
            e.preventDefault();
        }
    });
}

// 드롭다운
const containers = document.querySelectorAll(".custom-select-container");

containers.forEach(function (container) {
    const input = container.querySelector(".funding-regist-form-input");
    const dropdown = container.querySelector(".custom-dropdown");

    if (!input || !dropdown) return;

    const items = dropdown.querySelectorAll(".dropdown-item");

    // Input 클릭 시 드롭다운 토글
    input.addEventListener("click", function () {
        document.querySelectorAll(".custom-dropdown").forEach(function (dd) {
            if (dd !== dropdown) {
                dd.classList.remove("show");
            }
        });
        dropdown.classList.toggle("show");
    });

    // 아이템 선택
    items.forEach(function (item) {
        item.addEventListener("click", function () {
            input.value = item.textContent;
            input.setAttribute("data-value", item.dataset.value);
            dropdown.classList.remove("show");
            input.dispatchEvent(new Event("change"));
        });
    });
});

// 외부 클릭 시 모든 드롭다운 닫기
document.addEventListener("click", function (e) {
    const clickedContainer = e.target.closest(".custom-select-container");
    if (!clickedContainer) {
        document
            .querySelectorAll(".custom-dropdown")
            .forEach(function (dropdown) {
                dropdown.classList.remove("show");
            });
    }
});
