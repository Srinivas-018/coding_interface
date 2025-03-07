function showMCQ() {
        document.getElementById("question").style.display = "block";
        display=editor1;
    }
    let editor;
    let editor1;
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' } });

require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: [
            "//Your code goes here...."
        ].join("\n"),
        language: "c",
        theme: "vs-dark"
    });
});

async function runCode() {
    const code = editor.getValue();
    const input = document.getElementById("stdin").value;

    document.getElementById("output").innerText = "Compiling and executing...";

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            language: "c",
            version: "10.2.0",
            files: [{ content: code }],
            stdin: input
        })
    });

    const result = await response.json();
    document.getElementById("output").innerText = result.run.stdout || result.run.stderr || "No output";
}


    let defaultTime = 5400; // 90 minutes in seconds
    let timerRunning = false;
    let timerInterval;

    // Get stored time (if exists)
    let storedTimeLeft = sessionStorage.getItem("timeLeft");

    // If timeLeft exists in sessionStorage, use it; otherwise, start from 90 min
    let timeLeft = storedTimeLeft ? parseInt(storedTimeLeft) : defaultTime;
    let startTime = defaultTime; // The initial 60 minutes

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").textContent = `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;

        if (timeLeft > 0) {
            timeLeft--;
            sessionStorage.setItem("timeLeft", timeLeft); // Save time in sessionStorage
        } else {
            clearInterval(timerInterval);
            alert("⏳ Time's up!");
            sessionStorage.removeItem("timeLeft"); // Reset timer storage
        }
    }

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
    }

    let penaltyTime = 0; // Track total penalty time in seconds

    
    function checkAnswer(answer) {
        const body = document.getElementById("competitionBody"); // Fix: Ensure body is defined
        const buttons = document.querySelectorAll(".question button"); // Select all MCQ buttons

        if (answer === 4) {
            alert("✅ Correct Answer! All the Best.");
            // Disable all MCQ buttons
            buttons.forEach(button => {
                button.disabled = true;
                button.style.opacity = "0.5"; // Reduce opacity for a disabled look
                button.style.pointerEvents = "none"; // Prevent clicks
            });
            document.querySelector(".main-question").style.display = "block";
        } else {
           /* // ❌ Wrong Answer: Freeze for 5 sec and subtract 10 min
            alert("❌ Wrong answer! 10 minutes deducted and screen frozen for 5 seconds.");
            let deductedTime = 600; // 10 minutes in seconds
            penaltyTime += deductedTime; // Track total penalty time
            timeLeft = Math.max(0, timeLeft - 600); // Reduce 10 minutes
            sessionStorage.setItem("timeLeft", timeLeft); // Save the updated time*/

            //clearInterval(timerInterval); // Stop the timer

            // Freeze the screen
            body.classList.add("freeze-screen");
            document.getElementById("overlay").innerHTML = "❌ Wrong Answer! Screen frozen for 30 seconds...";
            document.getElementById("overlay").style.display = "flex";

            // Unfreeze after 30seconds
            setTimeout(() => {
                body.classList.remove("freeze-screen");
                document.getElementById("overlay").style.display = "none";
                startTimer(); // Restart the timer after freeze
            }, 30000); // 30s
        }
    }

    function submit() {
        stopTimer(); // Stop the timer
        const body = document.getElementById("competitionBody");

        let minutesLeft = Math.floor(timeLeft / 60);
        let secondsLeft = timeLeft % 60;
        
        let utilizedTime = startTime - timeLeft; // Total utilized time in seconds
        let utilizedMinutes = Math.floor(utilizedTime / 60);
        let utilizedSeconds = utilizedTime % 60;

        let penaltyMinutes = Math.floor(penaltyTime / 60);
        let penaltySeconds = penaltyTime % 60;

        // Show overlay with remaining & utilized time and freeze the screen
        document.getElementById("overlay").innerHTML = `
            ✅ Submitted!<br><br>
            🕒 Remaining Time: ${minutesLeft}m ${secondsLeft < 10 ? "0" : ""}${secondsLeft}s<br>
            ⏳ Utilized Time: ${utilizedMinutes}m ${utilizedSeconds < 10 ? "0" : ""}${utilizedSeconds}s<br><br>
            `;
        document.getElementById("overlay").style.display = "flex";
        body.classList.add("freeze-screen");

        // Listen for the unfreeze shortcut (U)
        document.addEventListener("keydown", function(event) {
            if (event.key.toLowerCase() === "u") {
                body.classList.remove("freeze-screen");
                document.getElementById("overlay").style.display = "none";
            }
        }, { once: true }); // Ensure this listener runs only once
    }

    // Start Timer and Show MCQ
    window.onload = function () {
        startTimer();
        document.querySelector(".question").style.display = "block";
    };

    // Disable right-click
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();

    });

    // Disable keyboard shortcuts for inspecting elements and closing tab
    document.addEventListener("keydown", function (event) {
        if (
            event.ctrlKey && (event.key === "v" || event.key === "V") || // Ctrl + V
            event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "i") || // Ctrl + Shift + I
            event.ctrlKey && event.shiftKey && (event.key === "J" || event.key === "j") || // Ctrl + Shift + J
            event.ctrlKey && event.shiftKey && (event.key === "C" || event.key === "c") || // Ctrl + Shift + C
            event.key === "F12" || // F12
            event.ctrlKey && event.key === "w" || // Ctrl + W
            event.altKey && event.key === "F4" || // Alt + F4
            event.altKey && event.tabKey //Alt + Tab
            
        
        ) {
            event.preventDefault();
            //showAlert();
        }
    });

    // Prevent window from being closed, minimized, or maximized
    window.onbeforeunload = function () {
        return "⚠️ Are you sure you want to leave? Your progress will be lost!";
    };

    // Show custom alert modal
    function showAlert() {
        const alertModal = document.getElementById("customAlert");
        alertModal.style.display = "block";
    }

    // Disable window close, minimize, maximize using mouse (Works partially in most browsers)
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            alert("⛔ Switching or minimizing is not allowed!");
        }
    });