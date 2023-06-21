$(document).ready(function() {
  // --- our code goes here ---
  console.log('"composer-char-counter.js is loaded"');

  $('.new-tweet textarea#input-text').on('input', function() {
    // Event handler code will go here
    const inputLength = $(this).val().length;
    const remainingChars = 140 - inputLength;
    const counter = $(this)
    .closest(".new-tweet")
    .find(".counter");
    counter.text(remainingChars);

    console.log($(this)
    .closest(".new-tweet")
    .find(".counter")
    );

    console.log(('.counter'));

    if (remainingChars < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
      // counter.addClass("valid");
    }
    // console.log(inputLength);
    // console.log(this);
    console.log(counter);
    console.log(remainingChars);
  });
});
