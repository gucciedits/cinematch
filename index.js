const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Definir o diretório de arquivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Outras rotas para outras páginas
app.get('/filmes', (req, res) => {
  res.sendFile(path.join(__dirname, 'filmes.html'));
});

app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'perfil.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
