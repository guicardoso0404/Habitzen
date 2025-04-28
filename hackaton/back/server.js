const express = require('express');
const db = require('./db_config.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = 9823;

app.use(express.json());
app.use(cors());

// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body; // Correção aqui
  const hash = await bcrypt.hash(senha, 10);
  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, hash], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Usuário cadastrado com sucesso!' });
  });
});

// Login de usuário
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], async (err, results) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Erro no servidor.' });
      }

      if (results.length > 0) {
          const usuario = results[0];
          const match = await bcrypt.compare(senha, usuario.senha);
          if (match) {
              res.json({ success: true, message: 'Login bem-sucedido!' });
          } else {
              res.json({ success: false, message: 'Usuário ou senha incorretos!' });
          }
      } else {
          res.json({ success: false, message: 'Usuário não encontrado!' });
      }
  });
});

app.post('/habitos', (req, res) => {
  const { nome, frequencia, meta } = req.body;
  const usuario_id = 1;  // Substitua pelo ID do usuário logado

  // Verificar se o usuario_id existe na tabela usuarios
  const checkUserQuery = 'SELECT id FROM usuarios WHERE id = ?';
  db.query(checkUserQuery, [usuario_id], (userErr, userResults) => {
    if (userErr) {
      return res.status(500).json({ error: 'Erro ao verificar usuário.' });
    }
    if (userResults.length === 0) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const query = 'INSERT INTO habitos (usuario_id, nome, frequencia, meta) VALUES (?, ?, ?, ?)';
    db.query(query, [usuario_id, nome, frequencia, meta], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, id: result.insertId });
    });
  });
});

app.put('/habitos/:id', (req, res) => {
  const { nome, frequencia, meta } = req.body;
  const id = req.params.id;

  const query = 'UPDATE habitos SET nome = ?, frequencia = ?, meta = ? WHERE id = ?';
  db.query(query, [nome, frequencia, meta, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
  });
});

app.delete('/habitos/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM habitos WHERE id = ?';
  db.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
