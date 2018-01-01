// called at memebers.html
// **** members.js ****
// =====================================================================================
// Document ready | jQuery shorthand w/ 'use strict' to prevent bad code
// -------------------------------------------------------------------------------------
"use strict";
$(function() {
  var user;
  var user_id;
  $.get("/api/user_data").then(function(data) {
    console.log("here!")
    $(".member-name").text(data.username);
    user = data.username
    user_id = data.id

    $(".container .picker").attr("date", moment().format("YYYY-MM-DD"))

    $(document).on("click", "a", function() {
        console.log($(this).attr("date"))
        $(".modal-content .picker").attr("date", $(this).attr("date"))
      });


    $.get("/api/dailymoods", {user_id: user_id}).then(function(data) {
      var mood_dates = []
      for (var i = 0; i <   data.length; i++) {
          mood_dates.push(moment(data[i].mood_date,"YYYY-MM-DD").format("MM/DD/YY"))
      }

      if($.inArray(moment().format("MM/DD/YY"),mood_dates)>-1) {
        $("#mood_picker_daily").addClass ("hidden")
        $("#feelingQuestion").addClass ("hidden")
      }
      calendar(2017, data, mood_dates);
    });
  });




  $(document).on("click", ".picker", function() {
    // event.preventDefault();
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
    // When the user clicks a pixel, we run the logDailyMood function to enter mood/color into db
   logDailyMood(user_id, userData.mood_id, userData.color, userData.mood_date, userData.DimMoodId);
  });





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




  $(function() {
    $('li[class^="cat-"]').mouseover(function() {
      var currentClass = $(this).attr('class').split(' ')[0];
      if (currentClass != 'empty') {
        $('.main > li').addClass('deactivate');
        $('.' + currentClass).removeClass('deactivate');
      }
    });
    $('li[class^="type-"]').mouseover(function() {
      var currentClass = $(this).attr('class').split(' ')[0];
      if (currentClass != 'empty') {
        $('.main > li').addClass('deactivate');
        $('.' + currentClass).removeClass('deactivate');
      }
    });
    $('.main > li').mouseout(function() {
      var currentClass = $(this).attr('class').split(' ')[0];
      $('.main > li').removeClass('deactivate');
    });
  });


  ////////////////////////////////////////////////////////////////////////////////////
  //////////////         Dynamicaly creating calendar table   ////////////////////////
  function calendar(year, data,mood_dates) {

    console.log("creating calendar")
    for (var dayCount = 0; dayCount < 32; dayCount++) {
      var newList = $("<ul>");
      newList.addClass("main");
      for (var monthCount = 0; monthCount < 13; monthCount++) {
        if (dayCount === 0 && monthCount === 0) {
          var newListItem = $("<li>")
          newListItem.addClass("no-scale")
          newList.append(newListItem)
        }
        else if (monthCount === 0) {
          var newListItem = $("<li>");
          newListItem.addClass("no-scale");
          var labelDiv = $("<div>")
          labelDiv.addClass("cLabel");
          labelDiv.text(dayCount);
          newListItem.append(labelDiv);
          newList.append(newListItem);
        }
        else if (dayCount === 0) {
          var monthName = moment(monthCount, "M").format("MMM")
          var newListItem = $("<li>");
          newListItem.addClass("no-scale");
          var labelDiv = $("<div>");
          labelDiv.addClass("cLabel");
          labelDiv.text(monthName.substring(0, 1));
          newListItem.append(labelDiv);
          newList.append(newListItem)
        }
        else {
          var newListItem = $("<li>")
          var dateDiv = $("<div>")
          var date = String(monthCount) + "/" + String(dayCount) + "/" + year
          var dateFormat = "M/D/YYYY"
          var convertedDate = moment(date, dateFormat)
          var convertedDate_2 = moment(date, dateFormat).format("MM/DD/YY")
          var dayOfTheWeek = convertedDate.format("d") // sunday =0
              if (!convertedDate.isValid()) {
                newListItem.addClass("no-scale")
              }
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


              } else if ($.inArray(convertedDate_2,mood_dates)> -1){
                var index = $.inArray(convertedDate_2,mood_dates);
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
