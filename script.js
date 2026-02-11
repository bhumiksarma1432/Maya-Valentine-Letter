const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.getElementById("letter-window");
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const mainContent = document.getElementById("main-content");
const guiltContent = document.getElementById("guilt-content");
const thoughtContent = document.getElementById("thought-content");
const finalSuccess = document.getElementById("final-success");
const sorryBtn = document.getElementById("sorry-btn");

let clickCount = 0; 

// Change these to let the script calculate the center automatically
let originalX = noBtn.offsetLeft; 
let originalY = noBtn.offsetTop;

// Update the position if the window is resized
window.addEventListener('resize', () => {
    if (clickCount === 0) {
        originalX = noBtn.offsetLeft;
        originalY = noBtn.offsetTop;
    }
});

// 1. Open Letter
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letterContainer.style.display = "flex";
    setTimeout(() => { letterWindow.classList.add("open"); }, 50);
});

// 2. Moving No Button on Click (Mobile Friendly)
noBtn.addEventListener("click", (e) => {
    if (clickCount >= 12) {
        // After 12 clicks, let the default click event (Guilt Trip) happen
        return; 
    }

    // Prevent the "Guilt Trip" click from firing until we hit 12
    e.stopImmediatePropagation();

    clickCount++;
    const maxRange = 100;
    const minRange = 50;
    let newX, newY, dist;

    do {
        const rX = (Math.random() - 0.5) * 2 * maxRange;
        const rY = (Math.random() - 0.5) * 2 * maxRange;
        newX = originalX + rX;
        newY = originalY + rY;
        dist = Math.sqrt(Math.pow(newX - noBtn.offsetLeft, 2) + Math.pow(newY - noBtn.offsetTop, 2));
    } while (dist < minRange);

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});

// 3. Click No -> Guilt Trip (Only works after 12 clicks)
noBtn.addEventListener("click", () => {
    if (clickCount >= 12) {
        mainContent.style.display = "none";
        guiltContent.style.display = "flex";
    }
});

// 4. Sorry -> Reset
sorryBtn.addEventListener("click", () => {
    guiltContent.style.display = "none";
    thoughtContent.style.display = "flex";

    setTimeout(() => {
        thoughtContent.style.display = "none";
        mainContent.style.display = "flex";
        
        letterWindow.classList.add("reset-mode");
        noBtn.src = "Yes.png"; 
        noBtn.style.left = "auto";
        noBtn.style.top = "auto";
        
        const newYes = noBtn.cloneNode(true);
        noBtn.parentNode.replaceChild(newYes, noBtn);
        newYes.addEventListener("click", handleSuccess);
    }, 5000);
});

function handleSuccess() {
    mainContent.style.display = "none";
    finalSuccess.style.display = "flex";
}

yesBtn.addEventListener("click", handleSuccess);