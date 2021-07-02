    if ($("#demo").text() == "success") {
        $("#myalt").html(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Your images is successfully uploaded on database!</strong> Update the site to see changes.
  <button class="close" type="button" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
        `);
        $("#myalt").css('display', 'block');
        setTimeout(() => {
            $("#myalt").css('display', 'none'); 
        }, 5000);
    }else if(($("#demo").text() == "fail")){
        $("#myalt").html(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Sorry!</strong> Your image cannot be updated please try again later.
  <button class="close" type="button" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
        `);
        $("#myalt").css('display', 'block');
        setTimeout(() => {
            $("#myalt").css('display', 'none'); 
        }, 5000);
    }


    $('#inputGroupFile02').on('change',function(){
        //get the file name
        var fileName = $(this).val();
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
    })



    $("#btn1").on('click',function(){
        if ($("#btn1 > i").hasClass("fa-lock")) {
            $("#inp1").removeAttr('disabled');
            $("#btn1 > i").removeClass("fa-lock");
            $("#btn1 > i").addClass("fa-unlock-alt")
        } else {
            $("#inp1").attr('disabled','disabled');
            $("#btn1 > i").removeClass("fa-unlock-alt");
            $("#btn1 > i").addClass("fa-lock");
        }
    })

    $("#btn2").on('click',function(){
        if ($("#btn2 > i").hasClass("fa-lock")) {
            $("#inp2").removeAttr('disabled');
            $("#btn2 > i").removeClass("fa-lock");
            $("#btn2 > i").addClass("fa-unlock-alt")
        } else {
            $("#inp2").attr('disabled','disabled');
            $("#btn2 > i").removeClass("fa-unlock-alt");
            $("#btn2 > i").addClass("fa-lock");
        }
    })

    $("#btn3").on('click',function(){
        if ($("#btn3 > i").hasClass("fa-lock")) {
            $("#inp3").removeAttr('disabled');
            $("#btn3 > i").removeClass("fa-lock");
            $("#btn3 > i").addClass("fa-unlock-alt")
        } else {
            $("#inp3").attr('disabled','disabled');
            $("#btn3 > i").removeClass("fa-unlock-alt");
            $("#btn3 > i").addClass("fa-lock");
        }
    })
    $("#btn4").on('click',function(){
        if ($("#btn4 > i").hasClass("fa-lock")) {
            $("#inp4").removeAttr('disabled');
            $("#btn4 > i").removeClass("fa-lock");
            $("#btn4 > i").addClass("fa-unlock-alt")
        } else {
            $("#inp4").attr('disabled','disabled');
            $("#btn4 > i").removeClass("fa-unlock-alt");
            $("#btn4 > i").addClass("fa-lock");
        }
    })
    $("#btn5").on('click',function(){
        if ($("#btn5 > i").hasClass("fa-lock")) {
            $(".inp5").removeAttr('disabled');
            $("#btn5 > i").removeClass("fa-lock");
            $("#btn5 > i").addClass("fa-unlock-alt")
        } else {
            $(".inp5").attr('disabled','disabled');
            $("#btn5 > i").removeClass("fa-unlock-alt");
            $("#btn5 > i").addClass("fa-lock");
        }
    })

    $("#inputGroupSelect02").on('change',function () {
        a = $("#inputGroupSelect02").text();
        console.log(a)
    })
