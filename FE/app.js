const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));  // 프론트엔드 연결

app.get("/api/message", (req, res) => {
  res.json({ message: "FE 서버 시작 !" });
});

// HTML 서빙
app.get("/orders", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "orders.html"));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

