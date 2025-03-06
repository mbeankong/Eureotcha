function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const previewImage = document.querySelector(".upload-icon"); // 기존 업로드 아이콘 이미지
    const modal = document.getElementById("modal-container");
    const registerBtn = document.querySelector(".register-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    // 파일 업로드 시 미리보기 이미지 변경
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result; // 업로드된 이미지로 변경
            };
            reader.readAsDataURL(file);
        }
    });

    // 등록하기 버튼 클릭 시 모달창 열기
    registerBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // 취소 버튼 클릭 시 모달창 닫기
    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
});

function calculatePrice() {
    const totalAmount = parseFloat(document.getElementById("total-price").value) || 0;
    const numPeople = parseInt(document.getElementById("num-people").value) || 1;
    
    document.getElementById("people-count").innerText = numPeople;
    document.getElementById("total-amount").innerText = totalAmount.toLocaleString();
    document.getElementById("individual-amount").innerText = (totalAmount / numPeople).toLocaleString();
    document.getElementById("final-amount").innerText = (totalAmount / numPeople).toLocaleString();
}
