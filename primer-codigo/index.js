var express = require('express');
var app = express(); //Contenedor de Endpoints o WS Restful

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {


    r ={
      'message':'Nothing to send'
    };

    response.json(r);
});


app.get("/aleatorio", function(req, res) {
    res.json({
        numale: Math.floor(Math.random() * 100) + 1
    });
});


app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
