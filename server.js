let express = require('express'); //Se importa la dependencia
let app = express(); // se declara una App de express

/* Aplicación express especifica el directorio virtual '/assets'  ----> contenido estatico 
mapeado a ----> carpeta fisica '/public' */
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // Linea para que la app de express use EJS como motor de vistas

let port = process.env.PORT || 3000; //setteamos el puerto para que escuche el servidor

//Se utiliza para crear un log de acciones, el cual indica que fue lo que se hizo por ultima vez al servidor
app.use('/', function(req, res, next){
    console.log('Request Url:'+ req.url);
    next(); 
});

//primera ruta --> esta al nivel de la raiz '/' --> Hello world!
app.get('/', function(req,res) {
    //se utiliza la etiqueta link para hacer referencia al directorio virtual y a la hoja de estilo
    res.send('<html><head><link href=/assets/style.css type=text/css rel=stylesheet /></head><body><h1>Hello world!</h1></body></html>'); 
});

//segunda ruta /api, regresa un objeto JSON
app.get('/api', function (req, res) {
    res.json({firstname: 'John', lastname: 'Doe'}); 
});

//tercera ruta, recibe parametro desde la ruta
app.get('/person/:id', function(req, res) {
    //Se debe renderizar en el motor de vista, así como los parametros que va recibir
    res.render('person',{ID: req.params.id, Qstr: req.query.qstr});

});

//Se agrega una cuarta ruta, en la que se reciben dos parametros más ademas de ID
app.get('/endpoint/person/:id',function(req,res){
    //Se renderiza la vista y los parametros recibidos
    res.render('person',{ID: req.params.id, Message: req.query.message, Times:req.query.times });
});


app.listen(port); //Levantar el server y ponerlo a la escucha