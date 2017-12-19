 ///////////////////////////////////////////////////////////////////////////
 //////////////         Adding shading on hover   //////////////////////////
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
  console.log("here")
  for (var dayCount = 0; dayCount < 32; dayCount++) {
    var newList = $("<ul>");
    newList.addClass("main");
    for (var monthCount = 0; monthCount < 13; monthCount++) {
      if (dayCount === 0 && monthCount === 0) {
        var newListItem = $("<li>")
        newListItem.addClass("empty")
        newList.append(newListItem)
      } else if (monthCount === 0) {
        var newListItem = $("<li>");
        newListItem.addClass("empty");
        newListItem.addClass("label");
        newListItem.text(dayCount);
        newList.append(newListItem)
      } else if (dayCount === 0) {
        var monthName = moment(monthCount, "M").format("MMM")
        var newListItem = $("<li>");
        newListItem.addClass("empty");
        newListItem.addClass("label");
        newListItem.text(monthName.substring(0, 1));
        newList.append(newListItem)
      } else {
        var newListItem = $("<li>")
        var dateDiv = $("<div>")
        var date = String(monthCount) + "/" + String(dayCount) + "/" + year
        var dateFormat = "M/D/YYYY"
        var convertedDate = moment(date, dateFormat)
        var dayOfTheWeek = convertedDate.format("d") // sunday =0
        if (!convertedDate.isValid()) {
          newListItem.addClass("empty")
        } else {
          dateDiv.addClass("date")
          dateDiv.addClass(date)
          dateDiv.text(convertedDate.format("MM/DD/YY"));
          newListItem.append(dateDiv)
          var location = $("<div>")
          location.addClass("location")
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