const fs = require("fs");
const path = require("path");

// 데이터 파일 경로 설정
const dataPath = path.join(__dirname, "../data/participations.json");

// 데이터 로드 함수
const loadData = () => {
    if (!fs.existsSync(dataPath)) {
        return [];
    }
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

// 데이터 저장 함수
const saveData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// 공동구매 신청 기능 (POST)
const createParticipation = (req, res) => {
    const { id, phone, address, password } = req.body;

    // 필수 입력값 검증
    if (!id || !phone || !address || !password) {
        return res.status(400).json({ message: "모든 필수 정보를 입력해주세요." });
    }

    const participations = loadData();

    // 새로운 신청자 객체 생성
    const newParticipation = {
        participate_id: participations.length ? Math.max(...participations.map(p => p.participate_id)) + 1 : 1, // 신청자 ID 자동 증가
        id, // 공동구매 ID
        phone,
        address,
        password,
        cancle: false // 기본값 false (소프트 딜리트 미적용 상태)
    };

    // 데이터 저장
    participations.push(newParticipation);
    saveData(participations);

    res.status(201).json({ message: "공동구매 신청이 완료되었습니다.", participation: newParticipation });
};

// 공동구매 신청 취소 기능 (PATCH)
const cancelParticipation = (req, res) => {
    const { participate_id } = req.body;
    const participations = loadData();

    // 신청자 찾기
    const participation = participations.find(p => p.participate_id === participate_id);

    if (!participation) {
        return res.status(404).json({ message: "해당 신청자를 찾을 수 없습니다." });
    }

    // 소프트 딜리트 처리
    participation.cancle = true;
    saveData(participations);

    res.json({ message: "공동구매 신청이 취소되었습니다.", participation });
};

module.exports = { createParticipation, cancelParticipation };
