import * as axios from 'axios';

const DOMAIN = 'http://localhost:5000';
const CONNECTOR = `${DOMAIN}/connectors`;
const PROJECT = `${DOMAIN}/projects`;


/**
 * SourceType: 'SOURCE_AZURE_BLOB'
 * DestinationType: 'DEST_AZURE_BLOB'
 * @param {*} connectorType 
 */
 export function createSourceConnector(connectorType, connString) {
  return axios.post(`${CONNECTOR}`, {
    type: connectorType,
    connString: connString,
    containerName: 'source'
  }).then((resp) => resp.data);
}

export function createDestConnector(connectorType, connString) {
  return axios.post(`${CONNECTOR}`, {
    type: connectorType,
    connString: connString,
    containerName: 'dest'
  }).then((resp) => resp.data);
}

export function getItems(connectorId) {
  return axios.get(`${CONNECTOR}/${connectorId}/items`).then((resp) => resp.data);
}

export function createProjects(sourceConnectorId, destConnectorId, jobs) {
  return axios.post(`${PROJECT}`, {
    sourceConnectorId: sourceConnectorId,
    destConnectorId: destConnectorId,
    jobs: jobs,
    keyPath: 'D:\\key.zip'
  }).then((resp) => resp.data);
}

export function getProjectProgress(projectId) {
  return axios.get(`${PROJECT}/${projectId}/progress`).then((resp) => resp.data);
}

