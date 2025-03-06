/* server.js */
const express = require("express");
const cors = require("cors");
const path = require('path');

const groupBuyRoutes = require("./routes/groupBuyRoutes");

const app = express();
const PORT = 4000;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true }));

// 라우트 연결
app.use("/api/group-buy", groupBuyRoutes);

// 📌 정적 파일 서빙 (uploads 폴더를 공개)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});