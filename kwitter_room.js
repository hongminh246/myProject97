const firebaseConfig = {
    apiKey: "AIzaSyAJ5YeCzQ07c1byJWzWdcIlc_g9Ad7ZDO0",
    authDomain: "kwitter-d5b38.firebaseapp.com",
    databaseURL: "https://kwitter-d5b38-default-rtdb.firebaseio.com",
    projectId: "kwitter-d5b38",
    storageBucket: "kwitter-d5b38.appspot.com",
    messagingSenderId: "901957470204",
    appId: "1:901957470204:web:f08b3cf01d925cd43bd479",
    measurementId: "G-JXVMZDXZXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("usernameLabel").innerHTML = user_name;

function addRoom() {
    room_name = document.getElementById("roomnameInput").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "Adding room name"
    });
    localStorage.setItem("room_name", room_name);
    redirectToRoomName();
}

function redirectToRoomName(room_name) {
    console.log(room_name);
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("roomnameList").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("room name = " + room_name);
            row = "<div class='roomnameContainer' id='" + room_name + "Container' onclick='redirectToRoomName(this.id)'>#" + room_name + "</div> <hr>";
            document.getElementById("roomnameList").innerHTML = row;
            //End code
        });
    });
}
getData();

function user_logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter.html");
}