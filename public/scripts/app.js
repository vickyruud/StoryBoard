// Client facing scripts here


const clearArea = function(){
  document.getElementById('contents').value = "";
  document.getElementById('title').value = "";
}

const clearContribution = function(){
  document.getElementById('yourContribution').value = '';
}

const showContributionBox = function () {
  const contributionBox = $('.add-contribution-box');
  contributionBox.toggle('fast');
}

const hideContributionBox = function () {
  const contributionBox = $('.add-contribution-box');
  contributionBox.toggle('fast');
}

$(document).on('click', '#click-btn', function(event) {
  $.ajax({
      url : '/upvote',
      type : "post",
      contentType: 'application/json;charset=UTF-8',
      dataType: "json",
      data : JSON.stringify({'postid' : $('#click-btn').data('postid')}),
      success : function(response) {
          console.log(response);  
      },
      error : function(xhr) {
          console.log(xhr);
      }
  });
  event.preventDefault();
});





