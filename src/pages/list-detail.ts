import PouchDB, { individualList, MainDB } from "pouch-utils/poucher";
export class ListDetail {

  protected list: PouchDB.Database;
  protected listName: string;

  protected async activate({ id }) {
    this.list = individualList(id) || new PouchDB(id);
    const { db_name, doc_count } = await this.list.info();
    console.info(`Succesfully loaded: ${db_name}:${doc_count}`);
    this.listName = db_name;
    try {
      const previous = await MainDB.get("lastroute");
      await MainDB.put({
        _id: "lastroute",
        name: "listdetail",
        param: { id },
        _rev: previous ? previous._rev : undefined,
      });
    } catch (error) {
      await MainDB.put({ _id: "lastroute", name: "listdetail", param: { id } });
    }
  }
}
