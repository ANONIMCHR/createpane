// =========================
// SWITCH MENU
// =========================
function showCreate() {
    document.getElementById("createSection").style.display = "block";
    document.getElementById("statusSection").style.display = "none";
}

function showStatus() {
    document.getElementById("createSection").style.display = "none";
    document.getElementById("statusSection").style.display = "block";
}

// =========================
// SHOW/HIDE ADMIN KEY
// =========================
if (window.location.pathname.includes("dashboard")) {
    document.getElementById("panelType").addEventListener("change", () => {
        let type = document.getElementById("panelType").value;
        document.getElementById("adminKeyBox").style.display = type === "admin" ? "block" : "none";
    });

    // Load profile
    document.getElementById("accUser").innerText = localStorage.getItem("accUser");
    document.getElementById("accPass").innerText = localStorage.getItem("accPass");
    document.getElementById("profilePic").src = localStorage.getItem("accPic");
}

// =========================
// CREATE PANEL (username & pass manual)
// =========================
async function createPanel() {
    let u = document.getElementById("panelUser").value;
    let p = document.getElementById("panelPass").value;
    let type = document.getElementById("panelType").value;
    let key = document.getElementById("adminKey").value;

    if (!u || !p) {
        alert("Username dan password panel wajib diisi");
        return;
    }

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
                username: u,
                email: u + "@mail.com",
                first_name: "Auto",
                last_name: type === "admin" ? "Admin" : "Unli",
                password: p
            })
        });

        let data = await res.json();
        alert("Panel berhasil dibuat!");

    } catch (e) {
        alert("Gagal membuat panel");
    }

    document.getElementById("createBtn").disabled = false;
}
