document.addEventListener("DOMContentLoaded", () => {
    loadSettings();

    document.getElementById("add-productive").addEventListener("click", () => {
        addSite("productive-site-input", "productive-sites");
    });

    document.getElementById("add-unproductive").addEventListener("click", () => {
        addSite("unproductive-site-input", "unproductive-sites");
    });

    document.getElementById("save-settings").addEventListener("click", saveSettings);
});

// Load saved settings
function loadSettings() {
    chrome.storage.sync.get(["productiveSites", "unproductiveSites"], (data) => {
        populateList("productive-sites", data.productiveSites || []);
        populateList("unproductive-sites", data.unproductiveSites || []);
    });
}

// Add a site to the list
function addSite(inputId, listId) {
    let input = document.getElementById(inputId);
    let site = input.value.trim();
    if (site) {
        let list = document.getElementById(listId);
        let li = document.createElement("li");
        li.textContent = site;
        list.appendChild(li);
        input.value = "";
    }
}

// Populate lists with stored data
function populateList(listId, sites) {
    let list = document.getElementById(listId);
    list.innerHTML = "";
    sites.forEach((site) => {
        let li = document.createElement("li");
        li.textContent = site;
        list.appendChild(li);
    });
}

// Save settings to Chrome storage
function saveSettings() {
    let productiveSites = [...document.querySelectorAll("#productive-sites li")].map(li => li.textContent);
    let unproductiveSites = [...document.querySelectorAll("#unproductive-sites li")].map(li => li.textContent);

    chrome.storage.sync.set({ productiveSites, unproductiveSites }, () => {
        alert("Settings saved!");
    });
}
