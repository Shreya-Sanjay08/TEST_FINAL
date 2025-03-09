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

// Fetch student attendance data
async function fetchStudentAttendance() {
    const studentId = "student1"; // Replace with dynamic user authentication later
    const doc = await db.collection("attendance").doc(studentId).get();
    if (doc.exists) {
        const data = doc.data();
        document.getElementById("attendance-percentage").textContent = data.percentage + "%";
        if (data.percentage < 75) {
            document.getElementById("warning-message").textContent = "⚠ Low Attendance! Please be cautious.";
        }
    }
}

// Fetch all students for teacher dashboard
async function fetchAllStudents() {
    const studentsTable = document.getElementById("student-data");
    const snapshot = await db.collection("attendance").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        const row = `<tr><td>${data.name}</td><td>${data.percentage}%</td></tr>`;
        studentsTable.innerHTML += row;
    });
}

// Call functions based on page
if (window.location.pathname.includes("student.html")) {
    fetchStudentAttendance();
} else if (window.location.pathname.includes("teacher.html")) {
    fetchAllStudents();
}
