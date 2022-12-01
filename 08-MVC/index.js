const express   = require ('express')
const expbhs    = require ('express-handlebars')
const conn      = require('./db/conn')
const app       = express()

//Configurando o template engine
app.engine('handlebars', expbhs.engine())
app.set('view engine', 'handlebars')

//Models
const Tarefa = require('./models/Tarefa')

//Importação de rotas
const tarefasRoutes = require('./routes/tarefasRoutes')

//Configuração para aceitar dados de formulários
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Rotas da aplicação
app.use('/tarefas', tarefasRoutes)

//Conexão BD
conn.sync()
.then(
    app.listen(3000)
).catch((erro) => console.log(erro))