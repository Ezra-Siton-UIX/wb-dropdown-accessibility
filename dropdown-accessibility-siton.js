const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;
const TAB_KEY_CODE = 9;
const SHIFT_KEY_CODE = 16;
const KEYCODE_MOVE_END = 35;
const KEYCODE_MOVE_HOME = 36;

$(".w-dropdown-toggle").each(function() {
  /* Keyboards Event Part 1 of 2 */
  /* Click events for the "dropdown toggle button" */
  $(this).keydown(function(e) {
    /* IF enter click (toogle menu) */
    if (e.which == ENTER_KEY_CODE) {
      console.log("1");
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
    /* IF click on TAB_KEY_CODE & menu not open ==> Open Menu */
    if (e.which == TAB_KEY_CODE && !$("div.w-dropdown-toggle").hasClass("w--open")) {
      console.log("2");
      toggledAriaExpanded(this);
      toggleAccessibilityDropdown(this);
      $(this).next(".w--open").find(".w-dropdown-link").first().css("background-color", "yellow");
    }
    /* IF click on TAB_KEY_CODE + shiftKey & menu not open ==> Open Menu */
    if (e.shiftKey && e.which == TAB_KEY_CODE && !$("div.w-dropdown-toggle").hasClass("w--open")  ) {
      console.log("3");
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
    /* DOWN_ARROW_KEY_CODE ==> Open Menu */
    if (e.which == DOWN_ARROW_KEY_CODE) {
      console.log("4");
      $(this)
        .closest(".w-dropdown")
        .find("div.w-dropdown-toggle")
        .addClass("w--open");
      $(this)
        .closest(".w-dropdown")
        .find("nav.w-dropdown-list")
        .addClass("w--open");
      toggledAriaExpanded();
      $(".w-dropdown nav a:first-child").focus();
    }
    //Esc KEY_CODE close menu
    if (
      e.which == ESCAPE_KEY_CODE &&
      $("div.w-dropdown-toggle").hasClass("w--open")
    ) {
      console.log("5");
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
  });
}); /*end for each */

/*########################################################################
                      Keyboards Event Part 2 of 2 
########################################################################## */
/* Click events for the ".w-dropdown-link" child */
$(".w-dropdown-link").keydown(function(e) {

  /* End Key --> If the listbox is displayed, moves focus to and selects the last option */
  if (e.which == KEYCODE_MOVE_END) {
    console.log("6");
    $(this)
      .closest("nav")
      .children()
      .last()
      .focus();
  }
  /* Home Key --> If the listbox is displayed, moves focus to and selects the first option */
  if (e.which == KEYCODE_MOVE_HOME) {
    console.log("7");
    $(this)
      .closest("nav")
      .children()
      .first()
      .focus();
  }
  /* IF enter click (toogle menu) */
  if (e.which == ENTER_KEY_CODE) {
    console.log("8");
    toggleAccessibilityDropdown(this);
    toggledAriaExpanded();
  }
  /* DOWN_ARROW_KEY_CODE + Not last child  ==> Open Menu */
  if (e.which == DOWN_ARROW_KEY_CODE && $(this).not(":last-child")) {
    console.log("9");
    $(this)
      .next()
      .focus();
  }
  /* LAST CHILD ############################## */
  /* IF LAST CHILD click on TAB_KEY_CODE & menu not open ==> Open Menu */
  if ($(this).is(":last-child")) { 
    if (e.which == TAB_KEY_CODE) {
      console.log("10");
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
    if (e.shiftKey && e.which == TAB_KEY_CODE) {
      //shift was down when tab was pressed
      console.log("11");
      $(this)
        .prev()
        .focus();
      toggledAriaExpanded();
      toggleAccessibilityDropdown(this);
    }
    /* DOWN_ARROW_KEY_CODE + last child  ==> close Menu + Focus next element */
    if (e.which == DOWN_ARROW_KEY_CODE) {
      console.log("12");
      $(this)
        .closest(".w-dropdown")
        .next()
        .focus();
      toggleAccessibilityDropdown(this);
    }
  }
  /* If Not first nav element */
  if($(this).not(":first-child")) {
    console.log("13 - not first child");
    if(e.which == UP_ARROW_KEY_CODE) {
      $(this)
        .prev()
        .focus();
    }
  }
  
  /* IF first nav element */
  if ($(this).is(":first-child")) {
      /* nested */
      if (e.shiftKey && e.which == TAB_KEY_CODE) {
      console.log("322222222222");
        toggledAriaExpanded();
        toggleAccessibilityDropdown(this);
      }
    /* First Child - UP_ARROW_KEY_CODE ==> Open Menu */
    if (e.which == UP_ARROW_KEY_CODE) {
      console.log("14");
      $(this).closest(".w-dropdown-list").prev().focus();
      removeClassAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
  }
  //Esc KEY_CODE close menu
  if (
    e.which == ESCAPE_KEY_CODE &&
    $("div.w-dropdown-toggle").hasClass("w--open")
  ) {
    console.log("15");
    toggleAccessibilityDropdown(this);
    $(this)
      .closest(".w-dropdown")
      .find(".w-dropdown-toggle")
      .focus();
    toggledAriaExpanded();
  }
});

/* Functions */
function toggleAccessibilityDropdown(obj) {
  $(obj)
    .closest(".w-dropdown")
    .find("div.w-dropdown-toggle")
    .toggleClass("w--open");
  $(obj)
    .closest(".w-dropdown")
    .find("nav.w-dropdown-list")
    .toggleClass("w--open");
}

function removeClassAccessibilityDropdown(obj) {
  $(obj)
    .closest("div.w-dropdown-toggle")
    .removeClass("w--open");
  $(obj)
    .closest("nav.w-dropdown-list")
    .removeClass("w--open");
}

/* ARIA Controls */
$(".w-dropdown").attr("aria-haspopup", "true");
var toggled = false;

function toggledAriaExpanded() {
  toggled = !toggled;
  $(".w-dropdown").attr("aria-expanded", toggled);
}

/* Add tab index */
$(".w-dropdown-toggle").each(function() {
  $(this).attr("tabindex", "0");
});

$("a.w-dropdown-link").each(function() {
  $(this).attr("tabindex", "0");
  $(this).css("outline","initial");
});

/* fix bug (webflow add tabIndex=-1) - should be 0 */
var slides = document.getElementsByClassName("w-dropdown-link");
setTimeout(function(){ 
  for(var i = 0; i < slides.length; i++)
    {
       slides.item(i).setAttribute("tabindex", "0");  
    }
}, 1000);
