import { UserFisca } from "./user-fisca";

export class FormationHistory {
  idFormationHistory: number;
  utilisateur: UserFisca;
  nomFormation: string;
  dateDebut: Date;
  dateFin: Date;

  constructor(
    idFormationHistory: number,
    utilisateur: UserFisca,
    nomFormation: string,
    dateDebut: Date,
    dateFin: Date
  ) {
    this.idFormationHistory = idFormationHistory;
    this.utilisateur = utilisateur;
    this.nomFormation = nomFormation;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
  }

}
