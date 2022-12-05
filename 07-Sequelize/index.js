const express   = require('express') //Módulo express
const expbhs    = require('express-handlebars') //Módulo handlebars
const app       = express() //Classe express
const conn      = require('./db/conn') //Importando conexão do BD

//Importação do módulo de Clube
const Clube = require('./models/Clube')

//Configuração da template engine (handlebars)
app.engine('handlebars', expbhs.engine())
app.set('view engine', 'handlebars')

//Configuração para receber dados do formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Rota do Clube
app.post('/clube/save', async (req,res)=>{
    const nome = req.body.nome
    let status = req.body.status

    if(status ==='on'){
        status = true
    }else{
        status = false
    }

    await Clube.create({nome, status})

    res.redirect('/clubes')
})

app.get('/clubes', async (req,res)=>{

    const clubes = await Clube.findAll({raw: true})

    res.render('clubes', {clubes})
})

app.get('/clube/:id', async (req,res)=>{

    const id = req.params.id

    const clube = await Clube.findOne({raw:true, where: {id: id}})

    res.render('clube', {clube})
})

app.get('/clube/delete/:id', async (req,res) =>{
    const id = req.params.id

    await Clube.destroy({where: {id: id}})

    res.redirect('/clubes')
})

app.get('/clube/edit/:id', async (req,res) =>{
    const id = req.params.id

    const clube = await Clube.findOne({raw:true, where: {id: id}})

    res.render('clube-edit', {clube})
})

app.post('/clube/edit/save', async (req,res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const status = req.body.status === 'on' ? true : false

    const clubeAlterado = {
        id: id,
        nome: nome,
        status: status
    }

    await Clube.update(clubeAlterado, {where: {id: id}})

    res.redirect('/clubes')
})

//Rota principal
app.get('/', (req,res) =>{
    res.render('home')
})

conn.sync().then(()=>{
    app.listen(3000)
}).catch((erro)=> {
    console.log(erro)
})
