/**
 * Created by shailesh on 24/9/16.
 */
jQuery(document).ready(function ($){
  $('.upload-btn').on('click', function (){
    /*var html = "<div class='panel-body' style='height: 58px; overflow-y: auto'><ul class='added-files'></ul></div>";
    $(this).parent().parent().prepend(html);*/
    $('#upload-input').click();
  });

  var fileNameValueObj = {},
    nameList = [];
  $('#upload-input').on('change', function () {
    var files =  $(this).get(0).files;
    $(".fileupload-exists").css("display", "inline");
    $('h2').empty();
    for (var i in files) {
      if (files.hasOwnProperty(i) && !fileNameValueObj[files[i].name]) {
        var list = "<li class='temp-upload-file' data-filename="+files[i].name+">" +
          "<p class='name'><span id='file-name' style='display: inline-block; max-width: 223px'>"+files[i].name+"</span></p>" +
            "<span class='remove-file'><a href='#'>x</a></span>"+
          "</li>";
        $("#added-files").prepend(list);
        fileNameValueObj[files[i].name] = files[i];
        nameList.push(files[i].name);
        $("#scrollDiv").scrollTop($('#scrollDiv')[0].scrollHeight);
      }
    }
  });

  $("#added-files").on("click", "a", function (e) {
    var fileAttribute = $(".temp-upload-file").attr("data-filename");
    
    $('.temp-upload-file[data-filename="'+ fileAttribute +'"]').remove();
    delete fileNameValueObj[fileAttribute];
    
    if (Object.keys(fileNameValueObj).length == 0) {
      $("h2", "#scrollDiv").text("Send upto 2GB")
    }
  });

  $('#uploadFile').on('click', function (event){
    if (files.length && $("#friends-email").val() && $("#user-email").val()) {
      $(this).button("loading");
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
      url: 'http://localhost:8050/player',
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