const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/groupBuys.json");

const loadData = () => {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
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

module.exports = { getAllGroupBuys, getGroupBuyById, getGroupBuyStatus };