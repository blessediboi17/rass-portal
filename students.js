// Connect to your RASS database
const supabaseUrl = 'https://thhrfrxvaxezcoutpzby.supabase.co';
const supabaseKey = 'thhrfrxvaxezcoutpzby'; // Use the same key from your app.js
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function viewMyGrades() {
    const name = document.getElementById('student-query').value;
    const resultDisplay = document.getElementById('result-display');
    
    // Show a "Searching..." message
    resultDisplay.innerHTML = "<p>Searching RASS records...</p>";

    let { data: results, error } = await _supabase
        .from('grades')
        .select('scores, term')
        .eq('student_name', name);

    if (error) {
        resultDisplay.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
        return;
    }

    if (results && results.length > 0) {
        const scores = results[0].scores;
        
        // This builds a nice looking report card for the student
        resultDisplay.innerHTML = `
            <div class="report-card">
                <h3>Official Results: ${name}</h3>
                <p>Term: ${results[0].term}</p>
                <hr>
                <div class="score-grid">
                    <p><strong>Math:</strong> ${scores.math}</p>
                    <p><strong>English:</strong> ${scores.english}</p>
                    <p><strong>Gen. Science:</strong> ${scores.gen_science}</p>
                    <p><strong>Bible:</strong> ${scores.bible}</p>
                    <p><strong>Reading:</strong> ${scores.reading}</p>
                    <p><strong>P.E.:</strong> ${scores.pe}</p>
                </div>
                <button onclick="window.print()">Print Report Card</button>
            </div>
        `;
    } else {
        resultDisplay.innerHTML = "<p>No results found. Please check the spelling of your name.</p>";
    }
}
