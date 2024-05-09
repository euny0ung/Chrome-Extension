// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.type === 'test') {
//         // window.alert(request.payload.message);
//         const data = chrome.storage.local.get(tableData);
//         alert('데이터', data);
//         sendResponse({ received: true });
//     }
//     return true; // 유지합니다. 비동기 응답을 지원하기 위해 필요합니다.
// });
