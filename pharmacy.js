import { HERBALTEA, MAGICPILL, FERVEX, DAFALGAN } from "./constants";

export class Drug {
  // Class properties
  static #maxBenefit = 50;
  static #minBenefit = 0;
  static #benefitStep = 1;

  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;

    // Benefit can only between 0 and 50, both included
    if (benefit > Drug.#maxBenefit) {
      this.benefit = Drug.#maxBenefit;
    } else if (benefit < Drug.#minBenefit) {
      this.benefit = Drug.#minBenefit;
    } else {
      this.benefit = benefit;
    }
  }

  updateState() {
    this.#updateBenefit(this.#getBenefitDelta());
    this.#updateExpiration();
    return this;
  }

  #updateBenefit(delta) {
    this.benefit += delta;
    // Apply additional contraints to benefit
    if (this.benefit > Drug.#maxBenefit) {
      this.benefit = Drug.#maxBenefit;
    } else if (this.benefit < Drug.#minBenefit) {
      this.benefit = Drug.#minBenefit;
    }
    return this.benefit;
  }

  #updateExpiration() {
    // Magic Pill does not expire
    if (this.name != MAGICPILL) {
      this.expiresIn--;
    }
    return this.expiresIn;
  }

  #getBenefitDelta() {
    let delta = 0;
    switch (this.name) {
      // Magic Pill does lose benefit
      case MAGICPILL:
        break;
      case HERBALTEA:
        delta = this.#getHerbalTeaDelta();
        break;
      case FERVEX:
        delta = this.#getFervexDelta();
        break;
      case DAFALGAN:
        delta = this.#getDafalganDelta();
        break;
      // Regular drug with regular pattern
      default:
        delta = this.#getDefaultDelta();
    }
    return delta;
  }

  // Herbal Tea benefit improves with time until expiration then improves at double the rate
  #getHerbalTeaDelta() {
    if (this.expiresIn <= 0) {
      return 2 * Drug.#benefitStep;
    }
    return Drug.#benefitStep;
  }

  // Fervex benefit improves more and more as it expires then its benefit drops to 0
  // Regular rate above 10 days remaining
  // Twice the rate between 10 and 5 days remaining (5 excluded)
  // Three times the rate at 5 days or less remaining
  #getFervexDelta() {
    if (this.expiresIn <= 0) {
      return -this.benefit;
    } else if (this.expiresIn <= 5) {
      return 3 * Drug.#benefitStep;
    } else if (this.expiresIn <= 10) {
      return 2 * Drug.#benefitStep;
    }
    return Drug.#benefitStep;
  }

  // Dafalgan expires twice the regular rate
  #getDafalganDelta() {
    return 2 * this.#getDefaultDelta();
  }

  // Regular/default behaviour loses benefit at base rate until it expires then at twice the rate
  #getDefaultDelta() {
    if (this.expiresIn <= 0) {
      return -2 * Drug.#benefitStep;
    }
    return -Drug.#benefitStep;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (let drug of this.drugs) {
      drug.updateState();
    }

    return this.drugs;
  }
}
