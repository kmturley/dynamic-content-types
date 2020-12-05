const Ajv = require('ajv');
const { getSchema } = require('./schemas');
const contents = {};

function deleteContent(schemaId, versionId, contentId) {
  console.log('deleteContent', schemaId, versionId, contentId);
  if (!contents[schemaId]) {
    return `${schemaId} does not exist`;
  }
  if (!contents[schemaId].versions[versionId]) {
    return `${schemaId} version ${versionId} does not exist`;
  }
  if (!contents[schemaId].versions[versionId].content[contentId]) {
    return `${schemaId} version ${versionId} content ${contentId} does not exist`;
  }
  delete contents[schemaId].versions[versionId].content[contentId];
}

function getContent(schemaId, versionId, contentId) {
  console.log('getContent', schemaId, versionId, contentId);
  if (!contents[schemaId]) {
    return `${schemaId} does not exist`;
  }
  if (!contents[schemaId].versions[versionId]) {
    return `${schemaId} version ${versionId} does not exist`;
  }
  if (!contents[schemaId].versions[versionId].content[contentId]) {
    return `${schemaId} version ${versionId} content ${contentId} does not exist`;
  }
  return contents[schemaId].versions[versionId].content[contentId];
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
  if (!contents[schemaId]) {
    contents[schemaId] = {
      versions: {}
    }
  }
  if (!contents[schemaId].versions[versionId]) {
    contents[schemaId].versions[versionId] = {
      content: {}
    };
  }
  if (!contents[schemaId].versions[versionId].content[contentId]) {
    contents[schemaId].versions[versionId].content[contentId] = content;
  }
  return contents;
}

module.exports = { deleteContent, getContent, saveContent };
