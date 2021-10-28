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






