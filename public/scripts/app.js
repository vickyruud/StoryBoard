// Client facing scripts here
const clearArea = function(){
  document.getElementById('contents').value = "";
  document.getElementById('title').value = "";
}

const showContributionBox = function () {
  const contributionBox = $('#your-contribution');
  contributionBox.slideToggle('fast');
}

$(document).ready(() => {
  $("#cbtn").click(function (e) {
    event.preventDefault();
    clearArea();

  });

  // $("#add-contribution").click(function (e) {
  //   event.preventDefault();
  //   showContributionBox();

  // });
});
