import { ListsDB, addList, removeList, MainDB } from "pouch-utils/poucher";
import { FloatingActionButton, Modal } from "materialize-css";
import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";

@autoinject
export class List {
  protected listNames: string[] = [];
  protected newName: string;
  protected selectedList: string;

  protected actionBtnRef: HTMLDivElement;
  protected addModalRef: HTMLDivElement;
  protected removeModalRef: HTMLDivElement;

  protected actionBtn: FloatingActionButton;
  protected removeModal: Modal;
  protected addModal: Modal;

  constructor(private router: Router) { }

  public showAdd() {
    this.addModal.open();
    (document.querySelector('[name="new-name"]') as HTMLInputElement).focus();
  }

  public showRemove() {
    this.removeModal.open();
    (document.querySelector('[name="remove-list"]') as HTMLSelectElement).focus();
  }

  protected attached() {
    this.actionBtn = M.FloatingActionButton
      .init(this.actionBtnRef, { direction: "left" });
    this.addModal = M.Modal
      .init(this.addModalRef, { dismissible: true, preventScrolling: true });
    this.removeModal = M.Modal
      .init(this.removeModalRef, { dismissible: true, preventScrolling: true });
  }

  protected async activate() {
    try {
      const { rows } = await ListsDB.allDocs();
      this.listNames = rows.map(row => row.id);
    } catch (error) {
      return M.toast({
        classes: "yellow black-text darken-2",
        html: `No pudimos obtener tus listas!,
        por favor refresca el sitio e intenta nuevamente`,
      });
    }

    try {
      const previous = await MainDB.get("lastroute");
      await MainDB.put({ _id: "lastroute", name: "lists", _rev: previous ? previous._rev : undefined });
    } catch (error) {
      await MainDB.put({ _id: "lastroute", name: "lists" });
    }
    return;

  }

  protected navigateTo(param) {
    return this.router.navigateToRoute("listdetail", { id: encodeURI(param) });
  }

  protected nameExists(name: string) {
    return this.listNames.includes(name);
  }

  protected async addList(name: string) {
    try {
      await ListsDB.put({ _id: name });
      addList(name);
      this.listNames.push(name);
      this.newName = "";
      if (this.addModal.isOpen) {
        this.addModal.close();
      }
    } catch (error) {
      console.warn(JSON.stringify(error));
      return M.toast({
        classes: "yellow black-text darken-2",
        html: `Hubo un problema al agregar tu lista!,
        Intenta con un nombre diferente o refresca el sitio`,
      });
    }
  }

  protected async removeList(name) {
    try {
      const list = await ListsDB.get(name);
      await ListsDB.remove(list);
      await removeList(name);
      const index = this.listNames.indexOf(name);
      this.listNames.splice(index, 1);
      this.selectedList = "";
      if (this.removeModal.isOpen) {
        this.removeModal.close();
      }
    } catch (error) {
      console.warn(JSON.stringify(error));
      return M.toast({
        classes: "yellow black-text darken-2",
        html: `No pudimos eliminar este registro,
        probablemente este registro ya no existe, por favor refresca el sitio`,
      });
    }
  }
}
