import PouchDB from "pouchdb-browser";

export const MainDB: PouchDB.Database = new PouchDB("shoppinator");
export const ListsDB: PouchDB.Database = new PouchDB("shoppinator:lists");
const individualItems: Map<string, PouchDB.Database> = new Map();

async function initLists() {
  try {
    const { rows } = await ListsDB.allDocs();
    const listNames = rows
      .filter(doc => !individualItems.has(doc.id))
      .map(doc => doc.id);

    for (const name of listNames) {
      console.log(name);
      individualItems.set(name, new PouchDB(name));
    }
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

export function addList(name) {
  if (!individualItems.has(name)) {
    individualItems.set(name, new PouchDB(name));
    return true;
  }
  return false;
}

export async function removeList(name) {
  if (individualItems.has(name)) {
    await individualItems.get(name).destroy();
    return true;
  }
  return false;
}

export async function initDatabases() {
  try {
    const infos = await Promise.all([MainDB.info(), ListsDB.info()]);
    const logMessage = infos
      .map(info => `${info.db_name}:${info.doc_count}`)
      .join(" | ");

    console.info(logMessage);
    await initLists();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
  return true;
}

export function individualList(name: string) {
  return individualItems.get(name);
}

export default PouchDB;
