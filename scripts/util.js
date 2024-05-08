const convertResultTableHeader = (header) => {
    switch (header) {
        case '문제번호':
        case '문제':
            return 'problemId';
        case '난이도':
            return 'level';
        case '결과':
            return 'result';
        case '문제내용':
            return 'problemDescription';
        case '언어':
            return 'language';
        case '제출 번호':
            return 'submissionId';
        case '아이디':
            return 'username';
        case '제출시간':
        case '제출한 시간':
            return 'submissionTime';
        case '시간':
            return 'runtime';
        case '메모리':
            return 'memory';
        case '코드 길이':
            return 'codeLength';
        default:
            return 'unknown';
    }
};

// module.exports = { convertResultTableHeader };
