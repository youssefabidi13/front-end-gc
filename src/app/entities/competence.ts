export class Competence {
    idCompetence: number;
    nomCompetence: string;
    descriptionCompetence: string;
    categorieDomaine: string;
    niveauCompetence: string;
  
    constructor(
      idCompetence: number,
      nomCompetence: string,
      descriptionCompetence: string,
      categorieDomaine: string,
      niveauCompetence: string
    ) {
      this.idCompetence = idCompetence;
      this.nomCompetence = nomCompetence;
      this.descriptionCompetence = descriptionCompetence;
      this.categorieDomaine = categorieDomaine;
      this.niveauCompetence = niveauCompetence;
    }
  }
  