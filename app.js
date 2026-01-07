async function teacherLogin() {
    const teacherID = document.getElementById('teacher-id').value; // e.g., "T101"
    const now = new Date();

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
