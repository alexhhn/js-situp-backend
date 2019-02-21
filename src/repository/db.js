const errors = require("../errors/errors");

class Connection {
  constructor(grupper) {
    this.grupper = grupper;
  }

  async getGrupper() {
    if (this.grupper.length > 0) {
      return this.grupper;
    }
    throw new errors.NotFound("No groups found");
  }

  async get(gruppeNavn) {
    let gruppe = this.grupper.find(element => element.name == gruppeNavn);
    if (gruppe == null) {
      throw new errors.NotFound("Could not find group");
    }
    return gruppe;
  }

  async insert(gruppe) {
    if (gruppe.name == null) {
      throw new errors.BadRequest("Name not in body");
    }

    let index = this.grupper.findIndex(gr => gr.name === gruppe.name);
    if (index < 0) {
      // console.log(gruppe, 'gruppe to add');
      this.grupper.push(gruppe);
      // console.log(this.grupper);
    } else {
      throw new errors.NotFound("Group already exists");
    }
  }

  async delete(name) {
    console.log(name);
    let length = this.grupper.length;
    this.grupper = this.grupper.filter(gr => gr.name !== name);
    if (length === 0 && this.grupper.length === length) {
      throw new errors.NotFound("Could not find group");
    }
  }

  async put(name, gruppe) {
    gruppe.name = name;
    let index = this.grupper.findIndex(gr => gr.name === name);
    if (index < 0) {
      this.grupper.push(gruppe);
    } else {
      this.grupper[index] = gruppe;
    }
  }
}

class Database {
  constructor() {
    this.grupper = [];
  }

  async getConnection() {
    return new Connection(this.grupper);
  }
}

module.exports = new Database();
