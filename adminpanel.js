function EntrarApp(){
    const urlBacon = "http://127.0.0.1:8000/login";
    var formData = {
        UserId: 0,
        user :  $("#userlogin").val(),
        password : $("#passwordlogin").val(),
        nombre : "",
        apellido : "",
        rol :  ""
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        data: JSON.stringify(formData),
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            if(res.length > 0){
                localStorage.setItem("id", res[0].UserId);
                if(res[0].rol == "Admin"){
                    window.location.href = "admin.html";  
                }
            }
            else{
                $("#mensaje-loginerror").css({"opacity":"100"})
                $("#mensaje-loginerror").css({"font-size":"70%"})
            }

        },
        error: function(err) {
            alert(err);
        }
      });
       // Get the modal
var modal = document.getElementById("modalRegistro");

// Get the button that opens the modal
var btn = document.getElementById("btn-registro");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
}