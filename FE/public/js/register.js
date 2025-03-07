function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const previewImage = document.querySelector(".upload-icon"); // 기존 업로드 아이콘 이미지
    const modal = document.getElementById("modal-container");
    const registerBtn = document.querySelector(".register-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const confirmBtn = document.getElementById("confirm-btn");
    const successModal = document.getElementById("success-modal"); // ✅ 등록 완료 모달창
    const successConfirmBtn = document.getElementById("confirm-btn"); // ✅ 확인 버튼


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
    // 동적으로 총액 계산하는 이벤트 추가
    document.getElementById("total-price").addEventListener("input", calculatePrice);
    document.getElementById("num-people").addEventListener("input", calculatePrice);
    
    // 등록하기 버튼 클릭 시 데이터 전송
    registerBtn.addEventListener("click", async function () {
        const product = document.getElementById("item-name").value;
        const totalAmount = parseInt(document.getElementById("total-quantity").value);
        const targetCount = parseInt(document.getElementById("num-people").value);
        const productUrl = document.getElementById("product-link").value;
        const wholePrice = parseInt(document.getElementById("total-price").value);
        const pricePerson = wholePrice / targetCount ;

        const newGroupBuy = {
            product: product,
            total_amount: totalAmount,
            image_url: "/uploads/haribo.jpeg", // 기본 이미지
            current_count: 1, // 개설자는 자동 참여
            target_count: targetCount,
            price: pricePerson,
            product_url: productUrl,
            status: "open"
        };

        try {
            const response = await fetch("http://localhost:4000/api/group-buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGroupBuy)
            });

            // if (response.ok) {
            //     alert("공동구매가 성공적으로 등록되었습니다.");
            //     window.location.href = "../html/main.html"; // ✅ 0.3초 후 main.html 이동
            // } else {
            //     alert("등록에 실패했습니다.");
            // }
        } catch (error) {
            console.error("등록 중 오류 발생:", error);
        }
    });

    // 등록하기 버튼 클릭 시 모달창 열기
    registerBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // ✅ 결제하기 버튼 클릭 시 공동구매 참여 정보 등록
    confirmBtn.addEventListener("click", async function () {
        const id = 4;  // 📌 공동구매 ID (현재는 임시값, 백엔드에서 받아야 함)
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const password = document.getElementById("password").value;

        // if (!phone || !address || !password) {
        //     alert("모든 정보를 입력해주세요.");
        //     return;
        // }

        const participationData = {
            id,
            phone,
            address,
            password
        };

        try {
            const response = await fetch("http://localhost:4000/api/participation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(participationData),
            });

            if (response.ok) {
                alert("공동구매 신청이 완료되었습니다.");
                modal.style.display = "none"; // 모달 닫기
                window.location.href = "http://localhost:5500/";
                function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const previewImage = document.querySelector(".upload-icon"); // 기존 업로드 아이콘 이미지
    const modal = document.getElementById("modal-container");
    const registerBtn = document.querySelector(".register-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const confirmBtn = document.getElementById("confirm-btn");
    const successModal = document.getElementById("success-modal"); // ✅ 등록 완료 모달창
    const successConfirmBtn = document.getElementById("success-confirm-btn"); // ✅ 확인 버튼


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
    // 동적으로 총액 계산하는 이벤트 추가
    document.getElementById("total-price").addEventListener("input", calculatePrice);
    document.getElementById("num-people").addEventListener("input", calculatePrice);
    
    // 등록하기 버튼 클릭 시 데이터 전송
    registerBtn.addEventListener("click", async function () {
        const product = document.getElementById("item-name").value;
        const totalAmount = parseInt(document.getElementById("total-quantity").value);
        const targetCount = parseInt(document.getElementById("num-people").value);
        const productUrl = document.getElementById("product-link").value;
        const wholePrice = parseInt(document.getElementById("total-price").value);
        const pricePerson = wholePrice / targetCount ;

        const newGroupBuy = {
            product: product,
            total_amount: totalAmount,
            image_url: "/uploads/haribo.jpeg", // 기본 이미지
            current_count: 1, // 개설자는 자동 참여
            target_count: targetCount,
            price: pricePerson,
            product_url: productUrl,
            status: "open"
        };

        try {
            const response = await fetch("http://localhost:4000/api/group-buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGroupBuy)
            });

        //     if (response.ok) {
        //         alert("공동구매가 성공적으로 등록되었습니다.");
        //     } else {
        //         alert("등록에 실패했습니다.");
        //     }
        } catch (error) {
            console.error("등록 중 오류 발생:", error);
        }
    });

    // 등록하기 버튼 클릭 시 모달창 열기
    registerBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // ✅ 결제하기 버튼 클릭 시 공동구매 참여 정보 등록
    confirmBtn.addEventListener("click", async function () {
        const id = 4;  // 📌 공동구매 ID (현재는 임시값, 백엔드에서 받아야 함)
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const password = document.getElementById("password").value;

        if (!phone || !address || !password) {
            alert("모든 정보를 입력해주세요.");
            return;
        }

        const participationData = {
            id,
            phone,
            address,
            password
        };

        try {
            const response = await fetch("http://localhost:4000/api/participation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(participationData),
            });

            if (response.ok) {
                alert("공동구매 신청이 완료되었습니다.");
                modal.style.display = "none"; // 모달 닫기
                window.location.href = "http://localhost:5500/"; // ✅ main.html 페이지로 이동
            } else {
                alert("공동구매 신청에 실패했습니다.");
            }
        } catch (error) {
            console.error("공동구매 신청 중 오류 발생:", error);
        }
        window.location.href = "http://localhost:5500/"; // ✅ main.html 페이지로 이동
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

            } else {
                alert("공동구매 신청에 실패했습니다.");
            }
        } catch (error) {
            console.error("공동구매 신청 중 오류 발생:", error);
        }
    });

    // ✅ 확인 버튼 클릭 시 main.html로 이동
    successConfirmBtn.addEventListener("click", function () {
       
        window.location.href = "http://localhost:5500/";
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
