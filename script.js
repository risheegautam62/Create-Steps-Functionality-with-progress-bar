function showSection(id) {
  // Function to show the specified section

  $(".section").hide().addClass("hidden"); // Hide all elements with class 'section' and add 'hidden' class to them

  $("#" + id) // Remove the 'hidden' class from the section with the specified id and show it with a slide down animation
    .removeClass("hidden")
    .slideDown(800);

  $("html, body").animate(
    // Scroll the page to the section that has been revealed
    {
      scrollTop: $("#" + id).offset().top, // Move to the top position of the section
    },
    800 // Duration of the scroll in milliseconds
  );
}

$("#whole-bean").on("click", function () {
  // Event handler for clicking the #whole-bean element

  showSection("whole-bean-content"); // Show the section with id 'whole-bean-content'

  showSection("step2"); // Show the section with id 'step2'
});

$("#step2").on("click", function () {
  // Event handler for clicking the #step2 element

  showSection("step3"); // Show the section with id 'step3'
});

$("#step3").on("click", function () {
  // Event handler for clicking the #step3 element

  showSection("step4"); // Show the section with id 'step4'
});

$("#step4").on("click", function () {
  // Event handler for clicking the #step4 element

  showSection("step5"); // Show the section with id 'step5'
});

$(".option").on("click", function () {
  // Event handler for clicking an element with class 'option'

  const stepId = $(this).data("step"); // Get the step id from the data-step attribute of the clicked element

  $(".step").removeClass("active"); // Remove 'active' class from all elements with class 'step'

  $(`#${stepId}`).addClass("active"); // Add 'active' class to the element with the id equal to stepId
});

let formStepsNum = 0; // Initialize the variable to keep track of current form step

let progressStep = $(".progress-step"); // Store all elements with class 'progress-step' in a variable

let formSteps = $(".form-step"); // Store all elements with class 'form-step' in a variable

$("#next-button").on("click", function () {
  // Event handler for clicking the #next-button

  $("#outer-content").slideUp(800, function () {
    // Slide up the #outer-content and after it's hidden, slide down the #signup-form
    $("#signup-form").slideDown(800);
  });

  formStepsNum++; // Increment the form step number

  updateFormSteps(); // Update the form step UI

  updateProgressBar(); // Update the progress bar UI
});

progressStep.on("click", function () {
  // Event handler for clicking any progress-step element

  const clickedStepIndex = $(this).index(); // Get the index of the clicked progress step

  if (clickedStepIndex <= formStepsNum) {
    // If the clicked step is before or equal to the current form step

    formStepsNum = clickedStepIndex; // Update the form step number to the clicked step index

    updateFormSteps(); // Update the form step UI

    updateProgressBar(); // Update the progress bar UI

    showSection(`step${formStepsNum + 2}`); // Show the section corresponding to the form step (adding 2 since steps start from 2)

    if (formStepsNum === 0) {
      // If we're at the first step, show #outer-content and hide #signup-form
      $("#outer-content").show();
      $("#signup-form").hide();
    } else {
      $("#outer-content").hide(); // Otherwise, hide the #outer-content
    }
  }

  if (clickedStepIndex >= formStepsNum) {
    // If the clicked step is after or equal to the current form step

    formStepsNum = clickedStepIndex; // Update the form step number to the clicked step index

    updateFormSteps(); // Update the form step UI

    updateProgressBar(); // Update the progress bar UI

    showSection(`step${formStepsNum + 1}`); // Show the section corresponding to the form step (adding 1 since steps are one ahead)

    if (formStepsNum === 0) {
      // If we're at the first step, show #outer-content
      $("#outer-content").show();
    } else {
      $("#outer-content").hide(); // Otherwise, hide the #outer-content and show #signup-form
      $("#signup-form").show();
    }
  }
});

function handleBackNavigation() {} // Function to handle back navigation (not implemented)

function updateFormSteps() {
  // Function to update the active form step in the UI

  formSteps.each(function (index) {
    // Loop through each form step element

    $(this).toggleClass("active", index === formStepsNum); // Add the 'active' class to the current form step, remove it from others
  });

  if (formStepsNum === formSteps.length - 1) {
    // If the current form step is the last step, hide the next button
    $("#next-button").hide();
  } else {
    $("#next-button").show(); // Otherwise, show the next button
  }
}

function updateProgressBar() {
  // Function to update the progress bar based on the current form step

  progressStep.each(function (index) {
    // Loop through each progress step element

    $(this).toggleClass("active", index <= formStepsNum); // Add the 'active' class to all progress steps up to the current step
  });
}
