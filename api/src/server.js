//Importa a instância do Express configurada em index.js
const app = require("./index");
const cors = require('cors');

//Configuração do CORS com origens permitidas
const corsOption = {
    origin: '*', //Substitua pela origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', //Métodos HTTP permitidos
    credentials:true, //Permite o uso de cookies e credenciais
    optionsSuccessStatus: 204, //Define o status de resposta para o método OPTIONS
};
//Aplicando o middleware CORS no app
app.use(cors(corsOption));
//Inicia o servidor na porta 5000, tornando a API acessível em http://localhost:5000
app.listen(5000);