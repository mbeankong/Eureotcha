const express = require("express");
const {
    getAllGroupBuys,
    getGroupBuyById,
    getGroupBuyStatus,
    createGroupBuy
} = require("../controllers/groupBuyController");

const router = express.Router();

// 공동구매 전체 조회 (메인화면)
router.get("/", getAllGroupBuys);

// 공동구매 상태 조회 (신청 조회)
router.get("/status", getGroupBuyStatus);

// 특정 공동구매 상세 조회 (공구 참여)
router.get("/:id", getGroupBuyById);

// 공동구매 등록 (공구 생성)
router.post("/", createGroupBuy);

module.exports = router;