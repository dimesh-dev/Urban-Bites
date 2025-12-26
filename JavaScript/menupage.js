// Menu Data (Hardcoded to avoid CORS issues)
const menuItems = [
    {
        name: "Hot Butter Cuttlefish",
        price: 1050,
        image: "Images/HotButterCuttlefish.png",
        description: "Spicy battered cuttlefish, deep-fried and tossed in a buttery sauce with garlic, ginger, and green chilies.",
        category: "appetizers"
    },
    {
        name: "Sri Lankan Fish Cutlets (5 pcs)",
        price: 390,
        image: "Images/SriLankanFishCutlets.png",
        description: "Spicy fish cakes made with potato, tuna, and a blend of Sri Lankan spices.",
        category: "appetizers"
    },
    {
        name: "Spicy Devilled Chicken Wings",
        price: 1600,
        image: "Images/SpicyDevilledChickenWings.png",
        description: "Chicken wings marinated in a spicy sauce, deep-fried, and tossed in a fiery sauce with onions, capsicum, & green chilies.",
        category: "appetizers"
    },
    {
        name: "Crispy Prawn Wontons",
        price: 1750,
        image: "Images/CrispyPrawnWontons.png",
        description: "Deep-fried wontons filled with prawns, ginger, garlic, and spring onions.",
        category: "appetizers"
    },
    {
        name: "Jaffna Mutton Rolls (3 pcs)",
        price: 1200,
        image: "Images/JaffnaMuttonRolls.png",
        description: "Spicy mutton rolls made with a blend of Jaffna spices.",
        category: "appetizers"
    },
    {
        name: "Rice & Curry (Choice of Meat)",
        price: 2200,
        image: "Images/rice-and-curry.png",
        description: "A choice of meat or vegetarian curry served with rice, dhal, and a selection of vegetable curries.",
        category: "mains"
    },
    {
        name: "Kottu Roti (Various Options)",
        price: 2000,
        image: "Images/kottu.png",
        description: "Chopped roti stir-fried with a choice of meat or seafood, vegetables, and spices.",
        category: "mains"
    },
    {
        name: "Jaffna Crab Curry with Roast Paan",
        price: 3500,
        image: "Images/crab-curry.png",
        description: "Crab curry made with a blend of Jaffna spices, served with Roast Paan.",
        category: "mains"
    },
    {
        name: "Lamprais",
        price: 2500,
        image: "Images/lamprais.png",
        description: "A Dutch-Sri Lankan specialty made with rice, meat curry, eggplant, and seeni sambol, wrapped in a banana leaf.",
        category: "mains"
    },
    {
        name: "Egg Hopper with Lunu Miris",
        price: 1050,
        image: "Images/hoppers.png",
        description: "A bowl-shaped pancake made with fermented rice flour, topped with an egg, served with lunu miris and chicken curry.",
        category: "mains"
    },
    {
        name: "Watalappan",
        price: 1200,
        image: "Images/watalappan.png",
        description: "A traditional Sri Lankan coconut custard made with jaggery, coconut milk, and spices.",
        category: "desserts"
    },
    {
        name: "Sri Lankan Love Cake",
        price: 1000,
        image: "Images/love-cake.png",
        description: "A traditional Sri Lankan cake made with semolina, cashew nuts, and candied peel.",
        category: "desserts"
    },
    {
        name: "Buffalo Curd with Treacle",
        price: 800,
        image: "Images/curd.png",
        description: "Buffalo curd served with kithul treacle and grated coconut.",
        category: "desserts"
    },
    {
        name: "Milk Toffee (4 pcs)",
        price: 950,
        image: "Images/milk-toffee.png",
        description: "A traditional Sri Lankan sweet made with condensed milk, sugar, and cashew nuts.",
        category: "desserts"
    },
    {
        name: "Jaggery & Coconut Pancakes",
        price: 850,
        image: "Images/pancakes.png",
        description: "Coconut pancakes made with jaggery, coconut milk, and rice flour.",
        category: "desserts"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const menuGrid = document.getElementById("menu-grid");

    // Load Items
    function displayItems(category = "all") {
        if (!menuGrid) return;
        menuGrid.innerHTML = "";

        const filtered = category === "all"
            ? menuItems
            : menuItems.filter(item => item.category === category);

        if (filtered.length === 0) {
            menuGrid.innerHTML = "<p class='no-items'>No items found in this category.</p>";
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "menu-item hover-target"; // added hover-target for cursor
            card.innerHTML = `
                <div style="overflow: hidden;">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='Images/Logo.png'">
                </div>
                <div class="menu-content">
                    <div class="menu-header-row">
                        <h3>${item.name}</h3>
                        <span class="price">Rs ${item.price}</span>
                    </div>
                    <p class="description">${item.description}</p>
                </div>
            `;
            menuGrid.appendChild(card);
        });

        // Re-attach hover listeners for new elements
        attachCursorListeners();
    }

    // Filter Logic
    window.filterMenu = function (category) {
        displayItems(category);

        // Update active button
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            if (btn.textContent.toLowerCase() === category || (category === 'all' && btn.textContent === 'All')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Initial Load
    displayItems();

    // Custom Cursor Logic
    const pCursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    window.addEventListener('mousemove', (e) => {
        pCursor.x = e.clientX;
        pCursor.y = e.clientY;
        if (cursorDot) {
            cursorDot.style.top = pCursor.y + 'px';
            cursorDot.style.left = pCursor.x + 'px';
        }
    });

    let outlineX = pCursor.x;
    let outlineY = pCursor.y;

    function animateCursor() {
        outlineX += (pCursor.x - outlineX) * 0.15;
        outlineY += (pCursor.y - outlineY) * 0.15;
        if (cursorOutline) {
            cursorOutline.style.top = outlineY + 'px';
            cursorOutline.style.left = outlineX + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    function attachCursorListeners() {
        if (!cursorOutline) return;
        const targets = document.querySelectorAll('.hover-target, a, button');
        targets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                if (cursorDot) cursorDot.style.opacity = '0';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
                if (cursorDot) cursorDot.style.opacity = '1';
            });
        });
    }
    attachCursorListeners(); // Initial attach

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-text, .reveal-fade').forEach(el => observer.observe(el));
});

// Popup Logic (Same as homepage)
function openTermsPopup() { document.getElementById("termsPopup").style.display = "block"; }
function closeTermsPopup() { document.getElementById("termsPopup").style.display = "none"; }
function openPrivacyPopup() { document.getElementById("privacyPopup").style.display = "block"; }
function closePrivacyPopup() { document.getElementById("privacyPopup").style.display = "none"; }

window.onclick = function (event) {
    if (event.target == document.getElementById("termsPopup")) closeTermsPopup();
    if (event.target == document.getElementById("privacyPopup")) closePrivacyPopup();
};