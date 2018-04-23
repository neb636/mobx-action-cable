import { List } from '../types';


export function unique<T>(array: List<T>): T[] {

    return array.filter((v, i, a) => a.indexOf(v) === i);
}