/* server.js */
const express = require("express");
const cors = require("cors");
const groupBuyRoutes = require("./routes/groupBuyRoutes");
const participationRoutes = require("./routes/participationRoutes");

const app = express();
const PORT = 4000;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true }));

// 라우트 연결
app.use("/api/group-buy", groupBuyRoutes);
app.use("/api/participation", participationRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});