const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { deleteContent, getContent, saveContent } = require('./src/content');
const { deleteSchema, getSchema, saveSchema } = require('./src/schemas');

const port = 3000;

app.use(bodyParser.json());

function formatResponse(json) {
  return JSON.stringify(json, null, 2);
}

// Schema API

app.get('/schema/:schemaId/versions/:versionId', (req, res) => {
  res.send(formatResponse(getSchema(req.params.schemaId, req.params.versionId)));
});

app.post('/schema/:schemaId/versions/:versionId', function (req, res) {
  res.send(formatResponse(saveSchema(req.params.schemaId, req.params.versionId, req.body)));
});

app.put('/schema/:schemaId/versions/:versionId', function (req, res) {
  res.send(formatResponse(saveSchema(req.params.schemaId, req.params.versionId, req.body)));
});

app.delete('/schema/:schemaId/versions/:versionId', function (req, res) {
  res.send(formatResponse(deleteSchema(req.params.schemaId, req.params.versionId)));
});

// Content API

app.get('/schema/:schemaId/versions/:versionId/content/:contentId', (req, res) => {
  res.send(formatResponse(getContent(req.params.schemaId, req.params.versionId, req.params.contentId)));
});

app.post('/schema/:schemaId/versions/:versionId/content/:contentId', function (req, res) {
  res.send(formatResponse(saveContent(req.params.schemaId, req.params.versionId, req.params.contentId, req.body)));
});

app.put('/schema/:schemaId/versions/:versionId/content/:contentId', function (req, res) {
  res.send(formatResponse(saveContent(req.params.schemaId, req.params.versionId, req.params.contentId, req.body)));
});

app.delete('/schema/:schemaId/versions/:versionId/content/:contentId', function (req, res) {
  res.send(formatResponse(deleteContent(req.params.schemaId, req.params.versionId, req.params.contentId)));
});

app.listen(port, () => {
  console.log(`Example dynamic content types app: http://localhost:${port}`);
});
