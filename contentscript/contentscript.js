chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    alert(request, sender, sendResponse);
    if (request.type === 'test') {
        window.alert(request.payload.message);
    }
    sendRequest({ received: true });
    return true;
});
