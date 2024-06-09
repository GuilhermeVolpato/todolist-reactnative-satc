import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "exemploLista.sqlite";

const SQL_CREATE_ENTRIES = `
  CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      isCheck INTEGER NOT NULL,
      isComplete INTEGER NOT NULL
  )
`;

let _db = null;

export async function openDB() {
  if (!_db) {
    _db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await _db.execAsync(SQL_CREATE_ENTRIES);
  }
  return _db;
}

export function executeSql(query, params = []) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!_db) {
        await openDB();
      }
      const result = await _db.getAllAsync(query, ...params);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export default openDB;
