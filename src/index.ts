import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sistema de Pedidos con Pipes & Filters listo!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
