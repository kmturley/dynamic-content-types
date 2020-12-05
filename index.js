const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { deleteSchema, getSchema, saveSchema } = require('./src/schemas');

const port = 3000;

app.use(bodyParser.json());

app.get('/schema/:schemaId/versions/:versionId', (req, res) => {
  res.send(getSchema(req.params.schemaId, req.params.versionId));
});

app.post('/schema/:schemaId/versions/:versionId', function (req, res) {
  res.send(saveSchema(req.params.schemaId, req.params.versionId, req.body));
});

app.put('/schema/:schemaId/versions/:versionId', function (req, res) {
  res.send(saveSchema(req.params.schemaId, req.params.versionId, req.body));
});

app.delete('/schema/:schemaId/versions/:versionId', function (req, res) {
  res.send(deleteSchema(req.params.schemaId, req.params.versionId));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
