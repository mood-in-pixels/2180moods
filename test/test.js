// // USE NIGHTMARE TO ENSURE OUR LOGIN AND MEMBER PAGES ARE WORKING :)
// // ================================================================
var Nightmare = require("nightmare");

// STORY: As a developer nerd, I want to be able to take courses on web tech.
new Nightmare({ show: true })
  // Visit login page
  .goto("http://mood-in-pixels-2180m.herokuapp.com/")

  .screenshot("main.png")
  .click("a[href='/login']")
  // Enter username.
  .type("#username-input", "username")
  // Enter password.
  .type("#username-password", "password")
  // Take a screenshot of the login form.
  .screenshot("login.png")
  // Click login button. Always check if you've done this where necessary!
  // It's easy to forget.
  .click("#login")
  // Click course catalog link.
  .click("a[href='/members']")
  // Take a screenshot and save it to the current directory.
  .screenshot("daily.png")
  // End test
  .end()
  // Execute commands
  .then(function() {
    console.log("Done!");
  })
  // Catch errors
  .catch(function(err) {
    console.log(err);
  });
