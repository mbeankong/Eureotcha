window.onload = function () {
    document.getElementById("cancelModal").style.display = "none";
    };

function openModal() {
let modal = document.getElementById("cancelModal");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
    }, 0);
}

function closeModal() {
    document.getElementById("cancelModal").style.display = "none";
}

function confirmCancel() {
    alert("취소가 완료되었습니다.");
    closeModal();
}

function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");

    searchButton.addEventListener("click", async function () {  
        const phoneInput = document.getElementById("phone");
        const passwordInput = document.getElementById("password");
        const phone = phoneInput.value;
        const password = passwordInput.value;

        try {
            // 🔹 백엔드 API 요청 (참여 내역 조회)
            const response = await fetch("http://localhost:4000/api/participation/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phone, password })
            });

            if (!response.ok) {
                alert("참여 내역을 찾을 수 없습니다.");
                return;
            }

            const participations = await response.json();
            console.log("✅ 참여 내역:", participations);

            const ordersContainer = document.getElementById("orders-container");
            ordersContainer.innerHTML = ""; // 기존 목록 초기화

            participations.forEach(participation => {
                const card = document.createElement("div");
                card.classList.add("order-card");

                card.innerHTML = `
                    <img src="http://localhost:4000${participation.image_url}" alt="상품 이미지" class="order-img">
                    <div class="order-details">
                        <h3>${participation.product}</h3>
                        <p>총 인원: ${participation.current_count} / ${participation.target_count}명</p>
                        <p>가격: ${participation.price.toLocaleString()}원</p>
                    </div>
                    <button class="cancel-btn" onclick="openModal()">취소하기</button>
                `;

                ordersContainer.appendChild(card);
            });

        } catch (error) {
            console.error("❌ 참여 내역 조회 중 오류 발생:", error);
            alert("참여 내역을 불러오는 중 오류가 발생했습니다.");
        }
    });
});
