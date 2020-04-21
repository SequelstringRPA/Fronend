// Popups_Starts
// var modalBtns = [...document.querySelectorAll(".button_roundoff_column")];
// modalBtns.forEach(function(btn){
//   btn.onclick = function() {
//     console.log("Clicked");
//     var modal = document.querySelector("#modalOne_roundoff_column")
//     modal.style.display = "block";
//   }
// });

var modalBtns = [...document.querySelectorAll(".button_filter")];
$(document).on('DOMNodeInserted', function(e) {
  if ( $(e.target).hasClass('button_filter') ) {
      //element with .MyClass was inserted.
      console.log("working");
    modalBtns = [...document.querySelectorAll(".button_filter")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_filter");
    modal.style.display = "block";
  }
});
  }
   else if ( $(e.target).hasClass('button_maxcolumn') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_maxcolumn")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_maxcolumn");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_maxrow') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_maxrow")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_maxrow");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_vlookupsamesheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_vlookupsamesheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_vlookupsamesheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_copy_data_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_data_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_data_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_roundoff_column') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_roundoff_column")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_roundoff_column");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_remove_duplicate') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_remove_duplicate")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_remove_duplicate");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_remove_duplicate') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_remove_duplicate")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_remove_duplicate");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_password') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_password")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_password");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_sum_if') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_sum_if")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_sum_if");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_pivot_table') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_pivot_table")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_pivot_table");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_paste_special') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_paste_special")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_paste_special");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_move_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_move_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_move_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_create_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_sheet");
    modal.style.display = "block";
  }
  });
  }


  else if ( $(e.target).hasClass('button_create_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_pdf");
    modal.style.display = "block";
  }
  });
  }
});

// Close_Button
var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}