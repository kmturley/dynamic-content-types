const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const schemas = {};

function deleteSchema(schemaId, versionId) {
  console.log('deleteSchema', schemaId, versionId);
  if (!schemas[schemaId]) {
    return `${schemaId} does not exist`;
  }
  if (!schemas[schemaId].versions[versionId]) {
    return `${schemaId} version ${versionId} does not exist`;
  }
  delete schemas[schemaId].versions[versionId];
}

function getSchema(schemaId, versionId) {
  console.log('getSchema', schemaId, versionId);
  if (!schemas[schemaId]) {
    return `${schemaId} does not exist`;
  }
  if (!schemas[schemaId].versions[versionId]) {
    return `${schemaId} version ${versionId} does not exist`;
  }
  return schemas[schemaId].versions[versionId];
}

function saveSchema(schemaId, versionId, schema) {
  console.log('saveSchema', schemaId, versionId, schema);
  if (!schemas[schemaId]) {
    schemas[schemaId] = {
      versions: {}
    }
  }
  if (!schemas[schemaId].versions[versionId]) {
    schemas[schemaId].versions[versionId] = schema;
  }
  return JSON.stringify(schemas, null, 2);
}

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
