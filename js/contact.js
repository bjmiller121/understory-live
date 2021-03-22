document.addEventListener('DOMContentLoaded', function() {
  // Contact form submit handling
  var $contactForm = document.querySelector('#contact-form'),
      $contactButton = document.querySelector('#contact-form-submit'),
      $contactResetButton = document.querySelector('#contact-form-reset'),
      $formMessage = document.querySelector('.form-message');

  if ($contactForm !== undefined) {
    $contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      $contactButton.innerHTML = "Sending...";
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
            $contactButton.innerHTML = "Message Sent!";
            $formMessage.classList.add('form-message--success');
            $formMessage.innerHTML = "Thanks for reaching out to Understory Woodworking. I'll get back to you shortly.";
            pa.track({name: 'Contact Form - Message sent'});
          } else if (this.status == 500 || this.status == 422) {
            // Either invalid values or email send error.
            console.error(this.response);
            $contactButton.innerHTML = "Sending Failed...";
            $formMessage.classList.add('form-message--fail');
            $formMessage.innerHTML = "Oh no! Something went wrong while sending your message. If this error continues, please use the email address listed in the FAQ below to reach me.";
            pa.track({name: 'Contact Form - Sending Failed'});
          }

          $contactResetButton.classList.remove('hide');
        }
      };

      request.send(JSON.stringify(plainFormData));
    });

    $contactResetButton.addEventListener('click', (event) => {
      event.preventDefault();
      $contactForm.reset();
      $contactButton.disabled = false;
      $contactButton.innerHTML = "Send";
      $formMessage.innerHTML = "";
      $formMessage.classList.remove('form-message--fail');
      $formMessage.classList.remove('form-message--success');
      $contactResetButton.classList.add('hide');
    });
  }
});
