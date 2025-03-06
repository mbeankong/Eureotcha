
const express = require("express");
const router = express.Router();
const {
    createParticipation,
    getParticipationsByGroupBuyId,
    cancelParticipation,
    get_join_data
} = require("../controllers/participationController");

// 공동구매 신청 (POST)
router.post("/", createParticipation);
router.post("/search", get_join_data);

// 공동구매 신청 취소 (PATCH)
router.patch("/cancel", cancelParticipation);

module.exports = router;
