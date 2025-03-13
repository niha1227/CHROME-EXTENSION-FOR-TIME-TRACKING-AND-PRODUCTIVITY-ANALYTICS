document.addEventListener("visibilitychange", () => {
    chrome.runtime.sendMessage({
        action: document.hidden ? "inactive" : "active",
        url: window.location.hostname
    });
});
