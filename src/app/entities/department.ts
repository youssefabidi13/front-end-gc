import { UserFisca } from "./user-fisca";

export class Department {
  idDepartement: number;
  nomDepartement: string;
  descriptionDepartement: string;
  responsableDepartement: UserFisca;
  membresDepartement: UserFisca[];
  
  constructor(
    idDepartement: number,
    nomDepartement: string,
    descriptionDepartement: string,
    responsableDepartement: UserFisca,
    membresDepartement: UserFisca[]
  ) {
    this.idDepartement = idDepartement;
    this.nomDepartement = nomDepartement;
    this.descriptionDepartement = descriptionDepartement;
    this.responsableDepartement = responsableDepartement;
    this.membresDepartement = membresDepartement;
  }
}
