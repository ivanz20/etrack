var totalventaglobal = 0
var productosdelista = []
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


      const urlBacon2 = "https://etrackservice.onrender.com/getproductos";
      $.ajax({
          type: "GET",
          contentType: "application/json; charset=utf-8",
          url: urlBacon2,
          cache: false,
          success: function(result) {
              const res = JSON.parse(result);
              for(let i = 0; i < res.length; i++){
                  var r = document.createElement("tr");
                  tabla = document.getElementById("tabla-productos-venta");
                  parametrofuncion = res[i].idproducto +',"' + res[i].nombreproducto + '",' + res[i].precio
                  console.log(parametrofuncion)
                  r.innerHTML = "<tr><th scope='row'>" + res[i].idproducto + "</th><td>" + res[i].nombreproducto +"</td><td>"+ res[i].descripcionproducto +"</td><td><select class='form-control' id='clients-select-" + res[i].idproducto   +"'><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option></select></td><td>$"+ res[i].precio +"</td><td><button type='button' class='btn-venta' onClick='addtolist("+parametrofuncion+")'><i class='fa-sharp fa-solid fa-cart-plus'></i></button></td></tr>"
                  tabla.appendChild(r)
              }
          },
          error: function(err) {
              alert(err);
          }
        });
      
});

function addtolist(idproducto,nombreproducto, precio){
    var idcantidad ="clients-select-" + idproducto
    var cantidadcompra = document.getElementById(idcantidad).value
    var totalventa = "$" + precio * cantidadcompra;
    totalventaglobal = totalventaglobal + (precio * cantidadcompra);
    console.log(totalventaglobal)
    var r = document.createElement("option");
    tabla = document.getElementById("lista-venta");
    r.innerHTML = "<strong>"+ nombreproducto +" </strong>" + " -- Cantidad: " + cantidadcompra + " piezas" +  " -- Total: " + totalventa;
    tabla.appendChild(r)
    var total = document.getElementById("totalventa")
    total.value = totalventaglobal
    productosdelista.push(cantidadcompra + "," + idproducto)
}

function ventadone(){

    var formData = {
        totalventa: totalventaglobal,
        idclienteventa :  $("#clients-select").val(),
        infoproductos : productosdelista
    }
    const urlBacon = "https://etrackservice.onrender.com/registrarventa";

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: urlBacon,
        data: JSON.stringify(formData),
        cache: false,
        success: function(result) {
            alert('Venta hecha Con Exito!');
            window.location.href = "admin.html";

        },
        error: function(err) {
            alert(err);
        }
    });
}