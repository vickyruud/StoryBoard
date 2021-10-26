// Client facing scripts here
const clearArea = function(){
  document.getElementById('contents').value = "";
  document.getElementById('title').value = "";
}
$(document).ready(() => {
  $("#cbtn").click(function (e) {
    event.preventDefault();
    clearArea();

  });
});
