var app;
var db;
// Your web app's Firebase configuration

document.addEventListener('DOMContentLoaded', function () {
  // add log out listener
  var firebaseConfig = {
    apiKey: "AIzaSyCKsBatmVIaQDAOWvSQzxJz3d-rXgidExQ",
    authDomain: "cse134b--hw5.firebaseapp.com",
    databaseURL: "https://cse134b--hw5.firebaseio.com",
    projectId: "cse134b--hw5",
    storageBucket: "cse134b--hw5.appspot.com",
    messagingSenderId: "240224246910",
    appId: "1:240224246910:web:bcece04db6e498f77d8c2f",
    measurementId: "G-QLWL50YWCE"
  };
  // Initialize Firebase
  // const firebaseAuth = firebase.initializeApp(firebaseConfig);
  // console.log(firebaseAuth);
  // firebase.analytics();
  app = firebase.app();

  console.log('user', firebase.auth().currentUser);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log('user info', displayName, email, emailVerified,
        photoURL, isAnonymous, uid, providerData);

      // document.getElementById("posts").style.display = 'block';
      // document.getElementById("loginForm").style.display = 'none';

      $('#loginForm').hide();
      $('#posts').show().trigger('show');


      console.log('testing inserting to firebase firestore')
      // testDBInsert();
    } else {

    }
  });

  //form method
  postButton.addEventListener('click', async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value || '';
    console.log('email', email);
    const password = document.getElementById("password").value ||
      '';


    firebaseLogin(email, password);
    // firebaseLogin('michellezan@gmail.com', 'michellezan');

  });


  function firebaseLogin(email, password) {
    // Create a form that allows existing users to sign in using their email address and password. When a user completes the form
    firebase.auth().signInWithEmailAndPassword(email, password).catch(
      function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        document.getElementById("errorMsg").innerHTML = errorMessage;
        $('.toast').toast('show');
      });
  }
});
