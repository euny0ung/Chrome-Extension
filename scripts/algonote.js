function checkCookie() {
    chrome.cookies.get({ url: 'https://algnote.duckdns.org', name: 'access_token' }, function (cookie) {
        if (cookie) {
            console.log('쿠키 가져왔음:', cookie.value);
            chrome.storage.sync.set({ token: cookie.value }, function () {
                console.log('쿠키 저장 완료');
            });
        } else {
            console.log('쿠키를 찾을 수 없음');
        }
    });
}

// 5분
setInterval(checkCookie, 300000);
