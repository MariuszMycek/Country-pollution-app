import { PARAMETERS } from './constants';

export function parameterIdToName(id) {
  const parameter = PARAMETERS.find(element => element.id === id);
  return parameter.name;
}
