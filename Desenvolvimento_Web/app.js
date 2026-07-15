const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    message: `Rota de ${feature} criada, mas ainda sem implementacao.`,
  });
};

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API online.' });
});

// Admin
app.get('/admin/login', notImplemented('visualizacao de login admin'));
app.post('/admin/login', notImplemented('autenticacao admin'));
app.get('/admin/painel', notImplemented('painel admin'));

// Companhia, rotas de CRUD
app.get('/companhias', notImplemented('listagem de companhias'));
app.get('/companhias/:id', notImplemented('detalhe de companhia'));
app.post('/companhias', notImplemented('cadastro de companhia'));
app.put('/companhias/:id', notImplemented('edicao de companhia'));
app.delete('/companhias/:id', notImplemented('exclusao de companhia'));

// Companhia, rotas nomeadas para telas
app.get('/companhias/listar', notImplemented('tela listar companhias'));
app.post('/companhias/cadastrar', notImplemented('tela cadastrar companhia'));
app.put('/companhias/editar/:id', notImplemented('tela editar companhia'));
app.delete('/companhias/excluir/:id', notImplemented('tela excluir companhia'));

// Cupom, rotas de CRUD
app.get('/cupons', notImplemented('listagem de cupons'));
app.get('/cupons/:id', notImplemented('detalhe de cupom'));
app.post('/cupons', notImplemented('cadastro de cupom'));
app.put('/cupons/:id', notImplemented('edicao de cupom'));
app.delete('/cupons/:id', notImplemented('exclusao de cupom'));

// Cupom, rotas nomeadas para telas
app.get('/cupons/listar', notImplemented('tela listar cupons'));
app.post('/cupons/cadastrar', notImplemented('tela cadastrar cupom'));
app.put('/cupons/editar/:id', notImplemented('tela editar cupom'));
app.delete('/cupons/excluir/:id', notImplemented('tela excluir cupom'));

// Trecho, rotas de CRUD
app.get('/trechos', notImplemented('listagem de trechos'));
app.get('/trechos/:id', notImplemented('detalhe de trecho'));
app.post('/trechos', notImplemented('cadastro de trecho'));
app.put('/trechos/:id', notImplemented('edicao de trecho'));
app.delete('/trechos/:id', notImplemented('exclusao de trecho'));

// Trecho, rotas nomeadas para telas
app.get('/trechos/listar', notImplemented('tela listar trechos'));
app.post('/trechos/cadastrar', notImplemented('tela cadastrar trecho'));
app.put('/trechos/editar/:id', notImplemented('tela editar trecho'));
app.delete('/trechos/excluir/:id', notImplemented('tela excluir trecho'));

// Home/index
app.get('/home', notImplemented('home/index'));

app.use((req, res) => {
  res.status(404).json({ message: 'Rota nao encontrada.' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
  });
}

module.exports = app;
