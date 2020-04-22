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
  else if ( $(e.target).hasClass('button_sel_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_sel_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_sel_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_rename_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_rename_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_rename_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_column') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_column")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_column");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_row_col') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_row_col")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_row_col");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_read_cell_data') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_read_cell_data")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_read_cell_data");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_copy_data') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_data")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_data");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_v_lookup') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_v_lookup")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_v_lookup");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_search_value') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_search_value")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_search_value");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_change_header') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_change_header")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_change_header");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_formula') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_formula")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_formula");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_row') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_row")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_row");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_col_datatype') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_col_datatype")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_col_datatype");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_excel_to_csv') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_excel_to_csv")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_excel_to_csv");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_create_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_open_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_open_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_open_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_rename_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_rename_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_rename_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_copy_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_excel");
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