const firebaseConfig = {
    apiKey: "AIzaSyC6onFdorEpwVGvdqWQ6p5tQo1u_nLkRGg",
    authDomain: "attendance-41062.firebaseapp.com",
    databaseURL: "https://attendance-41062-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "attendance-41062",
    storageBucket: "attendance-41062.firebasestorage.app",
    messagingSenderId: "774004446167",
    appId: "1:774004446167:web:31cba8253d0c72445e3192",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 Student Lookup
async function fetchStudentAttendance() {
    const uid = document.getElementById("student-uid").value.trim();
    if (!uid) {
        alert("Please enter a valid UID.");
        return;
    }

    const doc = await db.collection("attendance").doc(uid).get();
    if (doc.exists) {
        const data = doc.data();
        document.getElementById("student-details").innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Attendance Percentage:</strong> ${data.percentage}%</p>
            <p><strong>Last Attendance:</strong> ${data.last_attendance}</p>
            ${data.percentage < 75 ? "<p class='warning'>⚠ Low Attendance! Please be cautious.</p>" : ""}
        `;
    } else {
        alert("UID not found. Please try again.");
    }
}

// 🔹 Teacher Authentication
function checkTeacherPassword() {
    const password = prompt("Enter the teacher's password:");
    const correctPassword = "teacher123"; // Change this to your actual password
    if (password !== correctPassword) {
        alert("Incorrect password! Redirecting to home.");
        window.location.href = "index.html";
    } else {
        fetchAllStudents();
    }
}

// 🔹 Fetch All Students for Teacher
async function fetchAllStudents() {
    const studentsTable = document.getElementById("student-data");
    studentsTable.innerHTML = ""; // Clear existing data

    const snapshot = await db.collection("attendance").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        studentsTable.innerHTML += `<tr><td>${data.name}</td><td>${data.percentage}%</td></tr>`;
    });
}

