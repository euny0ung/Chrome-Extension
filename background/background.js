chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'sendTable') {
        /// console.log('Received table data from content script:', message.tableData);

        chrome.cookies.get({ url: 'https://algnote.duckdns.org', name: 'access_token' }, function (cookie) {
            if (cookie !== null) {
                sendDataToAPI(message.tableData, cookie.value);
            } else {
                const alert = console.log.bind(console);
                alert('서비스 재로그인 후 제출 페이지를 새로고침해주세요');
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
        body: JSON.stringify(tableData),
    })
        .then((response) => response.text())
        .then((text) => {
            console.log(text);
        })
        .catch((error) => console.error('Error sending data to API:', error));
}
