function goBack() {
  window.history.back();
}
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const gongu_detail = document.getElementById('gongu_join_detail');
const payment_info = document.getElementById('payment-info');

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal-container');
  const join_button = document.getElementById('join_button');
  const cancelBtn = document.getElementById('cancel-btn');

  // 등록하기 버튼 클릭 시 모달창 열기
  join_button.addEventListener('click', function () {
    modal.style.display = 'flex';
  });

  // 취소 버튼 클릭 시 모달창 닫기
  cancelBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/group-buy/${id}`);
    const groupBuy = await response.json();
    const imageUrl = `http://localhost:4000${groupBuy.image_url}`;
    console.log(groupBuy);

    gongu_detail.innerHTML = `
    <div class="gongu_join_item">${groupBuy.product}</div>
        <div class="gongu_join_image">
          <img src="${imageUrl}" alt="" />
        </div>
        <div class="gongu_join_info">
          <div>내가 가질 개수 : ${
            groupBuy.total_amount / groupBuy.target_count
          }개</div>

          <div>1/${groupBuy.target_count} 명</div>

          <div>내가 지불할 금액 : ${groupBuy.price}원</div>
          <div>상품 URL : ${groupBuy.product_url}</div>
        </div>`;
        // 🔹 payment_info 요소를 다시 찾기
        const payment_info = document.getElementById('payment-info');
        if (payment_info) {
          payment_info.innerHTML = `<span id="final-amount">${groupBuy.price}</span>원을 결제하시겠습니까?`;
        } else {
          console.error("❌ payment-info 요소를 찾을 수 없습니다.");
        }
  } catch (error) {
    console.error('데이터를 불러오는 중 오류 발생 : ', error);
  }
});
