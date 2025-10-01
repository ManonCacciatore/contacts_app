export default class DB {

  static setApiURL(data){
    this.apiURL = data;
  }

  static async findAll(){
    const response = await fetch(this.apiURL + "contacts");
    return response.json();
  }

  static async create(data) {
    const response = await fetch(this.apiURL + "contacts", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email
      }),
    });
    return response.json();
  }
}