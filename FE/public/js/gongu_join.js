function goBack() {
  window.history.back();
}
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const gongu_detail = document.getElementById('gongu_join_detail');

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
  } catch (error) {
    console.error('데이터를 불러오는 중 오류 발생 : ', error);
  }
});
