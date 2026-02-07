const yes = document.getElementById("yes");
const no = document.getElementById("no");
const taunt = document.getElementById("taunt");
const msg = document.getElementById("msg");
const letter = document.getElementById("letter");
const heartsContainer = document.getElementById("hearts");

let tries = 0;

const taunts = [
    "Click on Yes Sweetie 😘",
    "Again you tried 😔",
    "NO button is shy 😌",
    "YES is waiting cutie 💖",
    "Please click YES 🙏",
    "Why are you teasing me 😒"
];

/* ---------------- NO BUTTON LOGIC ---------------- */
function moveNo() {
    no.style.position = "fixed"; // IMPORTANT: fixed prevents disappearing

    const padding = 30;
    const maxX = window.innerWidth - no.offsetWidth - padding;
    const maxY = window.innerHeight - no.offsetHeight - padding;

    let x, y;
    let safe = false;

    // Ensure NO doesn't jump on YES
    while (!safe) {
        x = Math.random() * maxX;
        y = Math.random() * maxY;

        const yesRect = yes.getBoundingClientRect();
        const dist =
            Math.abs(x - yesRect.left) +
            Math.abs(y - yesRect.top);

        if (dist > 150) safe = true;
    }

    no.style.left = x + "px";
    no.style.top = y + "px";

    taunt.innerText = taunts[tries % taunts.length];
    tries++;

    yes.style.transform = `scale(${1 + tries * 0.05})`;
}

no.addEventListener("click", moveNo);
no.addEventListener("touchstart", moveNo);

/* ---------------- YES BUTTON ---------------- */
yes.addEventListener("click", () => {
    // Remove buttons & taunt only
    yes.remove();
    no.remove();
    taunt.remove();

    // Step 1: Show first happy message
    typeText("YAY!! 🥰 I knew you’d click YES, Cutie 💕");

    // Step 2: After typing + pause, transition to final letter
    setTimeout(() => {
        const container = document.querySelector(".container");

        // fade out container
        container.style.opacity = "0";

        setTimeout(() => {
            container.style.display = "none";
            letter.style.display = "block";
        }, 800);

    }, 3500); // wait till first message feels complete
});
/* ---------------- TYPE EFFECT ---------------- */
function typeText(text) {
    msg.style.display = "block";
    msg.innerHTML = "";   // 🔥 CLEAR previous message first

    let i = 0;
    const interval = setInterval(() => {
        msg.innerHTML += text[i++];
        if (i === text.length) clearInterval(interval);
    }, 60);
}
/* ---------------- FLOATING HEARTS ---------------- */
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = ["💖", "💘", "❤️", "💝", "🌹"][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 300);