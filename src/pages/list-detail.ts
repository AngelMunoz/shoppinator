import PouchDB, { individualList, MainDB } from "pouch-utils/poucher";
export class ListDetail {

  protected list: PouchDB.Database;
  protected listName: string;

  protected items: any[];
  protected hideDone = true;

  public async updateItem({ detail }) {
    try {
      await this.list.put(detail);
      const item = await this.list.get(detail._id);
      const $index = this.items.findIndex(i => i._id === detail._id);
      this.items.splice($index, 1, item);
    } catch (error) {
      console.warn(JSON.stringify(error));
      return M.toast({
        classes: "yellow black-text darken-2",
        html: `No pudimos actualizar este registro,
        por favor intenta nuevamente, si esto persiste probablemente sea mejor eliminarlo y agregarlo nuevamente`,
      });
    }
  }

  public async addItem({ detail }) {
    try {
      await this.list.put(detail);
      const item = await this.list.get(detail.name);
      this.items.push(item);
    } catch (error) {
      console.warn(JSON.stringify(error));
      return M.toast({
        classes: "yellow black-text darken-2",
        html: `No se admiten registros duplicados!`,
      });
    }
  }

  public async removeItem({ detail }) {
    try {
      await this.list.remove(detail);
      const $index = this.items.findIndex(i => i._id === detail._id);
      this.items.splice($index, 1);
    } catch (error) {
      console.warn(JSON.stringify(error));
      return M.toast({
        classes: "yellow black-text darken-2",
        html: `No pudimos eliminar este registro,
        probablemente este registro ya no existe, por favor refresca el sitio`,
      });
    }
  }

  public async saveHidePrefs(hideDone) {
    let preferences;
    try {
      const data = await MainDB.get("preferences");
      preferences = Object.assign({}, data);
      preferences.hideDone = hideDone;
      await MainDB.put(preferences);
    } catch (error) {
      console.warn(JSON.stringify(error));
      return M.toast({
        classes: "yellow black-text darken-2",
        html: `No pudimos guardar tus preferencias, por favor intenta nuevamente o limpia los datos del navegador`,
      });
    }
    const { rows } = await this.list.allDocs({ include_docs: true });
    this.items = rows
      .map(row => row.doc)
      .filter((doc: any) => hideDone ? !doc.done : true);
  }

  protected attached() {
    (M as any).AutoInit();
  }

  protected async activate({ id }) {
    let preferences;
    try {
      preferences = await MainDB.get("preferences");
    } catch (error) {
      await MainDB.put({ _id: "preferences", hideDone: true });
      preferences = MainDB.get("preferences");
    }
    this.hideDone = preferences.hideDone;


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
    const { rows } = await this.list.allDocs({ include_docs: true });
    this.items = rows
      .map(row => row.doc)
      .filter((doc: any) => this.hideDone ? !doc.done : true);

  }

}
