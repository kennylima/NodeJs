const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Rota de produtos
app.get('/produtos', (req, res)=>{
    const produtos = [
        {descricao: "Arroz", preco: 23.99, promocao: true},
        {descricao: "Feijão", preco: 13.99, promocao: false},
        {descricao: "Óleo", preco: 3.99, promocao: true},
        {descricao: "Açucar", preco: 8.99, promocao: false},
        {descricao: "Farinha de trigo", preco: 5.99, promocao: true}
    ]
    res.render('produtos', {produtos})
})

//Rota principal da aplicação
app.get('/', (req, res)=>{
    const usuario = {
        nome: "Kenny",
        email: "kennylima@hotmail.com",
        dataNascimento: "04/10/1993"
    }

    const usuarioLogado = true

    res.render('home', {usuario, usuarioLogado})
})

app.listen(3000)

