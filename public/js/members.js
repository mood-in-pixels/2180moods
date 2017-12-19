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
    // startSlide(event);
  });
  // Setup Moods for Carousel Function
  // -------------------------------------------------------------------------------------
  $.get("/api/mood_data").then(function(data) {
    for (var i = 0; i < data.length; i++) {
      var newItem = $("<div>")
      newItem.addClass("item")
      var newButton = $("<button>")
      newButton.addClass("pixel");
      newButton.css({
        "background": "radial-gradient(" + data[i].color_one + ", " + data[i].color_two + ")"
      });
      // newButton.attr("role","submit");
      // newButton.attr("type","submit");
      newButton.attr("data_mood_id", data[i].id);
      newButton.attr("data-mood", data[i].mood_description);
      newButton.attr("data-color", data[i].color_one);
      // newButton.attr("id","blue");
      var newSpan = $("<span>");
      newSpan.addClass("valence");
      newSpan.text(data[i].mood_description);
      newButton.append(newSpan);
      newItem.append(newButton);
      $(".carousel").append(newItem)
    }
    autoplay();
  });
  // Setup Swipe / Carousel Function
  // -------------------------------------------------------------------------------------
  function autoplay() {
    $('.autoplay').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      swipe: true,
      swipeToSlide: true,
      dots: false,
      arrows: false
    });
  }
  // Mouse events *hover (to reveal mood/valence description to users); *click to log mood
  // -------------------------------------------------------------------------------------
  $(document).on("mouseover", ".pixel", function() {
    $(this).find('.valence').fadeIn(500);
    $(this).find('.valence').fadeOut(1000);
  });
  $(document).on("click", ".pixel", function() {
    // event.preventDefault();
    var date = moment().format("MM/DD/YYYY");
    var mood_id = $(this).attr("data-mood");
    var color = $(this).attr("data-color");
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
  // function logDailyMood(user_id, mood_id, color, date, DimMoodId) {
  //   $.post("/api/dailymoods", {
  //     user_id: user_id,
  //     mood_id: mood_id,
  //     color: color,
  //     mood_date: date,
  //     DimMoodId: DimMoodId
  //   }).then(function(dbMood) {
  //       console.log(dbMood);
  //       res.json(dbMood);
  //     });
  // };
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
  // *
  // *** we need to add a GET route for pulling is all user moods to populate the calendar
  //  // GET route for getting all of the posts
  //   app.get("/api/mood_data/:id", function(req, res) {
  //     db.Mood.findAll({
  //       where: {
  //         userId: this.user_id;
  //       }
  //     }).then(function(dbMood) {
  //       res.json(dbMood);
  //     });
  //   });
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
  function calendar(year) {
    console.log("creating calendar")
    for (var monthCount = 0; monthCount < 13; monthCount++) {
      var newList = $("<ul>");
      newList.addClass("main");
      for (var dayCount = 0; dayCount < 32; dayCount++) {
        if (dayCount === 0 && monthCount === 0) {
          var newListItem = $("<li>")
          newListItem.addClass("cEmpty")
          // newListItem.addClass("cLabel");
          newList.append(newListItem)
        } else if (monthCount === 0) {
          var newListItem = $("<li>");
          newListItem.addClass("cEmpty");
          var labelDiv = $("<div>")
          labelDiv.addClass("cLabel");
          labelDiv.text(dayCount);
          newListItem.append(labelDiv);
          newList.append(newListItem);
        } else if (dayCount === 0) {
          var monthName = moment(monthCount, "M").format("MMM")
          var newListItem = $("<li>");
          newListItem.addClass("cEmpty");
          var labelDiv = $("<div>");
          labelDiv.addClass("cLabel");
          labelDiv.text(monthName.substring(0, 1));
          newListItem.append(labelDiv);
          newList.append(newListItem)
        } else {
          var newListItem = $("<li>")
          var dateDiv = $("<div>")
          var date = String(monthCount) + "/" + String(dayCount) + "/" + year
          var dateFormat = "M/D/YYYY"
          var convertedDate = moment(date, dateFormat)
          var dayOfTheWeek = convertedDate.format("d") // sunday =0
          if (!convertedDate.isValid()) {
            newListItem.addClass("cEmpty")
          } else {
            dateDiv.addClass("cDate")
            dateDiv.addClass(date)
            dateDiv.text(convertedDate.format("MM/DD/YY"));
            newListItem.append(dateDiv)
            var location = $("<div>")
            location.addClass("cLocation")
            location.text("Chicago, IL")
            newListItem.append(location)
            var mood = Math.floor(Math.random() * (9 - 1)) + 1
            newListItem.addClass("type-" + mood)
            newListItem.addClass("cat-" + dayOfTheWeek)
          }
          newList.append(newListItem)
        }
      }
      $(".wrapper").append(newList)
    }
  }
  calendar(2017);
  $(window).on("orientationchange", function(event) {
    if (window.innerHeight > window.innerWidth) {
      $(".row").addClass("hidden")
      $(".carousel").addClass("hidden")
      $(".wrapper").removeClass("hidden")
    } else {
      $(".wrapper").addClass("hidden")
      $(".row").removeClass("hidden")
      $(".carousel").removeClass("hidden")
    }
  });
});