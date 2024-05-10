chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('백그라운드 실행됨');

    if (message.type === 'sendTable') {
        console.log('Received table data from content script:', message.tableData);

        chrome.cookies.get({ url: 'https://algnote.duckdns.org', name: 'access_token' }, function (cookie) {
            if (cookie) {
                // console.log('백그라운드 쿠키 있음', cookie.value);
                sendDataToAPI(message.tableData, cookie.value);
            } else {
                const alert = console.log.bind(console);
                alert('서비스 재로그인 후 제출 페이지를 새로고침해주세요'); // 내가 새로고침되게 만들까
            }
        });
    }
});

function sendDataToAPI(tableData, cookie) {
    fetch('https://algnote.duckdns.org/api/submissions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookie}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableData }),
    })
        .then((response) => response.text())
        .then((text) => {
            // try{
            //     const data=JSON.parse(text);
            //     console.log('API 응답', data);
            // }catch(error){
            //     console.error('파싱 실패로 원본 텍스트 출력', text)
            // }
            console.log(text);
        })
        .catch((error) => console.error('Error sending data to API:', error));
}
