const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Konfigurasi MySQL
const db = mysql.createConnection({
  host: 'bmdptgz9qwgkmfdxtwao-mysql.services.clever-cloud.com',
  user: 'uftquzgmp3q1pywc',
  password: 'UkIV0yvAKAwVRcgIuvHZ',
  database: 'bmdptgz9qwgkmfdxtwao'
});

// Koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error('Koneksi ke MySQL gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke MySQL dengan ID ' + db.threadId);
});

// Middleware untuk membaca data JSON
app.use(bodyParser.json());

// Mendapatkan semua data
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM Alfa00', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Mendapatkan data berdasarkan ID
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Alfa00 WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Menambah data baru
app.post('/api/data', (req, res) => {
  const newData = req.body;
  db.query('INSERT INTO Alfa00 SET ?', newData, (err, result) => {
    if (err) throw err;
    res.send('Data berhasil ditambahkan');
  });
});

// Mengupdate data berdasarkan ID
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  db.query('UPDATE Alfa00 SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) throw err;
    res.send('Data berhasil diupdate');
  });
});

// Menghapus data berdasarkan ID
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Alfa00 WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send('Data berhasil dihapus');
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
