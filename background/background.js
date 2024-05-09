chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('백그라운드 실행됨');
    if (message.type === 'sendTable') {
        console.log('Received table data from content script:', message.tableData);

        chrome.cookies.get({ url: 'https://algnote.duckdns.org', name: 'access_token' }, function (cookie) {
            if (cookie) {
                // console.log('백그라운드 쿠키 있음', cookie.value);
                sendDataToAPI(message.tableData, cookie.value);
            } else {
                alert('재로그인이 필요합니다');
            }
        });
    }
});

function sendDataToAPI(tableData, cookie) {
    fetch('https://algnote.duckdns.org', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({ data: tableData }),
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
