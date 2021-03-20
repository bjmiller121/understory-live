// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCCg_k7sG31vxDTd1pmMe1lISfG1dV8Bcc',
  authDomain: 'understory-d236f.firebaseapp.com',
  projectId: 'understory-d236f'
});

var db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
  // Contact form submit handling
  var $contactForm = document.querySelector('#contact-form'),
      $contactSubmit = document.querySelector('#contact-form-submit');

  if ($contactForm !== undefined) {
    $contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      $contactSubmit.classList.add('button--progress');
      $contactSubmit.value = "Sending...";
      $contactSubmit.disabled = true;

      var formData = new FormData($contactForm);
      var request = new XMLHttpRequest();

      // console.log(formData);

      request.open("POST", "https://us-central1-understory-d236f.cloudfunctions.net/contactForm");
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Successful form submit.
          $contactSubmit.classList.remove('button--progress');
          $contactSubmit.classList.add('button--success');
          $contactSubmit.value = "Message Sent!";
          console.log("Sent");
        } else {
          console.error("Error Submitting Contact Form");
          $contactSubmit.classList.remove('button--progress');
          $contactSubmit.classList.add('button--fail');
          $contactSubmit.value = "Send Failed";
          // alert("Appologies, but there has been an error sending your message. Please try again or send an email directly with the address found at the bottom of this page.");
        }
      };
      // request.setRequestHeader("Content-Type", "application/json");
      request.send(formData);



      // // Push data to Firebase
      // db.collection("contact").add({
      //   name: document.querySelector('#name').value,
      //   email: document.querySelector('#email').value,
      //   subject: document.querySelector('#subject').value,
      //   message: document.querySelector('#message').value,
      //   timestamp: new Date()
      // })
      // .then(() => {
      //   // Successful form submit.
      //   $contactSubmit.disabled = true;
      //   $contactSubmit.value = "Message Sent!";
      //   console.log("Sent");
      // })
      // .catch((error) => {
      //   console.error("Error writing document: ", error);
      //   alert("Appologies, but there has been an error sending your message. Please try again or send an email directly with the address found at the bottom of this page.");
      // });
    });
  }
});
