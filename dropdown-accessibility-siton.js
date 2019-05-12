const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;
const TAB_KEY_CODE = 9;
const SHIFT_KEY_CODE = 9;
const KEYCODE_MOVE_END = 35;
const KEYCODE_MOVE_HOME = 36;

$(".w-dropdown-toggle").each(function() {
  /* Keyboards Event Part 1 of 2 */
  /* Click events for the "dropdown" Parent */
  $(this).keydown(function(e) {
    /* IF enter click (toogle menu) */
    if (e.which == ENTER_KEY_CODE) {
      console.log("Enter pressed");
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
    /* IF click on TAB_KEY_CODE & menu not open ==> Open Menu */
    if (
      e.which == TAB_KEY_CODE &&
      !$("div.w-dropdown-toggle").hasClass("w--open")
    ) {
      console.log("TAB_KEY_CODE pressed");
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
    /* IF click on TAB_KEY_CODE + shiftKey & menu not open ==> Open Menu */
    if (e.shiftKey && e.which == TAB_KEY_CODE) {
      //shift was down when tab was pressed
      console.log("Shift + TAB_KEY_CODE pressed");
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
    }
    /* DOWN_ARROW_KEY_CODE ==> Open Menu */
    if (e.which == DOWN_ARROW_KEY_CODE) {
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
      $(".w-dropdown nav a:first-child").focus();
      console.log("DOWN_ARROW_KEY_CODE pressed");
    }
    //Esc KEY_CODE close menu
    if (
      e.which == ESCAPE_KEY_CODE &&
      $("div.w-dropdown-toggle").hasClass("w--open")
    ) {
      console.log("ESCAPE_KEY_CODE");
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
    $(this)
      .parent()
      .children()
      .last()
      .css("background-color", "orange");
    $(this)
      .parent()
      .children()
      .last()
      .focus();
  }
  /* Home Key --> If the listbox is displayed, moves focus to and selects the first option */
  if (e.which == KEYCODE_MOVE_HOME) {
    $(this)
      .parent()
      .children()
      .first()
      .css("background-color", "blue");
    $(this)
      .parent()
      .children()
      .first()
      .focus();
  }
  /* IF enter click (toogle menu) */
  if (e.which == ENTER_KEY_CODE) {
    console.log("dropdown-link Enter pressed");
    toggleAccessibilityDropdown(this);
    toggledAriaExpanded();
  }

  /* IF click on TAB_KEY_CODE + shiftKey & menu not open ==> Open Menu */
  if (e.shiftKey && e.which == TAB_KEY_CODE) {
    //shift was down when tab was pressed
    console.log("dropdown-link Shift + TAB_KEY_CODE pressed");
  }
  /* DOWN_ARROW_KEY_CODE + Not last child  ==> Open Menu */
  if (e.which == DOWN_ARROW_KEY_CODE && $(this).not(":last-child")) {
    $(this)
      .next()
      .focus();
    console.log("dropdown-link DOWN_ARROW_KEY_CODE pressed");
  }
  /* LAST CHILD ############################## */
  /* IF LAST CHILD click on TAB_KEY_CODE & menu not open ==> Open Menu */
  if ($(this).is(":last-child")) {
    if (e.which == TAB_KEY_CODE) {
      toggleAccessibilityDropdown(this);
      toggledAriaExpanded();
      console.log("LASTTTTTTT dropdown-link TAB_KEY_CODE pressed");
    }
    if (e.shiftKey && e.which == TAB_KEY_CODE) {
      //shift was down when tab was pressed
      $(this).prev().focus();
      toggledAriaExpanded();
      toggleAccessibilityDropdown(this);
      console.log("LASTTTTTTT dropdown-link Shift + TAB_KEY_CODE pressed");
    }
    /* DOWN_ARROW_KEY_CODE + last child  ==> close Menu + Focus next element */
    if (e.which == DOWN_ARROW_KEY_CODE) {
      $(this)
        .parent()
        .parent()
        .next()
        .focus();
      focusoutDropDown();
      console.log("Last child dropdown-link DOWN_ARROW_KEY_CODE pressed");
    }
  }
  /* If Not first nav element */
  if ($(this).not(":first-child")) {
    if (e.which == UP_ARROW_KEY_CODE) {
      $(this)
        .prev()
        .focus();
      console.log("dropdown-link not first child UP_ARROW_KEY_CODE pressed");
    }
  }
  /* IF first nav element */
  if ($(this).is(":first-child")) {
    /* First Child - UP_ARROW_KEY_CODE ==> Open Menu */
    if (e.which == UP_ARROW_KEY_CODE) {
      $(this)
        .closest(".w-dropdown")
        .prev()
        .focus();
      $(this)
        .closest("nav")
        .prev()
        .find(".dropdown")
        .focus();
      removeClassAccessibilityDropdown(this);
      toggledAriaExpanded();
      console.log("First child dropdown-link UP_ARROW_KEY_CODE pressed");
    }
  }

  //Esc KEY_CODE close menu
  if (
    e.which == ESCAPE_KEY_CODE &&
    $("div.w-dropdown-toggle").hasClass("w--open")
  ) {
removeClassAccessibilityDropdown();
    $(".w-dropdown-toggle").focus();
    toggledAriaExpanded();
    console.log("dropdown-link ESCAPE_KEY_CODE");
  }
});

function focusoutDropDown() {
  removeClassAccessibilityDropdown();
}
function toggleAccessibilityDropdown(obj) {
    $(obj).closest(".w-dropdown").find("div.w-dropdown-toggle").toggleClass("w--open");
    $(obj).closest(".w-dropdown").find("nav.w-dropdown-list").toggleClass("w--open");
}

function removeClassAccessibilityDropdown() {
    $("div.w-dropdown-toggle").removeClass("w--open");
    $("nav.w-dropdown-list").removeClass("w--open");
}


/* ARIA Controls */
$(".w-dropdown").attr("aria-haspopup", "true");
var toggled = false;
function toggledAriaExpanded() {
  toggled = !toggled;
  $(".w-dropdown").attr("aria-expanded", toggled);
}

/* Add tab index */
$(".w-dropdown-toggle").attr("tabindex", "0");
$("w-dropdown a").each(function() {
  $(this).attr("tabindex", "0");
});
