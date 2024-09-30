function showSection(id) {
  $(".section").hide().addClass("hidden");
  $("#" + id)
    .removeClass("hidden")
    .slideDown(800);
  $("html, body").animate(
    {
      scrollTop: $("#" + id).offset().top,
    },
    600
  );
}

$("#whole-bean").on("click", function () {
  showSection("whole-bean-content");
  showSection("step2");
});

$("#step2").on("click", function () {
  showSection("step3");
});

$("#step3").on("click", function () {
  showSection("step4");
});

$("#step4").on("click", function () {
  showSection("step5");
  $("#next-button").show();
});

$(".option").on("click", function () {
  const stepId = $(this).data("step");
  $(".step").removeClass("active");
  $(`#${stepId}`).addClass("active");
});

let formStepsNum = 0;
let progressStep = $(".progress-step");
let formSteps = $(".form-step");

$("#next-button").on("click", function () {
  $("#outer-content").slideUp(0, function () {
    $("#signup-form").slideDown(0);
  });

  formStepsNum++;
  updateFormSteps();
  updateProgressBar();
});

progressStep.on("click", function () {
  const clickedStepIndex = $(this).index();

  if (clickedStepIndex <= formStepsNum) {
    formStepsNum = clickedStepIndex;
    updateFormSteps();
    updateProgressBar();
    showSection(`step${formStepsNum + 2}`);

    if (formStepsNum === 0) {
      $("#outer-content").show();
      $("#signup-form").hide();
    } else {
      $("#outer-content").hide();
    }
  }

  if (clickedStepIndex >= formStepsNum) {
    formStepsNum = clickedStepIndex;
    updateFormSteps();
    updateProgressBar();
    showSection(`step${formStepsNum + 1}`);

    if (formStepsNum === 0) {
      $("#outer-content").show();
    } else {
      $("#outer-content").hide();
      $("#signup-form").show();
    }
  }
});

function updateFormSteps() {
  formSteps.each(function (index) {
    $(this).toggleClass("active", index === formStepsNum);
  });
  if (formStepsNum === formSteps.length - 1) {
    $("#next-button").hide();
  } else {
    $("#next-button").show();
  }
}

function updateProgressBar() {
  progressStep.each(function (index) {
    if (index < formStepsNum) {
      $(this).addClass("complete").removeClass("active");
    } else if (index === formStepsNum) {
      $(this).addClass("active").removeClass("complete");
    } else {
      $(this).removeClass("active complete");
    }
  });
}
$("#next-button").hide();
