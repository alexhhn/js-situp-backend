class Connection {
  constructor(grupper) {
    this.grupper = grupper;
  }

  async get(gruppeNavn) {
    let gruppe = this.grupper.find(gruppe => gruppe.navn === gruppeNavn);
    if (gruppe == null) {
      throw new Error("Kunne ikke finne gruppe");
    }
    return gruppe;
  }

  async insert(navn, gruppe) {
    let index = this.grupper.findIndex(gr => gr.navn === navn);
    if (index < 0) {
      gruppe.navn = navn;
      this.grupper.push(gruppe);
    } else {
      throw new Error("Gruppe eksiterer allerede");
    }
  }

  async delete(navn) {
    let length = this.grupper.length;
    this.grupper = this.grupper.filter(gr => gr.navn !== navn);
    if (length === 0 && this.grupper.length === length) {
      throw new Error("Kunne ikke finne gruppe");
    }
  }

  async put(navn, gruppe) {
    let index = this.grupper.findIndex(gr => gr.navn === navn);
    gruppe.navn = navn;
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
