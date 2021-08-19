import { computedFrom } from "aurelia-framework";
import { Gender } from "./enums";

export class App {
  gender = Gender.Choose;
  genderScore = -0.406255224998121;

  ramzor = false;
  ramzorScore = 0.184253473705307;

  weakness = false;
  weaknessScore = 1.28651259814694;

  @computedFrom("ramzor", "weakness")
  get ramzorByWeakness(): boolean {
    return this.ramzor && this.weakness;
  }
  ramzorByWeaknessScore = -0.171699788649238;

  abdominalPain = false;
  abdominalPainScore = -0.660067425935927;

  fever = false;
  feverScore = 0.620885937588721;

  @computedFrom("ramzor", "fever")
  get ramzorByFever(): boolean {
    return this.ramzor && this.fever;
  }
  ramzorByFeverScore = -0.0749786137852737;

  cough = false;
  coughScore = 0.635568884035425;

  @computedFrom("ramzor", "cough")
  get ramzorByCough(): boolean {
    return this.ramzor && this.cough;
  }
  ramzorByCoughScore = 0.0972342704531042;

  myalgia = false;
  myalgiaScore = 1.65275981292653;

  @computedFrom("ramzor", "myalgia")
  get ramzorByMyalgia(): boolean {
    return this.ramzor && this.myalgia;
  }
  ramzorByMyalgiaScore = -0.271849072064277;

  tasteandsmellloss = false;
  tasteandsmelllossScore = 1.27433405866462;

  @computedFrom("ramzor", "tasteandsmellloss")
  get ramzorByTasteandsmellloss(): boolean {
    return this.ramzor && this.tasteandsmellloss;
  }
  ramzorByTasteandsmelllossScore = 0.0231302939880569;

  constant = -2.22625772740686;

  @computedFrom("gender", "ramzor", "weakness", "abdominalPain", "fever", "cough", "myalgia", "tasteandsmellloss")
  get expB(): number {
    const gender = this.gender * this.genderScore;

    const ramzor = (+this.ramzor) * this.ramzorScore;

    const weakness = (+this.weakness) * this.weaknessScore;
    const ramzorByWeakness = (+this.ramzorByWeakness) * this.ramzorByWeaknessScore;

    const abdominalPain = (+this.abdominalPain) * this.abdominalPainScore;

    const fever = (+this.fever) * this.feverScore;
    const ramzorByFever = (+this.ramzorByFever) * this.ramzorByFeverScore;

    const cough = (+this.cough) * this.coughScore;
    const ramzorByCough = (+this.ramzorByCough) * this.ramzorByCoughScore;

    const myalgia = (+this.myalgia) * this.myalgiaScore;
    const ramzorByMyalgia = (+this.ramzorByMyalgia) * this.ramzorByMyalgiaScore;

    const tasteandsmellloss = (+this.tasteandsmellloss) * this.tasteandsmelllossScore;
    const ramzorByTasteandsmellloss = (+this.ramzorByTasteandsmellloss) * this.ramzorByTasteandsmelllossScore;

    const value = this.constant
      + gender
      + ramzor
      + weakness
      + ramzorByWeakness
      + abdominalPain
      + fever
      + ramzorByFever
      + cough
      + ramzorByCough
      + myalgia
      + ramzorByMyalgia
      + tasteandsmellloss
      + ramzorByTasteandsmellloss;
    return Math.exp(value);
  }

  @computedFrom("expB")
  get probability(): number {
    const exbP = this.expB;
    return 100 * exbP / (1 + exbP);
  }
}
