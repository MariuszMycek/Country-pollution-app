import { PARAMETERS } from './componentsData';

// Function takes pollution parameter id, finds that parameter in
// PARAMETERS array and returns parameter name
export function parameterIdToName(id) {
  const parameter = PARAMETERS.find(element => element.id === id);
  return parameter.name;
}
