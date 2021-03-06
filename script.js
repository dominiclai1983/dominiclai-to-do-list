
//function to get the data of the api with key 102
  var getDataFromAPI = function (){
    $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=201',
    dataType: 'json',
    success: function (response) {
    $("#list-area").empty();
    var active = $('#active-button').hasClass('active');
    var completed = $('#completed-button').hasClass('active');
    var all = $('#all-button').hasClass('active');
    if(active){
      response.tasks.forEach(function(index){
        if(index.completed === false){
          var newContent = index.content;
            $("#list-area").append('<div class="row my-2 d-flex align-items-center">'+
            '<div class="form-group form-check ml-3 col-1">'+
            '<input type="checkbox" class="form-check-input check" id="check-' + index.id + '">' + '</div>'+
            '<div class="col-7 no-gutter text-left mr-auto">'+
            newContent +
            '</div>'+
            '<div class="col-2 justify-content-end mr-2">'+
            '<button type="button" class="btn btn-secondary btn-sm cancel"' + 'id="id-' + index.id + '"' + '>Delete</button>'+
            '</div>'+
            '</div>'
            );
          };
        });
      }else if(completed){
      response.tasks.forEach(function(index){
        if(index.completed === true){
          var newContent = index.content;
            $("#list-area").append('<div class="row my-2 d-flex align-items-center">'+
            '<div class="ml-3 col-1" class="form-check-input check" id="check-' + index.id + '">✅</div>'+
            '<div class="col-7 no-gutter text-left mr-auto">'+
            newContent +
            '</div>'+
            '<div class="col-2 justify-content-end mr-2">'+
             '<button type="button" class="btn btn-secondary btn-sm cancel"' + 'id="id-' + index.id + '"' + '>Delete</button>'+
            '</div>'+
            '</div>'
            );
          };
        });
      }if(all){
      response.tasks.forEach(function(index){
        var newContent = index.content;
        var task;
        if(index.completed === true){
          task = '&#128154;';
        }else if(index.completed === false){
          task = '&#129335;';
        }
            $("#list-area").append('<div class="row my-2 d-flex align-items-center">'+
            '<div class="ml-3 col-1" class="form-check-input check" id="check-' + index.id + '">' + task + '</div>'+
            '<div class="col-7 no-gutter text-left mr-auto">'+
            newContent +
            '</div>'+
            '<div class="col-2 justify-content-end mr-2">'+
            '<button type="button" class="btn btn-secondary btn-sm cancel"' + 'id="id-' + index.id + '"' + '>Delete</button>'+
            '</div>'+
            '</div>'
          );
        });
      }  
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}


//function to post the new task to API
var postInputFromField = function(input){
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
        var active = $('#active-button').hasClass('active');
        if(response.task.completed === false && active){
          $(".2nd-row").after('<div class="row entry my-2 d-flex align-items-center">'+
          '<div class="form-group form-check ml-3 col-1">'+
          '<input type="checkbox" class="form-check-input check" id="check-' + response.task.id + '">' + '</div>'+
          '<div class="col-7 no-gutter text-left mr-auto">'+
          input +
          '</div>'+
          '<div class="col-2 justify-content-end mr-2">'+
          '<button type="button" class="btn btn-secondary btn-sm cancel"' + 'id="id-' + response.task.id + '"' + '>Delete</button>'+
          '</div>'+
          '</div>'
          );
        //response.task.id use as identifyer for each entry
        }
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
  });
}

//function to control the completed task
var completedItemOnAPI = function(completedID){
  $.ajax({
  type: 'PUT',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ completedID +'/mark_complete?api_key=201',
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify({
    task: {
      completed : 'true',
    }
  }),
  success: function (response, textStatus) {
    console.log(response);
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

//function to control deleting a task
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

  //input button active only if input field has vallue
  $(".form-control").on('input', function(){
      if($(this).val()){
        $('button.add-item').prop('disabled', false);
        console.log($(this).val().length)
      };
      if(!($(this).val())){
        $('button.add-item').prop('disabled', true);
      }
  })

  //function to control which button is active after click 
  $('.button-length').on('click', function(){
    $('.button-length').removeClass('active');
    $(this).addClass('active');
    getDataFromAPI();
  })


  //when click input button on input field, add new task on API
  $("#button-addon1").on('click', function(){
      var input = $('.form-control').val();
      postInputFromField(input);
      $('.form-control').val('');
  })

  //input field would listen to the "enter" event
  $(".form-control").on('keypress', function(key){
      if(key.which == 13){
      var input = $(this).val();
      postInputFromField(input);
      $(this).val('');
    }
  })

  //if delete button click, remove the entry on API
  $(document).on('click', '.btn.cancel', function(event){
    $(this).closest('.row').remove();
    //extract task id to use for deletion 
    var deleteID = $(this).attr("id").slice(3,9).trim();
    console.log(deleteID);
    deleteItemOnAPI(deleteID);
  });

  $(document).on('click', '.form-check-input.check', function(event){
    if($('input[type="checkbox"].check')){
      //extract task id to use for completion
      var completedID = $(this).attr("id").slice(6,11).trim();
      console.log(completedID);
      completedItemOnAPI(completedID);
      $(this).closest('.row').delay(800).remove();
    }

  })

    getDataFromAPI();

});
