//function to get the data of the api with key 179
  var getDataFromAPI = function (){
    $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
    dataType: 'json',
    success: function (response) {
      response.tasks.forEach(function(index){
        console.log(index.content);
        var newContent = index.content;
        $(".2nd-row").after('<div class="row my-2 align-items-center">'+
        '<div class="col-3 form-check mx-2">'+
        '<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">'+'</div>'+
        '<div class="col-9 ml-3">'+
        newContent +
        '</div>'+
        '</div>'
        );
      })
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
    if(!$('.form-control').val()){
      $(".add-html").disabled = true;
      $(".add-item").html("Input");
    }
  });

});

      