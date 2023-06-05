//call to jquery to run only when document completely loads
$(function () {
  //generates time blocks for business hours
  function generateTimeBlocks() {
    //uses day.js library for current time
    var currentHour = dayjs().hour();
    //for loop for business hours
    for (var hour = 9; hour <= 17; hour++) {
      // Create elements for the time block, hour, description, save button, and save icon
      var timeBlockEl = $('<div>').addClass('row time-block');
      var hourEl = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
      var descriptionEl = $('<textarea>').addClass('col-8 col-md-10 description');
      var saveBtnEl = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      var saveIconEl = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      // Set the hour text
      hourEl.text(dayjs().hour(hour).format('hA'));

      // Set the time-block id
      timeBlockEl.attr('id', 'hour-' + hour);

      // class to show past, present, or future time
      if (hour < currentHour) {
        timeBlockEl.addClass('past');
      } else if (hour === currentHour) {
        timeBlockEl.addClass('present');
      } else {
        timeBlockEl.addClass('future');
      }

      // loads saved user input from local storage
      var savedDescription = localStorage.getItem('hour-' + hour);
      if (savedDescription) {
        descriptionEl.val(savedDescription);
      }

      // appends saveIconEl to saveBtnEl
      saveBtnEl.append(saveIconEl);
      timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);

      // append timeBlockEl to timeBlocks
      $('#timeBlocks').append(timeBlockEl);
    }
  }

  // click event listener for save button
  $(document).on('click', '.saveBtn', function () {
    var hourId = $(this).parent().attr('id');
    var description = $(this).siblings('.description').val();
    localStorage.setItem(hourId, description);
  });

  // shows the current date
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // generates time blocks when page loads
  generateTimeBlocks();
});
