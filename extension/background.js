chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        trackTime(tab.url);
    }
});

function trackTime(url) {
    try {
        if (!url || typeof url !== "string") {
            console.error("Invalid URL detected:", url);
            return;
        }

        const parsedUrl = new URL(url);  // This will throw an error if the URL is invalid

        chrome.storage.local.get(["trackedSites"], (data) => {
            let sites = data.trackedSites || {};
            let domain = parsedUrl.hostname;

            if (!sites[domain]) {
                sites[domain] = 0;
            }

            sites[domain] += 1;

            chrome.storage.local.set({ trackedSites: sites });
        });
    } catch (error) {
        console.error("Error processing URL:", url, error);
    }
}
