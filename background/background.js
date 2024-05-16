chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.tabs.create({
            url: 'https://algnote.duckdns.org',
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'sendTable') {
        console.log('Received table data from content script:', message.tableData);

        chrome.cookies.get({ url: 'https://algnote.duckdns.org', name: 'access_token' }, function (cookie) {
            if (cookie !== null) {
                sendDataToAPI(message.tableData, cookie.value, sender.tab.id);
            } else {
                createLoginNotification(sender.tab.id, sender.url, message.tableData);
            }
        });
    } else if (message.type === 'loginSuccess') {
        console.log('중간 로그인 성공');
        chrome.storage.local.get(['redirectTabId', 'originUrl'], function (data) {
            if (data.redirectTabId && data.originUrl) {
                console.log('Reloading tab:', data.redirectTabId, 'with URL:', data.originUrl);
                chrome.tabs.update(data.redirectTabId, { url: data.originUrl }, function () {
                    chrome.storage.local.remove(['redirectTabId', 'originUrl', 'tableData'], function () {
                        console.log('Cleared stored data after redirection');
                    });
                });
            }
        });
    }
});

function createLoginNotification(tabId, originUrl, tableData) {
    chrome.notifications.create(
        {
            type: 'basic',
            iconUrl: '../images/small_logo.png',
            title: '로그인 필요',
            message: '로그인이 필요합니다. 클릭시 로그인 화면으로 이동합니다.',
        },
        function (notificationId) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log('Notification created with ID:', notificationId);
                chrome.notifications.onClicked.addListener(function handler(notificationId) {
                    chrome.notifications.onClicked.removeListener(handler);
                    chrome.tabs.create({ url: 'https://algnote.duckdns.org/login', active: true }, function (tab) {
                        chrome.storage.local.set(
                            {
                                redirectTabId: tabId,
                                originUrl: originUrl,
                                tableData: tableData,
                            },
                            function () {
                                console.log('Stored tabId and originUrl for redirection');
                            }
                        );
                    });
                });
            }
        }
    );
}

function sendDataToAPI(tableData, cookie, tabId) {
    fetch('https://algnote.duckdns.org/api/submissions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookie}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
    })
        .then((response) => response.text())
        .then(() => {
            chrome.tabs.sendMessage(tabId, { message: 'success' });
        })
        .catch((error) => chrome.tabs.sendMessage(tabId, { message: 'fail: ' + error.message }));
}
