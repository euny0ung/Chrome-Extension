async function fetchCode(submissionId) {
    const response = await fetch(`https://www.acmicpc.net/source/download/${submissionId}`, { method: 'GET' });
    const text = await response.text();
    console.log(text);
}

let submissionId = 78067414;
fetchCode(submissionId);

// parsing의 getSubmitCodeFromStats 보기
