document.addEventListener('DOMContentLoaded', function () {
    alert('로그인 확인중');
    if (window.location.pathname === '/login') {
        const checkAuth = setInterval(() => {
            chrome.cookies.get({ url: 'https://algnote.duckdns.org', name: 'access_token' }, function (cookie) {
                const isAuthenticated = cookie;
                if (isAuthenticated) {
                    clearInterval(checkAuth); // 주기적 확인 중지
                    chrome.runtime.sendMessage({ type: 'loginSuccess' }); // 백그라운드로 메시지 전송
                }
            });
        }, 1000); // 1초마다 확인
    }
});
