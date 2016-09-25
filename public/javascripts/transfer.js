/**
 * Created by shailesh on 24/9/16.
 */
jQuery(document).ready(function ($){
  $('.upload-btn').on('click', function (){
    $('#upload-input').click();
  });

  var files;
  $('#upload-input').on('change', function () {
    files =  $(this).get(0).files;
    /*var parentDiv = $(".upload-btn").closest("div");
    for (var i in files) {
      if (files.hasOwnProperty(i)) {

      }
    }*/
  });
  $('#uploadFile').on('click', function (event){
    $(this).button("loading");
    if (files.length) {
      var formData = new FormData();

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log(file);
        // add the files to formData object for the data payload
        formData.append(file.name, file);
      }
    }
    formData.append("friendEmail", $("#friends-email").val());
    formData.append("userEmail", $("#user-email").val());
    formData.append("message", $("#message").val());
    event.stopPropagation();
    event.preventDefault();
    event.returnValue = false;

    $.ajax({
      type: 'POST',
      url: 'https://localhost:8050/player',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      cache: false, // Don't process the files
      success: function(response){
        console.log("Response =>>>>>>", response);

      },
      error: function(error){
        console.log("Errorr =>>>>>>>>>", error);
      }
    }).always(function(){
      console.log("gooot");
      $(".send-btn").button('reset');
    });

  })
});