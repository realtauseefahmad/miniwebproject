document.querySelectorAll('#desktopleft .icon img').forEach(icon => {
    icon.addEventListener("dblclick", () => {
        let appName = icon.parentElement.querySelector("h4").innerText;
        openWindow(appName);
    });
});

const searchInput = document.querySelector(".searchbar input");
searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let query = searchInput.value.trim();
        if (query === "") return;
        window.open(`https://www.bing.com/search?q=${query}`, "_blank");
        searchInput.value = "";
    }
});
const barIcons = document.querySelectorAll(".Baricons img");
barIcons.forEach(icon => {
    icon.addEventListener("mousedown", () => {
        icon.style.transform = "scale(0.85)";
    });
    icon.addEventListener("mouseup", () => {
        icon.style.transform = "scale(1)";
    });
    icon.addEventListener("mouseleave", () => {
        icon.style.transform = "scale(1)";
    });
});
const startBtn = document.querySelector('.Baricons[data-text="Start"]');
let zIndexNo = 200;

function openWindow(title) {
    let win = document.createElement("div");
    win.className = "winBox";

    win.innerHTML = `
        <div class="winHeader">
            <span>${title}</span>
            <button class="closeWin">✖</button>
        </div>
        <div class="winBody">
            ${getWindowContent(title)}
        </div>
    `;

    document.body.appendChild(win);

    win.style.left = "120px";
    win.style.top = "80px";
    win.style.zIndex = zIndexNo++;

    win.querySelector(".closeWin").onclick = () => win.remove();

    makeDraggable(win);
    addWindowStyles();
}
function getWindowContent(title) {
    if (title === "Chrome") {
        return `<iframe src="https://www.google.com" style="width:100%;height:100%;border:0;"></iframe>`;
    }
    if (title === "YouTube") {
        return `<iframe src="https://m.youtube.com" style="width:100%;height:100%;border:0;"></iframe>`;
    }
    if (title === "WhatsApp") {
        return `<iframe src="https://web.whatsapp.com" style="width:100%;height:100%;border:0;"></iframe>`;
    }
    return `<p style="color:white;">${title} window opened.</p>`;
}
function makeDraggable(win) {
    let header = win.querySelector(".winHeader");
    let offsetX, offsetY;

    header.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        function move(e) {
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
            win.style.zIndex = zIndexNo++;
        }

        document.addEventListener("mousemove", move);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", move);
        }, { once: true });
    });
}

let startMenu = null;
startBtn.addEventListener("click", () => {
    if (startMenu) {
        startMenu.remove();
        startMenu = null;
        return;
    }

    startMenu = document.createElement("div");
    startMenu.classList.add("start-menu");
    startMenu.innerHTML = `
       <div id="startMenu">
        <div class="start-left">
            <div class="searchBox">
                <input type="text" placeholder="Search for apps, settings, and documents">
            </div>
            <h3>Pinned</h3>
            <div class="pinnedGrid">
                <div class="app"><img src="https://www.logo.wine/a/logo/Microsoft_Edge/Microsoft_Edge-New-Logo.wine.svg"><p>Edge</p></div>
                <div class="app"><img src="./msword.png"><p>Word</p></div>
                <div class="app"><img src="./msexcel.png"><p>Excel</p></div>
                <div class="app"><img src="./mspowerpoint.png"><p>PowerPoint</p></div>
                <div class="app"><img src="./msoutlook.png"><p>Outlook</p></div>
                <div class="app"><img src="./MS-Store.png"><p>Store</p></div>              
                <div class="app"><img src="./folder.png"><p>Folder</p></div>
                <div class="app"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"><p>LinkedIn</p></div>
                <div class="app"><img src="./clock.png"><p>Clock</p></div>
                <div class="app"><img src="./note.png"><p>Notepad</p></div>
            </div>
            <h3>Recommended</h3>
            <div class="recommended">
                <div class="rec">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg">
                    <div><p>Node.js</p><span>Recently added</span></div>
                </div>
                <div class="rec">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">
                    <div><p>WhatsApp</p><span>2h ago</span></div>
                </div>
            </div>
            <div class="user">
                <img src="./me.jpg">
                <p>Tauseef</p>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(startMenu);
    Object.assign(startMenu.style, {
        position: "fixed",
        bottom: "60px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",      
        maxHeight: "85vh",    
        display: "flex",
        background: "rgba(25,25,30,0.75)",
        backdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "25px",
        color: "white",
        boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflow: "visible"  
    });
    const style = document.createElement("style");
    style.textContent = `
        #startMenu {
            display: flex;
            width: 100%;
        }
        .start-left {
            flex: 1;
        }
        .searchBox input {
            width: 100%;
            padding: 10px 15px;
            border-radius: 12px;
            border: none;
            outline: none;
            background: rgba(255,255,255,0.1);
            color: white;
            margin-bottom: 15px;
        }
        .searchBox input::placeholder {
            color: rgba(255,255,255,0.6);
        }
        .pinnedGrid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }
        .app {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            padding: 10px;
            border-radius: 12px;
            transition: background 0.2s;
            cursor: pointer;
        }
        .app:hover {
            background: rgba(255,255,255,0.1);
        }
        .app img { width: 45px; height: 45px; object-fit: contain; }
        .recommended .rec {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 12px;
            transition: background 0.2s;
            cursor: pointer;
        }
        .recommended .rec:hover {
            background: rgba(255,255,255,0.1);
        }
        .recommended .rec img { width: 35px; height: 35px; border-radius: 8px; object-fit: contain; }
        .user {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 15px;
        }
        .user img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    `;
    startMenu.appendChild(style);
});
document.addEventListener("click", (e) => {
    if (!startBtn.contains(e.target) && startMenu && !startMenu.contains(e.target)) {
        startMenu.remove();
        startMenu = null;
    }
});
let contextMenu = null;
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    if (contextMenu) contextMenu.remove();
    contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");
    contextMenu.innerHTML = `
        <div class="item">🔄 Refresh</div>
        <div class="item">🗂 View</div>
        <div class="item">📁 New Folder</div>
        <div class="line"></div>
        <div class="item">📝 New File</div>
        <div class="item">⚙️ Personalize</div>
        <div class="line"></div>
        <div class="item">❌ Close</div>
    `;
    document.body.appendChild(contextMenu);
    contextMenu.style.position = "fixed";
    contextMenu.style.left = e.pageX + "px";
    contextMenu.style.top = e.pageY + "px";
    if (e.pageX + 230 > window.innerWidth)
        contextMenu.style.left = (window.innerWidth - 240) + "px";

    if (e.pageY + 250 > window.innerHeight)
        contextMenu.style.top = (window.innerHeight - 260) + "px";

    addContextMenuStyles();
});
document.addEventListener("click", () => {
    if (contextMenu) {
        contextMenu.remove();
        contextMenu = null;
    }
});
function addContextMenuStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        .context-menu {
            background: rgba(40,40,40,0.65);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 12px;
            padding: 8px 0;
            width: 230px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.45);
            z-index: 9999;
            animation: fadeIn 0.15s ease;
        }
        .context-menu .item {
            padding: 10px 18px;
            font-size: 15px;
            color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: 0.15s;
            user-select: none;
        }
        .context-menu .item:hover {
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(30px);
        }
        .context-menu .line {
            height: 1px;
            background: rgba(255,255,255,0.15);
            margin: 6px 0;
            width: 100%;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.96); }
            to   { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

function addWindowStyles() {
    if (document.getElementById("winStyle")) return;

    let style = document.createElement("style");
    style.id = "winStyle";

    style.innerHTML = `
        .winBox {
            position: fixed;
            width: 600px;
            height: 400px;
            background: rgba(30,30,30,0.75);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 12px;
            backdrop-filter: blur(30px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 10px 35px rgba(0,0,0,0.7);
            animation: fadeIn 0.18s ease;
        }

        .winHeader {
            height: 45px;
            background: rgba(255,255,255,0.1);
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            cursor: move;
        }

        .winHeader button {
            background: #ff4c4c;
            color: white;
            border: none;
            width: 26px;
            height: 26px;
            border-radius: 6px;
            cursor: pointer;
        }

        .winHeader button:hover {
            background: #ff1f1f;
        }

        .winBody {
            flex: 1;
            padding: 10px;
            color: white;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
    `;

    document.head.appendChild(style);
}
