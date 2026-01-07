async function teacherLogin() {
    const teacherID = document.getElementById('teacher-id').value; // e.g., "T101"
    const now = new Date();

    // Replace the placeholders with your actual details
const supabaseUrl = 'https://thhrfrxvaxezcoutpzby.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaHJmcnh2YXhlemNvdXRwemJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NjY2NTAsImV4cCI6MjA4MzM0MjY1MH0.9oYLT4E5_lvDn8TSO2L1T2JPG3YLQPuh2tzAYYZW6qI';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
   
    // 1. Check Deadline First
    if (now > DEADLINE) {
        alert("The portal is locked. The deadline has passed.");
        return;
    }

    // 2. Format the ID to match the Supabase email format
    const fakeEmail = `${teacherID}@rass.com`;
    const password = teacherID; // ID is also the password

    // 3. Attempt Login
    const { data, error } = await _supabase.auth.signInWithPassword({
        email: fakeEmail,
        password: password,
    });

    if (error) {
        alert("Login failed. Check your Teacher ID.");
    } else {
        alert("Welcome, Teacher " + teacherID);
        // Save ID to local storage so the system knows who is grading
        localStorage.setItem('currentTeacher', teacherID);
        window.location.href = "grades.html"; 
    }
    }
