//function to get the data of the api with key 1
  var getDataFromAPI = function (){
    $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=201',
    dataType: 'json',
    success: function (response) {
      response.tasks.forEach(function(index){
        var newContent = index.content;
        $(".2nd-row").after('<div class="row my-2 d-flex align-items-center">'+
        '<div class="form-group form-check ml-3 col-1">'+
        '<input type="checkbox" class="form-check-input" id="exampleCheck1">'+'</div>'+
        '<div class="col-7 no-gutter text-left mr-auto">'+
        newContent +
        '</div>'+
        '<div class="col-2 justify-content-end mr-2">'+
        '<button type="button" class="btn btn-secondary btn-sm cancel"' + 'id="id-' + index.id + '"' + '>Delete</button>'+
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

var getInputFromField = function(input){
      $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=201',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: input
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        console.log(response.task.id);
  
        $(".2nd-row").after('<div class="row my-2 d-flex align-items-center">'+
        '<div class="form-group form-check ml-3 col-1">'+
        '<input type="checkbox" class="form-check-input" id="exampleCheck1">'+'</div>'+
        '<div class="col-7 no-gutter text-left mr-auto">'+
        input +
        '</div>'+
        '<div class="col-2 justify-content-end mr-2">'+
        '<button type="button" class="btn btn-secondary btn-sm cancel"' + 'id="id-' + response.task.id + '"' + '>Delete</button>'+
        '</div>'+
        '</div>'
        );
        
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
  });
}

var printJustNewRow = function(input){

}

var deleteItemOnAPI = function(deleteID){
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ deleteID +'?api_key=201',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).ready(function(){

  getDataFromAPI();

  $(".form-control").on('input', function(){
      if($(this).val()){
        $('button.add-item').removeAttr('disabled');
      };
  })

  $("#button-addon1").on('click', function(){
      var input = $('.form-control').val();
      console.log(input);
      getInputFromField(input);
  })

  $(document).on('click', '.btn.cancel', function(event){
    $(this).closest('.row').remove();
    var deleteID = $(this).attr("id").slice(3,9).trim();
    console.log(deleteID);
    deleteItemOnAPI(deleteID);
  });

});

      