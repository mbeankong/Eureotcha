function goBack() {
  window.history.back();
}

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
