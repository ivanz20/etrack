

var searchInput = 'search_input';

$(document).ready(function () {


    var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['geocode'],
        componentRestrictions: {
            country: "MX"
        }
    });
	
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var near_place = autocomplete.getPlace();
        document.getElementById('cordlat').val = near_place.geometry.location.lat();
        document.getElementById('cordalt').val = near_place.geometry.location.lng();
        document.getElementById('cpcliente').val = near_place.address_components[6].short_name;        
    });
});

function startTime() {
    const today = new Date();
    document.getElementById('span-clock').innerHTML =  today
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

// Get the modal
var modal = document.getElementById("modalRegistro");

// Get the button that opens the modal
var btn = document.getElementById("btn-registro");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


function EntrarApp(){
    const urlBacon = "https://etrackservice.onrender.com/login";
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
       
}

function Registrarse(){
    nombre = document.getElementById("nameuser").value;
    apellido = document.getElementById("apellidouser").value;
    user =  document.getElementById("UserInput").value;
    password = document.getElementById("passworduser").value;
    rol = document.getElementById("select-rol").value;

    var formData = {
        UserId: 0,
        user :  $("#UserInput").val(),
        password : $("#passworduser").val(),
        nombre : $("#nameuser").val(),
        apellido : $("#apellidouser").val(),
        rol :  $("#select-rol").val()
    }
    
    const urlBacon = "https://etrackservice.onrender.com/registrar";

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        data: JSON.stringify(formData),
        cache: false,
        success: function(result) {
            alert('Usuario Registrado Con Exito!');
        },
        error: function(err) {
            alert(err);
        }
    });
}

btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  

function btnproductos(){
    
    document.getElementById("productos-btn").classList.add('active');
    document.getElementById("clientes-btn").classList.remove('active');
    document.getElementById("ventas-btn").classList.remove('active');
    document.getElementById("entregas-btn").classList.remove('active');
    $("#map-container\ div").remove();
    $(".formregistro2").css("opacity","0")

    $("#addproduct").css("opacity","100")
    $("#addproduct").css("transform","scale(1)")
    $("#registroproducto").css("opacity","100")

    
    $("#addclient").css("opacity","0")
    $("#addclient").css("transform","scale(0)")

    $("#addventa").css("opacity","0")
    $("#addventa").css("transform","scale(0)")

    $("#tabla-clientesmain").css("opacity","0");
    $("#tabla-clientesmain").css("transform","scale(0)");
    $("#card-container").css("transform","scale(0)")

    $("#tabla-productosmain").css("opacity","100");
    $("#tabla-productosmain").css("transform","scale(1)");
    $("#tabla-productosmain tbody>tr").remove(); 

    $("#addentrega").css("opacity","0")
    $("#addentrega").css("transform","scale(0)")
    
    $(".card-delivery").css("opacity","0")
    $(".card-delivery").css("transform","scale(0)")

    $(".card-ventas").css("opacity","0")

    const urlBacon = "https://etrackservice.onrender.com/getproductos";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            for(let i = 0; i < res.length; i++){
                var r = document.createElement("tr");
                tabla = document.getElementById("tabla-productos");
                r.innerHTML = "<tr><th scope='row'>" + res[i].idproducto + "</th><td>" + res[i].nombreproducto +"</td><td>"+ res[i].descripcionproducto +"</td><td>"+ res[i].cantidad +" piezas</td><td>$"+ res[i].precio +"</td></tr>"
                tabla.appendChild(r)
            }
        },
        error: function(err) {
            alert(err);
        }
      });
    
  
}

function btnclientes(){
    document.getElementById("productos-btn").classList.remove('active');
    document.getElementById("clientes-btn").classList.add('active');
    document.getElementById("ventas-btn").classList.remove('active');
    document.getElementById("entregas-btn").classList.remove('active');
    $("#map-container\ div").remove();

    $("#registroproducto").css("opacity","0")
    $(".formregistro2").css("opacity","100")

    $("#addproduct").css("opacity","0")
    $("#addproduct").css("transform","scale(0)")

    
    $("#addclient").css("opacity","100")
    $("#addclient").css("transform","scale(1)")

    $("#addventa").css("opacity","0")
    $("#addventa").css("transform","scale(0)")

    $("#tabla-productosmain").css("opacity","0");
    $("#tabla-productosmain").css("transform","scale(0)");
    $("#card-container").css("transform","scale(0)")

    $("#addentrega").css("opacity","0")
    $("#addentrega").css("transform","scale(0)")

    $("#tabla-clientesmain").css("opacity","100");
    $("#tabla-clientesmain").css("transform","scale(1)");
    $("#tabla-clientesmain\ tbody>tr").remove();

    $(".card-delivery").css("opacity","0")
    $(".card-delivery").css("transform","scale(0)")

    $(".card-ventas").css("opacity","0")

    const urlBacon = "https://etrackservice.onrender.com/getclientes";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            for(let i = 0; i < res.length; i++){
                var r = document.createElement("tr");
                tabla = document.getElementById("tabla-clientes");
                r.innerHTML = "<tr><th scope='row'>" + res[i].idcliente + "</th><td>" + res[i].nombrecliente +"</td><td>"+ res[i].direccion +"</td><td>"+ res[i].celular +"</td><td>"+ res[i].email +"</td><td>"+ res[i].codigopostal +"</td></tr>"
                tabla.appendChild(r)
            }
        },
        error: function(err) {
            alert(err);
        }
      });

}
function btnventas(){
    document.getElementById("addventa").classList.add('active');
    document.getElementById("productos-btn").classList.remove('active');
    document.getElementById("clientes-btn").classList.remove('active');
    document.getElementById("ventas-btn").classList.add('active');
    document.getElementById("entregas-btn").classList.remove('active');
    $("#tabla-clientesmain").css("opacity","0");
    $("#tabla-clientesmain").css("transform","scale(0)");
    $("#tabla-clientesmain\ tbody>tr").remove();
    $("#map-container\ div").remove();
    $(".formregistro2").css("opacity","0")

    $("#registroproducto").css("opacity","0")

    $("#addproduct").css("opacity","0")
    $("#addproduct").css("transform","scale(0)")

    $("#addclient").css("opacity","0")
    $("#addclient").css("transform","scale(0)")

    $("#addventa").css("opacity","100")
    $("#addventa").css("transform","scale(1)")
    
    $("#tabla-productosmain").css("opacity","0");
    $("#tabla-productosmain").css("transform","scale(0)");
    $("#tabla-productosmain\ tbody>tr").remove();

    $("#card-container\ div").remove();

    $("#card-container").css("opacity","100")
    $("#card-container").css("transform","scale(1)")

    $(".card-delivery").css("opacity","0")
    $(".card-delivery").css("transform","scale(0)")

    $("#addentrega").css("opacity","0")
    $("#addentrega").css("transform","scale(0)")

    const urlBacon = "https://etrackservice.onrender.com/getventas";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            for(let i = 0; i < res.length; i++){
                var r = document.createElement("div");
                tabla = document.getElementById("card-container");
                r.innerHTML = "<h1>Venta # "+ res[i].idventa +"</h1><h4>Nombre cliente: "+ res[i].nombrecliente +"</h4><p>Fecha: "+ res[i].fechacompra +"</p><p>Venta total: $ "+ res[i].totalventa+"</p><i onclick='modalinfo(" + res[i].idventa +")' class='fa-solid fa-plus mas-info'></i>"
                r.classList.add("card-ventas")
                tabla.appendChild(r)
            }
        },
        error: function(err) {
            alert(err);
        }
      });

}
function btnentregas(){
    document.getElementById("productos-btn").classList.remove('active');
    document.getElementById("clientes-btn").classList.remove('active');
    document.getElementById("ventas-btn").classList.remove('active');
    document.getElementById("entregas-btn").classList.add('active');
    $(".formregistro2").css("opacity","0")

    $("#card-container\ div").remove();
    $("#registroproducto").css("opacity","0")


    $("#tabla-clientesmain\ tbody>tr").remove();
    $("#tabla-productosmain\ tbody>tr").remove();



    $("#tabla-clientesmain").css("opacity","0");
    $("#tabla-clientesmain").css("transform","scale(0)");
    
    $("#tabla-productosmain").css("opacity","0");
    $("#tabla-productosmain").css("transform","scale(0)");

    $("#addventa").css("opacity","0")
    $("#addventa").css("transform","scale(0)")

    $("#addproduct").css("opacity","0")
    $("#addproduct").css("transform","scale(0)")

    $("#addclient").css("opacity","0")
    $("#addclient").css("transform","scale(0)")

    $("#addentrega").css("opacity","100")
    $("#addentrega").css("transform","scale(1)")


    const urlBacon = "https://etrackservice.onrender.com/getentregas";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            for(let i = 0; i < res.length; i++){
                console.log(result)
                var r = document.createElement("div");
                tabla = document.getElementById("map-container");
                console.log( i % 2)
                if( i % 2 == 0 ){
                    r.style.left = "10%"
                    r.style.float = "left"
                }
                else{
                    r.style.left ="50%"
                    r.style.float = "left"
                }
                var entregado = "";
                var clase = "";
                if(res[i].entregado == 0 ){
                    entregado = "No Entregado"
                    clase = "noentregado"
                }else{
                   
                    entregado = "Entregado"
                    clase = "entregado"
                }
                r.innerHTML = '<iframe src="'+  res[i].coordenadas +'" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe><h3>Entrega #'+ res[i].identrega +'</h3><p>'+ res[i].direccion +'</p><p>Cliente: <strong> '+ res[i].cliente +'</strong></p><p># de Pedido: '+  res[i].idventa +'</p><p class="' + clase +'"><strong>' + entregado +'</strong></p>'
                r.classList.add("card-delivery")
                tabla.appendChild(r)
            }
        },
        error: function(err) {
            alert(err);
        }
      });

    $(".card-ventas").css("opacity","0")
    $(".card-delivery").css("opacity","100")
    $(".card-delivery").css("transform","scale(1)")

   


}

const card = document.querySelector('.map-card');
const cardBody = card.querySelector('.card-body')

card.addEventListener('click', () => {
  cardBody.classList.toggle('closed')
})



function modalinfo(idventa){
    var modalInfo = document.getElementById("ModalMoreInfo");
    modalInfo.style.display = "block";
    const urlBacon = "https://etrackservice.onrender.com/getproductosbyventa/" + idventa;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            for(let i = 0; i < res.length; i++){
                var r = document.createElement("li");
                tabla = document.getElementById("lista-productos");
                r.innerHTML = "Nombre del producto: <strong>" + res[i].nombreproducto + "</strong>      - Precio: <strong>$" + res[i].precio + "</strong>" + " - Cantidad: " + res[i].cantidadproducto
                tabla.appendChild(r)
            }
        },
        error: function(err) {
            alert(err);
        }
      });
}

function cerrarmodal() {
    var modalInfo = document.getElementById("ModalMoreInfo");
    modalInfo.style.display = "none";
  }



function registroproducto(){
   
    var formData = {
        ProductId: 0,
        NombreProducto :  $("#nombreproducto").val(),
        DescripcionProducto : $("#descripcionproducto").val(),
        CantidadProducto : $("#cantidad").val(),
        PrecioProducto : $("#precioproducto").val(),
    }
    
    const urlBacon = "https://etrackservice.onrender.com/registrarproducto";

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        data: JSON.stringify(formData),
        cache: false,
        success: function(result) {
            alert('Producto Registrado Con Exito!');
            btnproductos();
        },
        error: function(err) {
            alert(err);
        }
    });


}

function registrocliente(){
    var formData = {
        idcliente :0,
        nombreclient: $("#nombrecliente").val(),
        direccion : $("#search_input").val() ,
        celular : $("#numcelcliente").val(),
        email : $("#emailcliente").val(),
        codigopostal: document.getElementById("cpcliente").val,
        corlat: document.getElementById("cordlat").val,
        coralt: document.getElementById("cordalt").val
    }

    
    const urlBacon = "https://etrackservice.onrender.com/registrarcliente";

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        data: JSON.stringify(formData),
        cache: false,
        success: function(result) {
            alert('Cliente Registrado Con Exito!');
            btnclientes();
        },
        error: function(err) {
            alert("Error a registrar intente de nuevo");
        }
    });


}

function cerrarsesion(){
    localStorage.removeItem("id")
    window.location.href = "index.html";  
}