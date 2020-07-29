import { Context, logging, storage } from "near-sdk-as";

const DEFAULT_DATA = "Nada"

export function getData(key: string): string | null {
  return storage.get<string>(key, DEFAULT_DATA);
}

export function setData(key: string, value: string): void {
  logging.log('Saving data...');
  logging.log(('Key: ' + key))
  logging.log(('Value: ' + value))
  storage.setString(key, value);
}