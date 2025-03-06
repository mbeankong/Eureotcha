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

const group_data_path = path.join(__dirname, "../data/groupBuys.json");
const participation_data_path = path.join(__dirname, "../data/participations.json");

// 🔹 JSON 파일 읽기 함수
const load_json_data = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const raw_data = fs.readFileSync(filePath, "utf8");
        return raw_data ? JSON.parse(raw_data) : [];
    } catch (error) {
        console.error(`❌ JSON 데이터 로드 중 오류 발생: ${filePath}`, error);
        return [];
    }
};

// ✅ 공동구매 참여 데이터 조회 (POST /api/group-buy)
const get_join_data = (req, res) => {
    const { phone, password } = req.body; // 클라이언트가 보낸 phone, password

    const participationData = load_json_data(participation_data_path);
    const productData = load_json_data(group_data_path);

    console.log(participationData);
    console.log(productData);

    // 특정 참여자를 찾고 그에 맞는 제품 정보를 가져오는 함수
    function matchParticipationWithProducts(phone, password) {
        // phone과 password가 일치하는 모든 참여자 찾기
        const authorizedParticipants = participationData.filter(participant => 
            participant.phone === phone && String(participant.password) === String(password)
        );

        if (authorizedParticipants.length === 0) {
            console.log("일치하는 참여자를 찾을 수 없습니다.");
            return null;
        }

        // 참여자의 id 목록 가져오기
        const ids = [...new Set(authorizedParticipants.map(participant => participant.id))]; // 중복 제거
        console.log("참여자의 ID 목록: ", ids);

        // 각 ID에 대한 유효한 참여자 필터링 (cancel이 false인 경우)
        const validParticipantsMap = {};
        ids.forEach(id => {
            validParticipantsMap[id] = participationData.filter(participant => participant.id === id && !participant.cancel).length;
        });

        console.log("validParticipantsMap: ", validParticipantsMap);

        // 해당 id를 가진 모든 제품 찾기
        let matchedProducts = productData.filter(product => ids.includes(product.id));

        if (matchedProducts.length === 0) {
            console.log("해당 ID의 제품을 찾을 수 없습니다.");
            return null;
        }

        // 각 product에 current_count 업데이트
        matchedProducts = matchedProducts.map(product => ({
            ...product,
        }));

        return matchedProducts;
    }

    // phone과 password를 기반으로 제품과 참여자 정보 매칭
    const updatedProducts = matchParticipationWithProducts(phone, password);
    console.log('updatedProducts: ', updatedProducts);

    // 응답 반환
    if (updatedProducts && updatedProducts.length > 0) {
        res.json(updatedProducts); // 여러 개의 제품을 배열로 반환
    } else {
        res.status(404).json({ message: "일치하는 데이터를 찾을 수 없습니다." });
    }
};

module.exports = { createParticipation, cancelParticipation, get_join_data };
