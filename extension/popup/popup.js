document.addEventListener("DOMContentLoaded", () => {
    loadTrackedSites();

    document.getElementById("clear-data").addEventListener("click", clearData);
    document.getElementById("settings-btn").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });
});

// Load tracked websites
function loadTrackedSites() {
    chrome.storage.sync.get(["trackedSites"], (data) => {
        let sites = data.trackedSites || [];
        let list = document.getElementById("tracked-sites");
        list.innerHTML = "";

        if (sites.length === 0) {
            list.innerHTML = "<li>No sites tracked yet.</li>";
        } else {
            sites.forEach((site) => {
                let li = document.createElement("li");
                li.textContent = site;
                list.appendChild(li);
            });
        }
    });
}

// Clear all tracked data
function clearData() {
    chrome.storage.sync.remove("trackedSites", () => {
        alert("Tracking data cleared!");
        loadTrackedSites();
    });
}
