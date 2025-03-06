const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static("public"));  // 프론트엔드 연결

app.get("/api/message", (req, res) => {
  res.json({ message: "FE 서버 시작 !" });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});