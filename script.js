function showSection(id) {
  // Hide all sections first
  $('.section').hide().addClass('hidden'); // Hide all sections
  $('#' + id).removeClass('hidden').slideDown(600); // Show the specific section
  $('html, body').animate({
    scrollTop: $('#' + id).offset().top
  }, 800); 
}

// Click event for whole-bean
$('#whole-bean').on('click', function () {
  showSection('whole-bean-content');
  showSection('step2');
});

// Step clicks
$('#step2').on('click', function () {
  showSection('step3');
});
$('#step3').on('click', function () {
  showSection('step4');
});
$('#step4').on('click', function () {
  showSection('step5');
});

// Option click
$('.option').on('click', function () {
  const stepId = $(this).data('step');
  $('.step').removeClass('active');
  $(`#${stepId}`).addClass('active');
});

// Progress steps management
let formStepsNum = 0;
let progressStep = $('.progress-step');
let formSteps = $('.form-step');

$('#next-button').on('click', function () {
  // Only hide outer content when going to the next section
  $('#outer-content').slideUp(800, function () {
    $('#signup-form').slideDown(800);
  });
  
  formStepsNum++;
  updateFormSteps();
  updateProgressBar();
});

// Make progress steps clickable
progressStep.on('click', function () {
  const clickedStepIndex = $(this).index(); // Get the index of the clicked progress step

  // Allow navigation only to current step or forward steps
  if (clickedStepIndex <= formStepsNum) {
    formStepsNum = clickedStepIndex; // Update to the clicked step index
    updateFormSteps();
    updateProgressBar();

    // Show the corresponding section based on clicked step
    showSection(`step${formStepsNum + 2}`); // Adjust for correct step

    // Control the visibility of #outer-content
    if (formStepsNum === 0) {
      $('#outer-content').show();
      $('#signup-form').hide();
       // Show outer content on the first step
    } else {
      $('#outer-content').hide(); // Hide outer content on subsequent steps
    }
  }
});

// Function to handle back navigation correctly
function handleBackNavigation() {
  // Reset any relevant states or variables if necessary
  // Example: Reset input values, clear selections, etc.
}

function updateFormSteps() {
  formSteps.each(function (index) {
    $(this).toggleClass('active', index === formStepsNum);
  });

  // Check if it's the last step
  if (formStepsNum === formSteps.length - 1) {
    $('#next-button').hide();  // Hide "Next" button at last step
  } else {
    $('#next-button').show();  // Show "Next" button if not at last step
  }
}

function updateProgressBar() {
  progressStep.each(function (index) {
    $(this).toggleClass('active', index <= formStepsNum);
  });
}
