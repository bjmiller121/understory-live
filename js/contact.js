document.addEventListener('DOMContentLoaded', function() {
  // Contact form submit handling
  var $contactForm = document.querySelector('#contact-form'),
      $contactButton = document.querySelector('#contact-form-submit'),
      $formMessage = document.querySelector('.form-message');

  if ($contactForm !== undefined) {
    $contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      $contactButton.classList.add('button--progress');
      $contactButton.value = "Sending...";
      $contactButton.disabled = true;

      var formData = new FormData($contactForm);
      var plainFormData = Object.fromEntries(formData.entries());
      var request = new XMLHttpRequest();

      request.open("POST", "https://us-central1-understory-d236f.cloudfunctions.net/contactForm");
      request.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            // Successful form submit.
            console.info(this.response);
            $contactButton.classList.remove('button--progress');
            $contactButton.classList.add('button--success');
            $contactButton.value = "Message Sent!";
            $formMessage.classList.add('form-message--success');
            $formMessage.innerHTML = "Thanks for reaching out to Understory Woodworking. I'll get back to you shortly.";
          } else if (this.status == 500 || this.status == 422) {
            // Either invalid values or email send error.
            console.error(this.response);
            $contactButton.classList.remove('button--progress');
            $contactButton.classList.add('button--fail');
            $contactButton.value = "Send Failed";
            $formMessage.classList.add('form-message--fail');
            $formMessage.innerHTML = "Oh no! Something went wrong while sending your message. If this error continues, please use the email address listed in the FAQs below to reach me.";
          }
        }
      };
      request.send(JSON.stringify(plainFormData));

    });
  }
});
