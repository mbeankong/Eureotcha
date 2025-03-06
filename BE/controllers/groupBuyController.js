const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/groupBuys.json");

const loadData = () => {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

// JSON 데이터 저장
const saveData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// 공동구매 전체 조회
const getAllGroupBuys = (req, res) => {
    const groupBuys = loadData();
    res.json(groupBuys);
};

// 특정 공동구매 상세 조회
const getGroupBuyById = (req, res) => {
    const groupBuys = loadData();
    const groupBuy = groupBuys.find(gb => gb.id === parseInt(req.params.id));
    if (!groupBuy) {
        return res.status(404).json({ message: "공동구매 정보를 찾을 수 없습니다." });
    }
    res.json(groupBuy);
};

// 공동구매 상태 조회
const getGroupBuyStatus = (req, res) => {
    const groupBuys = loadData();
    const statusList = groupBuys.map(gb => ({
        id: gb.id,
        product: gb.product,
        status: gb.status
    }));
    res.json(statusList);
};

// 공동구매 생성 (POST 요청)
const createGroupBuy = (req, res) => {
    const { product, total_amount, image_url, target_count, price, product_url } = req.body;

    // 필수 입력값 검증
    if (!product || !image_url || !target_count || !price || !product_url) {
        return res.status(400).json({ message: "모든 필수 정보를 입력해주세요." });
    }

    const groupBuys = loadData();

    // 새로운 공동구매 객체 생성
    const newGroupBuy = {
        id: groupBuys.length ? Math.max(...groupBuys.map(gb => gb.id)) + 1 : 1, // 새로운 ID 자동 생성
        product,
        total_amount,
        image_url,
        current_count: 1, // 개설자는 자동 참여
        target_count,
        price,
        product_url,
        status: "open" // 모집 중 상태
    };

    // 데이터 저장
    groupBuys.push(newGroupBuy);
    saveData(groupBuys);

    res.status(201).json({ message: "공동구매가 성공적으로 등록되었습니다.", groupBuy: newGroupBuy });
};

module.exports = { getAllGroupBuys, getGroupBuyById, getGroupBuyStatus, createGroupBuy };