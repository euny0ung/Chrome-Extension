import { checkResultTable } from './parsing';

console.log('실행은 됩니다...');

const currentUrl = window.location.href;

let c = console.log.bind(document);

const getUserName = () => {
    const element = document.querySelector('a.username');
    if (isNull(element)) return null;

    const username = el?.innerText?.trim();
    if (isEmpty(username)) return null;
    return username;
};

const username = getUserName();

// 로그인 상태일 때
if (!isNull(username)) {
    // 현재 페이지가 코드 제출 결과 페이지이면 프로그램 실행
    if (['status', `user_id=${username}`, 'problem_id', 'from_mine=1'].every((key) => currentUrl.includes(key)))
        programStart();
}

const programStart = async () => {
    // 결과 리스트 파싱
    const table = checkResultTable();
    console.log('결과 데이터', table);

    // const bojData = await getAllData();
    // c(bojData);
};
