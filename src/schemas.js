const Ajv = require('ajv');
const schemas = {};

function deleteSchema(schemaId, versionId) {
  console.log('deleteSchema', schemaId, versionId);
  const exists = existsSchema(schemaId, versionId);
  console.log('exists', exists);
  return exists === true ? delete schemas[schemaId].versions[versionId] : exists;
}

function getSchema(schemaId, versionId) {
  console.log('getSchema', schemaId, versionId);
  const exists = existsSchema(schemaId, versionId);
  console.log('exists', exists);
  return exists === true ? schemas[schemaId].versions[versionId] : exists;
}

function saveSchema(schemaId, versionId, schema) {
  console.log('saveSchema', schemaId, versionId, schema);
  // check if the schema compiles
  const ajv = new Ajv();
  ajv.compile(schema);
  if (existsSchema(schemaId) !== true) {
    schemas[schemaId] = {
      versions: {}
    }
  }
  if (existsSchema(schemaId, versionId) !== true) {
    schemas[schemaId].versions[versionId] = schema;
  }
  return schemas;
}

function existsSchema(schemaId, versionId) {
  console.log('existsSchema', schemaId, versionId);
  console.log(schemas);
  if (schemaId && !schemas[schemaId]) {
    return { message: `${schemaId} schema does not exist` };
  }
  if (schemaId && schemas[schemaId] && versionId && !schemas[schemaId].versions[versionId]) {
    return { message: `${schemaId} schema, version ${versionId} does not exist` };
  }
  return true;
}

module.exports = { deleteSchema, getSchema, saveSchema, existsSchema };
