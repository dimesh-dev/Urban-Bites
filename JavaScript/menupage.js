document.addEventListener("DOMContentLoaded", function () {
    const menuGrid = document.getElementById("menu-grid");
    if (!menuGrid) {
        console.error("menu-grid element not found in the DOM");
        return;
    }

    // Function to fetch and parse the XML file
    function fetchXMLFile(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
                        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                            console.error("Error parsing XML:", xmlDoc.getElementsByTagName("parsererror")[0].textContent);
                            callback(null);
                        } else {
                            callback(xmlDoc);
                        }
                    } catch (e) {
                        console.error("Failed to parse XML:", e);
                        callback(null);
                    }
                } else {
                    console.error("Failed to fetch XML file. Status:", xhr.status, "Status Text:", xhr.statusText);
                    callback(null);
                }
            }
        };
        xhr.onerror = function () {
            console.error("Error fetching XML file. Network error or CORS issue.");
            callback(null);
        };
        xhr.send();
    }

    // Load and display menu items
    function loadMenuFromXML(category = "all") {
        console.log("Loading menu items for category:", category);
        fetchXMLFile("menu.xml", function (xmlDoc) {
            if (!xmlDoc) {
                menuGrid.innerHTML = "<p>Error loading menu data. Check console for details.</p>";
                return;
            }

            const items = xmlDoc.getElementsByTagName("item");
            console.log("Found", items.length, "menu items");
            menuGrid.innerHTML = ""; // Clear existing content

            for (let i = 0; i < items.length; i++) {
                try {
                    const name = items[i].getElementsByTagName("name")[0].textContent || "Unnamed Item";
                    const price = parseFloat(items[i].getElementsByTagName("price")[0].textContent) || 0;
                    const image = items[i].getElementsByTagName("image")[0].textContent || "";
                    const description = items[i].getElementsByTagName("description")[0].textContent || "";
                    const itemCategory = items[i].getAttribute("category") || "uncategorized";

                    if (!name || !price || !image || !description || !itemCategory) {
                        console.warn("Incomplete data for item", i, { name, price, image, description, itemCategory });
                        continue;
                    }

                    if (category === "all" || itemCategory === category) {
                        const menuItem = document.createElement("div");
                        menuItem.className = "menu-item";
                        menuItem.dataset.itemName = name;
                        menuItem.dataset.category = itemCategory;
                        menuItem.innerHTML = `
                            <img src="${image}" alt="${name}" onerror="this.src='Images/placeholder.png';console.log('Image failed for ${name}');">
                            <h3>${name}</h3>
                            <p style="font-size: 1.25em; color: #ff6b6b;">Rs ${price}/-</p>
                            <p><i>${description}</i></p>
                        `;
                        menuGrid.appendChild(menuItem);
                        console.log("Added item:", name);
                    }
                } catch (e) {
                    console.error("Error processing item", i, e);
                }
            }

            if (menuGrid.children.length === 0) {
                menuGrid.innerHTML = category === "all" ? "<p>No menu items found.</p>" : "<p>No items found for this category.</p>";
            }
        });
    }

    // Filter menu function
    window.filterMenu = function (category) {
        loadMenuFromXML(category);
    };

    // Load the menu initially
    loadMenuFromXML();

});

// Terms Popup
function openTermsPopup() {
    document.getElementById("termsPopup").style.display = "block";
}

function closeTermsPopup() {
    document.getElementById("termsPopup").style.display = "none";
}

// Privacy Popup
function openPrivacyPopup() {
    document.getElementById("privacyPopup").style.display = "block";
}

function closePrivacyPopup() {
    document.getElementById("privacyPopup").style.display = "none";
}

// Close popups when clicking outside
window.onclick = function (event) {
    var termsPopup = document.getElementById("termsPopup");
    var privacyPopup = document.getElementById("privacyPopup");
    if (event.target == termsPopup) {
        termsPopup.style.display = "none";
    }
    if (event.target == privacyPopup) {
        privacyPopup.style.display = "none";
    }
}; 