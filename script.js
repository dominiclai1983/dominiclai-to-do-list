//function to get the data of the api with key 179
var getDataFromAPI = function(){
  $.ajax({
  type: 'GET',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=179',
  dataType: 'json',
  success: function (response, textStatus) {
    console.log(response);
    // response is a parsed JavaScript object instead of raw JSON
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

$(document).ready(function(){

  getDataFromAPI();

  $(".add-html").disabled = true;


  $(".form-control").on('input', function(){
    $(".add-html").disabled = false;
    $(".add-item").html("Add");
  });

  $(".form-control").blur(function(){
    $(".add-html").disabled = true;
    $(".add-item").html("Input");
  });
});