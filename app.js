// =========================
// CONFIG
// =========================
const CONFIG = {
    DOMAIN: "https://panel.domainkamu.com",

    PLTA: "plta_xxxxxxxxxxxxxxxxxxxxx",
    PLTC: "ptlc_xxxxxxxxxxxxxxxxxxxxx",

    ADMIN_KEY: "KEY-ADMIN-RAHASIA",

    USERS: [
        { user: "user1", pass: "pass1", pic: "https://files.catbox.moe/xxxx1.jpg" },
        { user: "user2", pass: "pass2", pic: "https://files.catbox.moe/xxxx2.jpg" },
        { user: "user3", pass: "pass3", pic: "https://files.catbox.moe/xxxx3.jpg" },
        { user: "user4", pass: "pass4", pic: "https://files.catbox.moe/xxxx4.jpg" },
        { user: "user5", pass: "pass5", pic: "https://files.catbox.moe/xxxx5.jpg" },
        { user: "user6", pass: "pass6", pic: "https://files.catbox.moe/xxxx6.jpg" },
        { user: "user7", pass: "pass7", pic: "https://files.catbox.moe/xxxx7.jpg" },
        { user: "user8", pass: "pass8", pic: "https://files.catbox.moe/xxxx8.jpg" },
        { user: "user9", pass: "pass9", pic: "https://files.catbox.moe/xxxx9.jpg" },
        { user: "user10", pass: "pass10", pic: "https://files.catbox.moe/xxxx10.jpg" }
    ]
};

// =========================
// LOGIN
// =========================
function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    let acc = CONFIG.USERS.find(x => x.user === u && x.pass === p);

    if (!acc) {
        alert("Username atau password salah");
        return;
    }

    localStorage.setItem("accUser", acc.user);
    localStorage.setItem("accPass", acc.pass);
    localStorage.setItem("accPic", acc.pic);

    window.location.href = "dashboard.html";
}

// =========================
// LOAD PROFILE
// =========================
if (window.location.pathname.includes("dashboard")) {
    document.getElementById("accUser").innerText = localStorage.getItem("accUser");
    document.getElementById("accPass").innerText = localStorage.getItem("accPass");
    document.getElementById("profilePic").src = localStorage.getItem("accPic");

    document.getElementById("panelType").addEventListener("change", () => {
        let type = document.getElementById("panelType").value;
        document.getElementById("adminKeyBox").style.display = type === "admin" ? "block" : "none";
    });
}

// =========================
// CREATE PANEL
// =========================
async function createPanel() {
    let type = document.getElementById("panelType").value;
    let key = document.getElementById("adminKey").value;

    if (type === "admin" && key !== CONFIG.ADMIN_KEY) {
        alert("Admin key salah!");
        return;
    }

    document.getElementById("createBtn").disabled = true;

    try {
        let res = await fetch(CONFIG.DOMAIN + "/api/application/users", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + CONFIG.PLTA,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: "panel_" + Math.floor(Math.random() * 99999),
                email: "email" + Math.floor(Math.random() * 99999) + "@mail.com",
                first_name: "Auto",
                last_name: type === "admin" ? "Admin" : "Unli",
                password: Math.random().toString(36).slice(2, 10)
            })
        });

        let data = await res.json();
        alert("Panel berhasil dibuat!");

    } catch (e) {
        alert("Gagal membuat panel");
    }

    document.getElementById("createBtn").disabled = false;
}
