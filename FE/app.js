const express = require('express');
const path = require('path');

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.static('public')); // 프론트엔드 연결

// 📌 정적 파일 제공 (public 폴더 사용)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'html')));

app.get('/api/message', (req, res) => {
  res.json({ message: 'FE 서버 시작 !' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public' ,'html', 'main.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
