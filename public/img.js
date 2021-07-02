$(function () {

    $("#imgform").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var fd = new FormData();
        var files = $('#exampleFormControlFile1')[0].files;
        
        // Check file selected or not
        if(files.length > 0 ){
           fd.append('file',files[0]);

           $.ajax({
              url: '/uploadpimg',
              type: 'post',
              data: fd,
              contentType: false,
              processData: false,
              success: function(response){
                console.log("hi")
              },
           });
        }else{
           alert("Please select a file.");
        }
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});