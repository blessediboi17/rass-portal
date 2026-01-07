// 1. Setup Connection (Get these from your Supabase Settings > API)
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. The Deadline Check
const DEADLINE = new Date('2026-02-01T23:59:59');

async function handleLogin() {
    const email = document.getElementById('teacher-id').value;
    const password = document.getElementById('password').value;
    const now = new Date();

    // Check if Portal is Locked first
    if (now > DEADLINE) {
        alert("The grading window has closed. Access denied.");
        return;
    }

    // Attempt to Login
    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        alert("Welcome to RASS Portal!");
        // Redirect to the grading sheet page
        window.location.href = "grades.html"; 
    }
        }
