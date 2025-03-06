// const card = document.getElementById('card');
// card.addEventListener('click', () => {
//   window.location.href = 'http://localhost:5500/html/gongu_join.html';
// });

document.addEventListener("DOMContentLoaded", async () => {
    const cardContainer = document.querySelector("#card-container"); // 카드가 들어갈 부모 컨테이너
    // 요소가 존재하는지 확인 후 실행
    if (!cardContainer) {
        console.error("카드 컨테이너를 찾을 수 없습니다.");
    } else {
        cardContainer.innerHTML = ""; // 기존 카드 삭제
    }

    try {
        // 백엔드 API 요청
        const response = await fetch("http://localhost:4000/api/group-buy");
        const groupBuys = await response.json();

        groupBuys.forEach(groupBuy => {
            // 카드 동적 생성
            const card = document.createElement("div");
            card.classList.add("card");

            // ✅ 이미지 URL을 백엔드에서 제공하는 정적 경로로 변경
            const imageUrl = `http://localhost:4000${groupBuy.image_url}`;

            card.innerHTML = `
                <img src="${imageUrl}" class="goods" />
                <div class="post">
                    <div class="post_title">${groupBuy.product}</div>
                    <div class="post_">
                        <div>${groupBuy.price.toLocaleString()}원</div>
                        <div>${groupBuy.current_count}/${groupBuy.target_count} 명</div>
                    </div>
                </div>
            `;

            // 클릭 시 해당 공동구매 상세 페이지 이동
            card.addEventListener("click", () => {
                window.location.href = `gongu_join.html?id=${groupBuy.id}`;
            });

            // 부모 컨테이너에 추가
            cardContainer.appendChild(card);
        });

    } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
    }
});