export class employee {
  name: string | null;
  lastName: string | null;
  birthDate: string | null;
  fiscalCode: string | null;
  mainAddress: string | null;
  workAddresses: domicilio[]|any;

  constructor() {
    this.name = '';
    this.lastName = '';
    this.birthDate = '';
    this.fiscalCode = '';
    this.mainAddress = '';
    this.workAddresses = [];
  }
}

export class domicilio {
  via: string | null;
  civico: string | null;
  citta: string | null;
  cap: string | null;

  constructor(){
    this.via = '';
    this.civico = '';
    this.citta = '';
    this.cap = '';
  }
}
