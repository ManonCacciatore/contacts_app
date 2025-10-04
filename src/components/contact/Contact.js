import getTemplate from "../contact/template";
import DB from "../../DB";

export default class Contact {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.created_at = data.created_at;
  }

  render(el) {
  const template = document.createElement("tr");
  template.innerHTML = getTemplate(this);

  this.domElt = template; 

  el.append(this.domElt);

  this.initEvents();
  }

  update(field, value) {
    this[field] = value;

    if (field === "firstname") {
      this.domElt.querySelector(".input-firstname").previousElementSibling.innerText = value;
    }
    else if (field === "lastname") {
      this.domElt.querySelector(".input-lastname").previousElementSibling.innerText = value;
    }
    else if (field === "email") {
      this.domElt.querySelector(".input-email").previousElementSibling.innerText = value;
    }
  }

  async save() {
    await DB.updateOneById(this.id, {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    });
  }

  initEvents() {
    // DELETE
    this.domElt.querySelector(".btn-delete").addEventListener("click", () => {
        window.ContactList.deleteOneById(this.id);
        this.domElt.remove();
    });

    // EDIT
    this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
        this.domElt.classList.add("isEditing");
    });

    // CHECK
    this.domElt.querySelector(".btn-check").addEventListener("click", async () => {
      this.update("firstname", this.domElt.querySelector(".input-firstname").value);
      this.update("lastname", this.domElt.querySelector(".input-lastname").value);
      this.update("email", this.domElt.querySelector(".input-email").value);

      await this.save();

      this.domElt.classList.remove("isEditing");
    });
  }
}