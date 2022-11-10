const express = require('express')
const app = express()
const porta = 3000 //Porta para acessar o servidor

app.get('/', (requisicao, resposta) => {
    resposta.send("Essa é a minha primeira página utilizando o nodeJs")
})

app.listen(porta, ()=>{
    console.log("A aplicação está rodando na porta:"+porta)
})