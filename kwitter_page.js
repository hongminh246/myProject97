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
const app = initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    message = document.getElementById("messageInput").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: message,
        like: 0,
    });
    document.getElementById("messageInput").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("outputContainer").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebaseMessageId = childKey;
                messageData = childData;
                console.log(firebaseMessageId);
                console.log(messageData);
                var name = messageData['name'];
                message = messageData['message'];
                like = messageData['like'];
                nameTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                messageTag = "<h4 class='message_h4'>" + message + "</h4>";
                likeButton = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
                spanTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                output = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += output;
            }
        });
    });
}
getData();

function updateLike(messageId) {
    console.log("Click on like button-" + messageId);
    buttonId = messageId;
    likeNumber = document.getElementById(buttonId).value;
    updatedLikes = Number(likeNumber) + 1;
    console.log(updatedLikes);
    firebase.database().ref(room_name).child(messageId).update({
        like: updated_likes
    });
}

function user_logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter.html");
}