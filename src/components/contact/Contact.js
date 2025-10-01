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
    const template = document.createElement('tr');
    template.innerHTML = getTemplate(this);

    const btnEdit = template.querySelector(".btn-edit");

    if (btnEdit) {
      btnEdit.addEventListener("click", () => {
        template.classList.toggle("isEditing");
      });
    }
    el.append(template);
  }
}