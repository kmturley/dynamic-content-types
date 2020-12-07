const Ajv = require('ajv');
const { getSchema } = require('./schemas');
const contents = {};

function deleteContent(schemaId, versionId, contentId) {
  console.log('deleteContent', schemaId, versionId, contentId);
  const exists = existsContent(schemaId, versionId, contentId);
  return exists == true ? delete contents[schemaId].versions[versionId].content[contentId] : exists;
}

function getContent(schemaId, versionId, contentId) {
  console.log('getContent', schemaId, versionId, contentId);
  const exists = existsContent(schemaId, versionId, contentId);
  return exists == true ? contents[schemaId].versions[versionId].content[contentId] : exists;
}

function saveContent(schemaId, versionId, contentId, content) {
  console.log('saveContent', schemaId, versionId, contentId, content);
  // check if the schema compiles
  const ajv = new Ajv();
  const validate = ajv.compile(getSchema(schemaId, versionId));
  const valid = validate(content);
  if (valid === false) {
    console.error(validate.errors);
    return validate.errors;
  }
  if (existsContent(schemaId) !== true) {
    contents[schemaId] = {
      versions: {}
    }
  }
  if (existsContent(schemaId, versionId) !== true) {
    contents[schemaId].versions[versionId] = {
      content: {}
    };
  }
  if (existsContent(schemaId, versionId, contentId) !== true) {
    contents[schemaId].versions[versionId].content[contentId] = content;
  }
  return contents;
}

function existsContent(schemaId, versionId, contentId) {
  console.log('existsContent', schemaId, versionId, contentId);
  if (schemaId && !contents[schemaId]) {
    return { message: `${schemaId} schema does not exist` };
  }
  if (schemaId && contents[schemaId] && versionId && !contents[schemaId].versions[versionId]) {
    return { message: `${schemaId} schema, version ${versionId} does not exist` };
  }
  if (schemaId && contents[schemaId] && versionId && contents[schemaId].versions[versionId] && contentId && !contents[schemaId].versions[versionId].content[contentId]) {
    return { message: `${schemaId} schema, version ${versionId}, content ${contentId} does not exist` };
  }
  return true;
}

module.exports = { deleteContent, getContent, saveContent, existsContent };
