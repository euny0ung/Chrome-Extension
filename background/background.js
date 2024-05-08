chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('백그라운드 실행됨');
    if (message.type === 'sendTable') {
        console.log('Received table data from content script:', message.tableData);
        // 여기에서 추가적으로 API 호출을 할 수 있습니다.
        sendDataToAPI(message.tableData);
    }
});

function sendDataToAPI(tableData) {
    fetch('https://algnote.duckdns.org', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: tableData }),
    })
        .then((response) => response.json())
        .then((data) => console.log('API response:', data))
        .catch((error) => console.error('Error sending data to API:', error));
}
