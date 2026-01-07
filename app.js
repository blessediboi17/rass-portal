// Set your deadline here (Year, Month [0-11], Day, Hour, Minute)
const DEADLINE = new Date('2026-02-01T23:59:59'); 

function checkLockStatus() {
    const now = new Date();
    const statusMsg = document.getElementById('status-msg');
    const loginForm = document.getElementById('login-form');

    if (now > DEADLINE) {
        // Portal is LOCKED
        loginForm.style.display = 'none';
        statusMsg.innerHTML = `
            <div class="locked-box">
                <h3 style="color: red;">Portal Locked</h3>
                <p>The grading deadline (Feb 1, 2026) has passed.</p>
                <p>Please contact the RASS Administration office for late submissions.</p>
            </div>
        `;
    } else {
        // Portal is OPEN
        alert("Accessing Grading System... (System Open)");
        // Here we would redirect to the grade entry page
    }
}
