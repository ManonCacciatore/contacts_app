import DB from "../../DB";
import Contact from "../contact/Contact";
import getTemplate from "./template";


export default class ContactList {
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    DB.setApiURL(data.apiURL);
    this.contacts = [];
    window.ContactList = this;
    this.loadContacts();
  }
  async loadContacts() {
    const contacts = await DB.findAll();
    this.contacts = contacts.map(contact => new Contact(contact));
    this.render()
  }

  getContactsCount() {
    return this.contacts.length
  }

  renderContactsCount() {
    this.domElt.querySelector(".contact-count").innerText = this.getContactsCount()
  }

  render() {
    this.domElt.innerHTML = getTemplate();
    this.contacts.forEach(contact => contact.render(this.domElt.querySelector(".contacts-table tbody")));

    this.renderContactsCount()
    this.initEvents()
  }

  async addContact(data) {
    // Ajouter dans la DB
    const contact = await DB.create(data);

    // Ajouter à this.contacts
    const newContact = new Contact(contact);
    this.contacts.push(newContact)

    // Ajouter dans le DOM
    newContact.render(this.domElt.querySelector('.contacts-table tbody'))

    // Relancer le renderContactsCount
    this.renderContactsCount()
  }

  async deleteOneById(id) {
    // Supprimer de la DB
    const resp = await DB.deleteOneById(id);
    // Supprimer des contacts

    this.contacts.splice(this.contacts.findIndex((contact) => contact.id === id), 1)

    // Supprimer dans le DOM (-> fait dans la Contact.js)
    // Relancer le renderContactsCount
    this.renderContactsCount()
  }

  initEvents () {
    const inputFirstname = this.domElt.querySelector('#contact-firstname')
    const inputLastname = this.domElt.querySelector('#contact-lastname')
    const inputEmail = this.domElt.querySelector('#contact-email')
    const btnContact = this.domElt.querySelector('.new-contact')

    btnContact.addEventListener("click",
      (e) => {
        const firstname = inputFirstname.value
        const lastname = inputLastname.value
        const email = inputEmail.value

        this.addContact({ firstname, lastname, email });

        inputFirstname.value = "";
        inputLastname.value = "";
        inputEmail.value = "";
      }
     )
  }
}