/* eslint-disable no-unused-vars */
const allowedDomains = [
    'example.com',
];

function isAllowedDomain(url) {
    // const urlObj = new URL(url);
    // return allowedDomains.includes(urlObj.hostname);
    return true;
}

async function addVisitedUrl(url) {
    if (!isAllowedDomain(url)) {
        return;
    }

    try {
        const result = await chrome.storage.local.get({ visitedUrls: [] });
        let urls = result.visitedUrls;

        if (!urls.includes(url)) {
            urls.push(url);
            await chrome.storage.local.set({ visitedUrls: urls });
            console.log('URL added to storage:', url);
        }
    } catch (error) {
        console.error('Error adding URL to storage:', error);
    }
}

chrome.history.onVisited.addListener((historyItem) => {
    console.log(`Visited URL: ${historyItem.url}`);
    addVisitedUrl(historyItem.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.log(`Updated URL: ${changeInfo.url}`);
        addVisitedUrl(changeInfo.url);
    }
});
