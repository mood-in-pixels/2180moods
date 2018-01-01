// called at memebers.html
// **** members.js ****
// =====================================================================================
// Document ready | jQuery shorthand w/ 'use strict' to prevent bad code
// -------------------------------------------------------------------------------------
"use strict";
$(function() {
  // creating global variables that will be populated with authentification check
  var user;
  var user_id;

// authentification request to database
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
    user = data.username
    user_id = data.id



    // request to server to get data from database.
    //Data that is returned contains all user mood entries.
    $.get("/api/dailymoods", {user_id: user_id}).then(function(data) {
      var mood_dates = []
      for (var i = 0; i <   data.length; i++) {
          mood_dates.push(moment(data[i].mood_date,"YYYY-MM-DD").format("MM/DD/YY"))
      }
      // after retrieving data calendar is generated dynamicaly with all user data. default calendar year is 2017
      calendar(2017, data, mood_dates);

// after retrieving user data, system checks if user has a selection for today. if selection was made, system hides section that allows user to select again.
      if($.inArray(moment().format("MM/DD/YY"),mood_dates)>-1) {
        $("#mood_picker_daily").addClass ("hidden")
        $("#feelingQuestion").addClass ("hidden")
      }
    });

// there are two sets of mood pickers, one is presented at the begining if user did not make a selection yet,
// second one is in a form of modal when user clicks on empty cell in calendar
// while database retrieval is happening, this section adds attribute "date" and assigns today's date to it. This helps when submitting data to server.

    $(".container .picker").attr("date", moment().format("YYYY-MM-DD"))

// once calendar selection is made this section adds "date" attribute with value that was selected on calendar to modal selector
    $(document).on("click", "a", function() {
        console.log($(this).attr("date"))
        $(".modal-content .picker").attr("date", $(this).attr("date"))
      });
  });



// when any mood is selected in mood picker this section initiates api request to register items into database
  $(document).on("click", ".picker", function() {
    event.preventDefault();
    var date = $(this).attr("date");
    var mood_id = $(this).attr("mood_id");
    var color = "null" //$(this).attr("data-color");
    var DimMoodId = $(this).attr("data_mood_id")
    var userData = {
      mood_id: mood_id,
      color: color,
      mood_date: date,
      DimMoodId: DimMoodId
    };
   $('#shortModal').modal('hide');

// after data is captured, api request is submitted via below function
   logDailyMood(user_id, userData.mood_id, userData.color, userData.mood_date, userData.DimMoodId);
  });




// function that posts data into database.
  function logDailyMood(user_id, mood_id, color, date, DimMoodId) {
    $.post("/api/dailymoods", {
      user_id: user_id,
      mood_id: mood_id,
      color: color,
      mood_date: date,
      DimMoodId: DimMoodId
    }).then(function() {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////
  //////////////         Adding shading on hover for calendar   //////////////////////////




  // $(function() {
  //   $('li[class^="cat-"]').mouseover(function() {
  //     var currentClass = $(this).attr('class').split(' ')[0];
  //     if (currentClass != 'empty') {
  //       $('.main > li').addClass('deactivate');
  //       $('.' + currentClass).removeClass('deactivate');
  //     }
  //   });
  //   $('li[class^="type-"]').mouseover(function() {
  //     var currentClass = $(this).attr('class').split(' ')[0];
  //     if (currentClass != 'empty') {
  //       $('.main > li').addClass('deactivate');
  //       $('.' + currentClass).removeClass('deactivate');
  //     }
  //   });
  //   $('.main > li').mouseout(function() {
  //     var currentClass = $(this).attr('class').split(' ')[0];
  //     $('.main > li').removeClass('deactivate');
  //   });
  // });


  ////////////////////////////////////////////////////////////////////////////////////
  //////////////         Dynamicaly creating calendar table   ////////////////////////

  // this section dynamicaly creates calendar and underlying divs.



  function calendar(year, data,mood_dates) {

    console.log("creating calendar")
    for (var dayCount = 0; dayCount < 32; dayCount++) { /// first it loops through all 31 days in calendar plus title of each day (rows). Item 0 represents label row
      var newList = $("<ul>");  // for each row we create an unordered list
      newList.addClass("main"); // each list has "main" as a class (for formating)
      for (var monthCount = 0; monthCount < 13; monthCount++) { /// secondly, it loops through 12 months for given year (columns). Item 0 represents label column
      // multiple if statements split code into specific sections: invalid data, labels (for months and days), mood data.
        // if month is 0 and day is 0 then we create empty cell
        if (dayCount === 0 && monthCount === 0) {
          var newListItem = $("<li>")
          newListItem.addClass("no-scale")
          newList.append(newListItem)
        }
        // if month is = 0 then this will be label column for days.
        else if (monthCount === 0) {
          var newListItem = $("<li>");
          newListItem.addClass("no-scale");
          var labelDiv = $("<div>")
          labelDiv.addClass("cLabel");
          labelDiv.text(dayCount);        /// we assign value of this cell with dayCount variable
          newListItem.append(labelDiv);
          newList.append(newListItem);
        }
        // if dayCount = 0 then this will be row for column headings
        else if (dayCount === 0) {
          var monthName = moment(monthCount, "M").format("MMM")
          var newListItem = $("<li>");
          newListItem.addClass("no-scale");
          var labelDiv = $("<div>");
          labelDiv.addClass("cLabel");
          labelDiv.text(monthName.substring(0, 1)); /// we assign value of this cell with monthCount variable. using moment we extract first letter of each month
          newListItem.append(labelDiv);
          newList.append(newListItem)
        }
        // if month and day is more than 0 then we create data fields
        else {
          var newListItem = $("<li>")
          var dateDiv = $("<div>")
          var date = String(monthCount) + "/" + String(dayCount) + "/" + year // this combines monthCount and dayCount to create an actual date. We use external parameter of year for this too
          var dateFormat = "M/D/YYYY"
          var convertedDate = moment(date, dateFormat)
          var convertedDate_2 = moment(date, dateFormat).format("MM/DD/YY") // converting date to specific format for database data consistency
          var dayOfTheWeek = convertedDate.format("d") // sunday =0

              // if created date is not valid (like february 31st) then an empty cell is created
              if (!convertedDate.isValid()) {
                newListItem.addClass("no-scale")
              }

              // here we start comparison between calendar and records in database. if record does not exist (.inArray function)
              // then result will be -1 and we will create empty cell with select mood link for user to update mood.
              else if ($.inArray(convertedDate_2,mood_dates)=== -1) {
                newListItem.addClass("cEmpty")
                newListItem.addClass("no-data")
                newListItem.attr("date", convertedDate_2)

                var mood_selector = $("<a>");
                mood_selector.addClass("cLocation");
                mood_selector.addClass("edit");
                mood_selector.attr("data-toggle","modal")
                mood_selector.attr("href","#shortModal")
                mood_selector.attr("date", convertedDate_2)
                mood_selector.text("Select mood");
                // mood_selector.attr("date", convertedDate_2)
                newListItem.append(mood_selector);

                // if celendar matches record in database then we extract information from database and create list item with specific colors
              } else if ($.inArray(convertedDate_2,mood_dates)> -1){
                var index = $.inArray(convertedDate_2,mood_dates);  // extracts index of record matching in database.
                dateDiv.addClass("cDate");
                dateDiv.addClass(date);
                dateDiv.text(convertedDate_2);
                newListItem.append(dateDiv);

                var location = $("<div>");
                location.addClass("cLocation");
                location.text(data[index].mood_id);
                newListItem.append(location);

                var mood = data[index].Dim_mood.id;
                newListItem.addClass("type-" + mood);
                newListItem.addClass("cat-" + dayOfTheWeek);
                newListItem.addClass("data");
                newListItem.css({
                    "background": "radial-gradient(" + data[index].Dim_mood.color_one + ", " + data[index].Dim_mood.color_two + ")"
                  });
              }
          newList.append(newListItem)
        }
      }
      $(".wrapper").append(newList)

    }
  }

  // $(window).on("orientationchange", function(event) {
  //   if (window.innerHeight > window.innerWidth) {
  //     $(".row").addClass("hidden")
  //     $(".carousel").addClass("hidden")
  //     $(".wrapper").removeClass("hidden")
  //   } else {
  //     $(".wrapper").addClass("hidden")
  //     $(".row").removeClass("hidden")
  //     $(".carousel").removeClass("hidden")
  //   }
  // });


});
