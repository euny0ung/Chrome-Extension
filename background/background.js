chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('백그라운드 실행됨');
    if (message.type === 'sendTable') {
        console.log('Received table data from content script:', message.tableData);

        // 여기에서 API 호출

        sendDataToAPI(message.tableData);
    }
});

function sendDataToAPI(tableData) {
    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoidGVzdEBuYXZlci5jb20iLCJuaWNrbmFtZSI6IjwtLSDrsJTrs7QiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcxNTI0MzU4OCwiZXhwIjoxODAxNjQzNTg4fQ.YdqIIlBIG-hPxBsh3MGbZu6yqasU3dPiYast0o5iYLY';

    fetch('https://algnote.duckdns.org/api/submissions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: tableData }),
    })
        .then((response) => response.json())
        .then((data) => console.log('API response:', data))
        .catch((error) => console.error('Error sending data to API:', error));
}
