chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('백그라운드 실행됨');
    if (message.type === 'sendTable') {
        console.log('Received table data from content script:', message.tableData);
        console.log('제출코드', message.submitCode);

        chrome.cookies.get({ url: 'https://algnote.duckdns.org', name: 'access_token' }, function (cookie) {
            if (cookie) {
                console.log('백그라운드 쿠키 있음', cookie.value);
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
            Authorization: cookie,
        },
        body: JSON.stringify({ data: tableData }),
    })
        .then((response) => response.json())
        .then((data) => console.log('API response:', data))
        .catch((error) => console.error('Error sending data to API:', error));
}
