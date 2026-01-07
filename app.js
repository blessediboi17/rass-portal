// 1. Supabase Configuration
const supabaseUrl = 'https://thhrfrxvaxezcoutpzby.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaHJmcnh2YXhlemNvdXRwemJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NjY2NTAsImV4cCI6MjA4MzM0MjY1MH0.9oYLT4E5_lvDn8TSO2L1T2JPG3YLQPuh2tzAYYZW6qI';

// Initialize the Supabase Client
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Set the Locking Deadline (Feb 1st, 2026)
const DEADLINE = new Date('2026-02-01T23:59:59');

async function teacherLogin() {
    const teacherID = document.getElementById('teacher-id').value.trim();
    const password = document.getElementById('password').value.trim();
    const statusMsg = document.getElementById('status-msg');
    const now = new Date();

    // Clear previous messages
    statusMsg.innerHTML = "";

    // A. Check if the Portal is Locked
    if (now > DEADLINE) {
        statusMsg.innerHTML = "<span style='color:red;'>Portal Locked: The grading deadline has passed.</span>";
        return;
    }

    // B. Basic Validation
    if (!teacherID || !password) {
        statusMsg.innerHTML = "<span style='color:orange;'>Please enter both ID and Password.</span>";
        return;
    }

    // C. Attempt Login with Supabase
    // We use the ID as the email prefix (e.g., T101@rass.com)
    statusMsg.innerHTML = "Authenticating...";

    const { data, error } = await _supabase.auth.signInWithPassword({
        email: `${teacherID}@rass.com`,
        password: password, // This will be the same as the ID based on your request
    });

    if (error) {
        statusMsg.innerHTML = `<span style='color:red;'>Login Failed: ${error.message}</span>`;
        console.error("Login Error:", error.message);
    } else {
        statusMsg.innerHTML = "<span style='color:green;'>Success! Redirecting...</span>";
        
        // Save teacher session locally
        localStorage.setItem('currentTeacher', teacherID);
        
        // Redirect to your grading entry page
        // Make sure you have a file named 'grades.html' in your folder
        setTimeout(() => {
            window.location.href = "grades.html";
        }, 1000);
    }
                          }
