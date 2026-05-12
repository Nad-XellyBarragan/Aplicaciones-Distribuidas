require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
// npm install express

var express = require("express");
var app = express(); //Contenedor de Endpoints o WS Restful
const { MongoClient } = require("mongodb");
var client = 0;

var dbName = "";
var collectionName = "";

// Create references to the database and collection in order to run
// operations on them.
var database = 0;
var collection = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function prepareDB() {
  dbName = "myDatabase";
  collectionName = "recipes";

  // Create references to the database and collection in order to run
  // operations on them.
  database = client.db(dbName);
  collection = database.collection(collectionName);
}

async function connectDB() {
  const uri = "mongodb+srv://javieralberto1728_db_user:BJYhlzhfxlVfT3tF@cluster0.5qnxasc.mongodb.net/myDatabase?retryWrites=true&w=majority";

  client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();
}

app.get("/", async function (request, response) {
  r = {
    message: "Nothing to send",
  };

  response.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
https://typesofwebservices.noesierra.repl.co/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv001", async function (req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  r = {
    user_id: user_id,
    token: token,
    geo: geo,
  };

  res.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
https://typesofwebservices.noesierra.repl.co/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv0010", async function (req, res) {
  const user_id1 = req.query.id;
  const token1 = req.query.token;
  const geo1 = req.query.geo;

  r1 = {
    user_id: user_id1,
    token: token1,
    geo: geo1,
  };

  res.json(r1);
});

// Call this service sending payload in body: raw - json
/*
{
    "id": "nope",
    "token": "ertydfg456Dfgwerty",
    "geo": "12345678,34567890"
}
*/
app.post("/serv002", async function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  r = {
    user_id: user_id,
    token: token,
    geo: geo,
  };

  res.json(r);
});

/*
Call this service sending parameter as a part of the URL
https://typesofwebservices.noesierra.repl.co/serv003/1234567
*/
app.post("/serv003/:info", async function (req, res) {
  const info = req.params.info;
  let r = { info: info };
  res.json(r);
});

app.post("/receipt/insert", async function (req, res) { //sirve para definir un endpoint POST en la ruta "/receipt/insert". Este endpoint se encargará de insertar una nueva receta en la base de datos. La función que se ejecuta cuando se recibe una solicitud POST en esta ruta es asíncrona, lo que permite realizar operaciones de inserción en la base de datos de manera eficiente sin bloquear el hilo principal de ejecución.
  const recipes = [ //sirve para declarar una constante recipes que es un array de objetos. Cada objeto representa una receta y contiene información sobre el nombre de la receta, los ingredientes necesarios para prepararla y el tiempo de preparación en minutos. En este caso, se incluye una receta de "elotes cocidos" con sus ingredientes y tiempo de preparación correspondiente.
    {
      name: "elotes cocidos", //sirve para indicar el nombre de la receta, que en este caso es "elotes cocidos". El nombre de la receta es importante para identificar y describir el platillo que se va a preparar, y puede ser utilizado para buscar o compartir la receta con otras personas.
      ingredients: [
        "corn", //sirve para indicar el ingrediente de maíz, que es el ingrediente principal en la receta de elotes cocidos. El maíz se cocina y se utiliza como base para la preparación de los elotes cocidos, proporcionando un sabor dulce y una textura tierna a la receta.
        "mayonnaise", //sirve para indicar el ingrediente de mayonesa, que se utiliza comúnmente en la preparación de elotes cocidos para agregar un sabor cremoso y una textura suave a la receta. La mayonesa se mezcla con los demás ingredientes, como el queso cotija y la crema agria, para crear una salsa que se vierte sobre los elotes cocidos, realzando su sabor y aportando una textura rica y deliciosa a la receta.
        "cotija cheese", //sirve para indicar el ingrediente de queso cotija, que se utiliza comúnmente en la preparación de elotes cocidos para agregar un sabor salado y un toque de textura a la receta. El queso cotija se espolvorea sobre los elotes cocidos después de agregar la mayonesa y la crema agria, lo que ayuda a realzar los sabores y aporta un contraste de textura crujiente y desmenuzable a la receta.
        "sour cream", //sirve para indicar el ingrediente de crema agria, que se utiliza comúnmente en la preparación de elotes cocidos para agregar un sabor cremoso y ligeramente ácido a la receta. La crema agria se mezcla con los demás ingredientes, como la mayonesa y el queso cotija, para crear una salsa que se vierte sobre los elotes cocidos, realzando su sabor y aportando una textura suave y deliciosa a la receta.
        "lime", //sirve para indicar el ingrediente de lima, que se utiliza comúnmente en la preparación de elotes cocidos para agregar un sabor ácido y fresco a la receta. La lima se exprime sobre los elotes cocidos antes de agregar los demás ingredientes, lo que ayuda a realzar los sabores y equilibrar la riqueza de la mayonesa, el queso cotija y la crema agria.
      ],
      prepTimeInMinutes: 35, //sirve para indicar el tiempo de preparación de la receta en minutos. En este caso, se establece un valor de 35 minutos, lo que sugiere que la receta de elotes cocidos requiere aproximadamente ese tiempo para ser preparada y lista para su consumo.
    },
  ];

  let result = ""; //sirve para declarar una variable result que se utilizará para almacenar el resultado de la operación de inserción en la base de datos. Esta variable se inicializa como una cadena vacía y se actualizará posteriormente con un mensaje que indique el número de documentos insertados o un mensaje de error si ocurre algún problema durante la inserción.

  try { //sirve para intentar ejecutar el bloque de código dentro del bloque try. Si ocurre algún error durante la ejecución de ese bloque, se lanzará una excepción que será capturada por el bloque catch, lo que permitirá manejar el error de manera adecuada y evitar que la aplicación se bloquee o se comporte de manera inesperada.
    const insertManyResult = await collection.insertMany(recipes); //sirve para insertar un documento o varios documentos a la vez, dependiendo de si se le pasa un objeto o un array de objetos. Devuelve un objeto con información sobre la operación, incluyendo el número de documentos insertados y los IDs de los documentos insertados.
    console.log(
      `${insertManyResult.insertedCount} documents successfully inserted.\n`,   //sirve para mostrar el número de documentos insertados en la consola. El valor de insertedCount se obtiene del resultado de la operación de inserción, que es un objeto que contiene información sobre la operación realizada. En este caso, se muestra el número de documentos insertados seguido de un mensaje indicando que la inserción fue exitosa.
    );
    result = `${insertManyResult.insertedCount} documents successfully inserted.`; //sirve para asignar un mensaje a la variable result que indica el número de documentos insertados. El valor de insertedCount se obtiene del resultado de la operación de inserción, que es un objeto que contiene información sobre la operación realizada. En este caso, se asigna un mensaje que muestra el número de documentos insertados seguido de un mensaje indicando que la inserción fue exitosa.
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`, //funciona para mostrar un mensaje de error en la consola si ocurre algún problema al intentar insertar los nuevos documentos en la base de datos. El mensaje incluye información sobre el error que ocurrió, lo que puede ayudar a identificar y solucionar el problema.
    );
    result = `Something went wrong trying to insert the new documents: ${err}`; //sirve para asignar un mensaje a la variable result que indica que ocurrió un error al intentar insertar los nuevos documentos en la base de datos. El mensaje incluye información sobre el error que ocurrió, lo que puede ayudar a identificar y solucionar el problema.
  }
  let r = { result: result }; //sirve para crear un objeto r que contiene una propiedad result con el valor de la variable result. Este objeto se puede utilizar para enviar una respuesta al cliente que realizó la solicitud, proporcionando información sobre el resultado de la operación de inserción en la base de datos.
  res.json(r); //sirve para enviar una respuesta al cliente que realizó la solicitud, utilizando el formato JSON. La respuesta contiene el objeto r, que incluye la propiedad result con información sobre el resultado de la operación de inserción en la base de datos. Al utilizar res.json(), se asegura que la respuesta se envíe en formato JSON, lo que facilita su interpretación por parte del cliente.
});

app.listen(3000, async function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");

  await connectDB();
  prepareDB();
});
