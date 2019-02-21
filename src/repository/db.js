class Connection {
  constructor(grupper) {
    this.grupper = grupper;
  }

  async getGrupper() {
    if (this.grupper.length > 0) {
      return this.grupper;
    }
    throw new Error('Gruppen er tom');
  }

  async get(gruppeNavn) {
    let gruppe = this.grupper.find(element => element.name == gruppeNavn);
    if (gruppe == null) {
      throw new Error('Kunne ikke finne gruppe');
    }
    return gruppe;
  }

  async insert(name, gruppe) {
    let index = this.grupper.findIndex(gr => gr.name === name);
    if (index < 0) {
      gruppe.name = name;
      // console.log(gruppe, 'gruppe to add');
      this.grupper.push(gruppe);
      // console.log(this.grupper);
    } else {
      throw new Error('Gruppe eksiterer allerede');
    }
  }

  async delete(name) {
    let length = this.grupper.length;
    this.grupper = this.grupper.filter(gr => gr.name !== name);
    if (length === 0 && this.grupper.length === length) {
      throw new Error('Kunne ikke finne gruppe');
    }
  }

  async put(name, gruppe) {
    let index = this.grupper.findIndex(gr => gr.name === name);
    gruppe.name = name;
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
