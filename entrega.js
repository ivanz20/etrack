$( document ).ready(function() {
    var totalventaglobal = 0
    var productosdelista =[]

    const urlBacon = "https://etrackservice.onrender.com/getclientes";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            for(let i = 0; i < res.length; i++){
                var r = document.createElement("option");
                tabla = document.getElementById("clients-select");
                r.innerHTML = res[i].nombrecliente
                r.value = res[i].idcliente
                tabla.appendChild(r)
            }
        },
        error: function(err) {
            alert(err);
        }
      });

      
  
});
function buscarcliente(){
    var idcliente = document.getElementById("clients-select").value
    const urlBacon = "https://etrackservice.onrender.com/getclientebyid/" + idcliente;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        cache: false,
        success: function(result) {
            const res = JSON.parse(result);
            document.getElementById("direccioncliente").value = res[0].direccion
            document.getElementById("cpcliente").value = res[0].codigopostal
            document.getElementById("cord1").value = res[0].cord_lat
            document.getElementById("cord2").value = res[0].cord_alt
            document.getElementById("mapa-entrega").src = "https://maps.google.com/maps?q="+res[0].cord_lat+"," + res[0].cord_alt +"&hl=es;z=14&output=embed"
        },
        error: function(err) {
            alert(err);
        }
      });
    
      const urlBacon2 = "https://etrackservice.onrender.com/getventasbyclientid/" + idcliente;
      $.ajax({
          type: "GET",
          contentType: "application/json; charset=utf-8",
          url: urlBacon2,
          cache: false,
          success: function(result) {
              const res = JSON.parse(result);
              for(let i = 0; i < res.length; i++){
                  var r = document.createElement("option");
                  tabla = document.getElementById("ventas-select");
                  r.innerHTML = "Fecha de Venta: " + res[i].fechacompra + " Total Venta: $ " + res[i].totalventa
                  r.value = res[i].idventa
                  tabla.appendChild(r)
              }
          },
          error: function(err) {
              alert(err);
          }
        });
}

function programarventa(){
    map = "https://maps.google.com/maps?q="+$("#cord1").val()+"," + $("#cord2").val()  +"&hl=es;z=14&output=embed"
    var formData = {
        direccion: $("#direccioncliente").val(),
        cliente :  $("#clients-select option:selected").text(),
        coordenadas : map,
        idventa : $("#ventas-select").val(),
    }
    const urlBacon = "https://etrackservice.onrender.com/registrarentrega";

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        data: JSON.stringify(formData),
        cache: false,
        success: function(result) {
            alert('Entrega programada Con Exito!');
            window.location.href = "admin.html";

        },
        error: function(err) {
            alert(err);
        }
    });
}
