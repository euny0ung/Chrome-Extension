// alert('실행은 됩니다...');

const currentUrl = window.location.href;

const isNull = (value) => {
    return value === null;
};

const isEmpty = (value) => {
    return value === null || value === undefined || value === '';
};

const convertDate = (input) => {
    const regex = /(\d{4})년 (\d{1,2})월 (\d{1,2})일 (\d{2}):(\d{2}):(\d{2})/;
    const match = input.match(regex);

    if (!match) {
        return 'Invalid date format';
    }

    // Date 객체생성
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    const hours = parseInt(match[4], 10);
    const minutes = parseInt(match[5], 10);
    const seconds = parseInt(match[6], 10);

    const date = new Date(year, month, day, hours, minutes, seconds);

    // ISO 8601로 변환
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

const programStart = async () => {
    // 결과 리스트 파싱
    const table = checkResultTable();
    let codeArr = [];

    for (const [index, ele] of table.entries()) {
        const submissionId = Number(ele.submissionId);
        const code = await getSubmitCode(submissionId);
        codeArr.push(code);
        table[index].code = code;
        delete table[index].username;
        table[index].submissionTime = convertDate(table[index].submissionTime);
    }

    chrome.runtime.sendMessage({ type: 'sendTable', tableData: table });

    // const bojData = await getAllData();
    // c(bojData);
};

const getUserName = () => {
    const element = document.querySelector('a.username');
    if (isNull(element)) return null;

    const username = element?.innerText?.trim();
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
