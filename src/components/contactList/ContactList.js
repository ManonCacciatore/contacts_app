import DB from "../../DB";
import Contact from "../contact/Contact";
import getTemplate from "./template";


export default class ContactList {
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    DB.setApiURL(data.apiURL);
    this.contacts = [];
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
  }

  
}