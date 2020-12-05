const Ajv = require('ajv');
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
  // check if the schema compiles
  const ajv = new Ajv();
  ajv.compile(schema);
  if (!schemas[schemaId]) {
    schemas[schemaId] = {
      versions: {}
    }
  }
  if (!schemas[schemaId].versions[versionId]) {
    schemas[schemaId].versions[versionId] = schema;
  }
  return schemas;
}

module.exports = { deleteSchema, getSchema, saveSchema };
