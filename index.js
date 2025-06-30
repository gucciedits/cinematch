const express = require('express');
const app = express();
const port = 3000;

// Definindo uma rota simples
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
