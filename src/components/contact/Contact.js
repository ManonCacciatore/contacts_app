import getTemplate from "../contact/template";

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

initEvents() {
  
  this.domElt.querySelector(".btn-edit")
    .addEventListener("click", () => {
      this.domElt.classList.toggle("isEditing");
    });

  this.domElt.querySelector(".btn-delete")
    .addEventListener("click", (e) => {
      window.ContactList.deleteOneById(this.id);
      this.domElt.remove()

    });

  this.domElt.querySelector(".btn-check")
    .addEventListener("click", () => {
      alert("Validation !");
    });
}}