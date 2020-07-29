import { Context, logging, storage } from "near-sdk-as";

const DEFAULT_DATA = "Null"

export function getData(key: string): string | null {
  return storage.get<string>(key, DEFAULT_DATA);
}

export function setData(key: string, value: string): void {
  const account_id = Context.sender;
  logging.log('Saving data...');
  logging.log(key)
  logging.log(value)
  storage.set(key, value);
}
