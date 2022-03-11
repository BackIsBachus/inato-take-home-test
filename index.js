import { Drug, Pharmacy } from "./pharmacy";

import fs from "fs";
import { HERBALTEA, MAGICPILL, FERVEX, DAFALGAN } from "./constants";

const drugs = [
  new Drug("Doliprane", 20, 30),
  new Drug(HERBALTEA, 10, 5),
  new Drug(FERVEX, 5, 40),
  new Drug(MAGICPILL, 15, 40),
  new Drug(DAFALGAN, 20, 50)
];
const trial = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.stringify(trial.updateBenefitValue()));
}

/* eslint-disable no-console */
fs.writeFile("output.txt", log.join(","), err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
