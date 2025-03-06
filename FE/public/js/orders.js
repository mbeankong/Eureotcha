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