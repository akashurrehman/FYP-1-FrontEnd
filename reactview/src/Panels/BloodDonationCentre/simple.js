const query = `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}
LIMIT 25
`;
const endpoint = 'http://localhost:3030/#/dataset/ds/query';

async function fetchData() {
  console.log('fetching data');
  try {
    const response = await axios.post(endpoint, { query });
    const { data } = response;
    console.log("Data",data);
    // process the data here
  } catch (error) {
    console.error("Error",error);
  } 
}