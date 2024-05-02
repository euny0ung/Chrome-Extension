document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('button');
    btn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: 'test',
                    payload: {
                        message: '안녕@!!',
                    },
                },
                (response) => {
                    console.log(response);
                }
            );
        });
    });
});
