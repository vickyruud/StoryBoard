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

const showError = function () {
  const emptyError = $("#empty-contribution");
  emptyError.slideDown('fast');
}

const hideError = function () {
  const emptyError = $("#empty-contribution");
  emptyError.slideUp('fast');
}


// $(document).ready(function (){

//   const loadStory = function() {$.ajax({
//     url: '/story/:id',
//     method: "GET",
//     dataType: "json",
//     success: () => {
//       console.log('itworks');
//     },
//     error: (error) => {
//       console.log(error);
//     }

//   })}

//   const formContribution = $('#contribution-form');
//   const contributionTextArea = $('#yourContribution');

//   formContribution.on('submit', function(event) {
//     event.preventDefault();
//     const serializedData = $(this).serialize()
//     const emptyError = $("#empty-contribution");
//     if (serializedData.length < 18) {
//       showError();
//     } else {
//       $.post('/story/:id', serializedData)
//       .then(() => {
//         loadStory();
//       })
      
//       emptyError.slideUp('fast');
//   }
//   })


// })





