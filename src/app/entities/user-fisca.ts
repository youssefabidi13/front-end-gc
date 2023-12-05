import { Department } from "./department";
import { Competence } from "./competence";
import { FormationHistory } from "./formation-history";

export class UserFisca {
  idUtilisateur: number;
  nomComplet: string;
  email: string;
  password: string;
  role: string;
  departement: Department;
  competencesAcquises: Competence[];
  historiqueFormation: FormationHistory[];

  constructor(
    idUtilisateur: number,
    nomComplet: string,
    email: string,
    password: string,
    role: string,
    departement: Department,
    competencesAcquises: Competence[],
    historiqueFormation: FormationHistory[]
  ) {
    this.idUtilisateur = idUtilisateur;
    this.nomComplet = nomComplet;
    this.email = email;
    this.password = password;
    this.role = role;
    this.departement = departement;
    this.competencesAcquises = competencesAcquises;
    this.historiqueFormation = historiqueFormation;
  }

}
