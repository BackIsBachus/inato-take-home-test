import { Drug, Pharmacy } from "./pharmacy";
import { HERBALTEA, MAGICPILL, FERVEX, DAFALGAN } from "./constants";

describe("Drug Constructor", () => {
  it("should have benefit at 50 maximum at creation", () => {
    expect(new Drug("test", 2, 51)).toEqual(new Drug("test", 2, 50));
  });
  it("should have benefit at 50 maximum at creation", () => {
    expect(new Drug("test", 2, 500)).toEqual(new Drug("test", 2, 50));
  });
  it("should have benefit at 0 minimum at creation", () => {
    expect(new Drug("test", 2, -1)).toEqual(new Drug("test", 2, 0));
  });
  it("should have benefit at 0 minimum at creation", () => {
    expect(new Drug("test", 2, -10)).toEqual(new Drug("test", 2, 0));
  });
});

describe("Drug Default", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Drug("test", 2, 3).updateState()).toEqual(
      new Drug("test", 1, 2)
    );
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(new Drug("test", 2, 0).updateState()).toEqual(
      new Drug("test", 1, 0)
    );
  });
  it("should decrease expiresIn by 1 benefit by 2", () => {
    expect(new Drug("test", 0, 3).updateState()).toEqual(
      new Drug("test", -1, 1)
    );
  });
  it("should decrease expiresIn by 1 benefit by 2", () => {
    expect(new Drug("test", -2, 3).updateState()).toEqual(
      new Drug("test", -3, 1)
    );
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(new Drug("test", -1, 0).updateState()).toEqual(
      new Drug("test", -2, 0)
    );
  });
  it("should decrease expiresIn and benefit only down to 0", () => {
    expect(new Drug("test", -1, 1).updateState()).toEqual(
      new Drug("test", -2, 0)
    );
  });
});

describe("Drug Magic Pill", () => {
  it("should not decrease the benefit nor expiresIn when positive", () => {
    expect(new Drug(MAGICPILL, 2, 3).updateState()).toEqual(
      new Drug(MAGICPILL, 2, 3)
    );
  });
  it("should not decrease the benefit nor expiresIn when negative", () => {
    expect(new Drug(MAGICPILL, -2, 3).updateState()).toEqual(
      new Drug(MAGICPILL, -2, 3)
    );
  });
  it("should not decrease the benefit nor expiresIn when 0", () => {
    expect(new Drug(MAGICPILL, 0, 3).updateState()).toEqual(
      new Drug(MAGICPILL, 0, 3)
    );
  });
});

describe("Drug Herbal Tea", () => {
  it("should increase the benefit and decrease expiresIn when positive", () => {
    expect(new Drug(HERBALTEA, 1, 3).updateState()).toEqual(
      new Drug(HERBALTEA, 0, 4)
    );
  });
  it("should increase the benefit by 2 and decrease expiresIn when 0", () => {
    expect(new Drug(HERBALTEA, 0, 3).updateState()).toEqual(
      new Drug(HERBALTEA, -1, 5)
    );
  });
  it("should increase the benefit by 2 and decrease expiresIn when negative", () => {
    expect(new Drug(HERBALTEA, -1, 3).updateState()).toEqual(
      new Drug(HERBALTEA, -2, 5)
    );
  });
});

describe("Drug FERVEX", () => {
  it("should increase the benefit by 1 and decrease expiresIn strictly above 10", () => {
    expect(new Drug(FERVEX, 11, 3).updateState()).toEqual(
      new Drug(FERVEX, 10, 4)
    );
  });
  it("should increase the benefit by 2 and decrease expiresIn between 10 and 5", () => {
    expect(new Drug(FERVEX, 10, 3).updateState()).toEqual(
      new Drug(FERVEX, 9, 5)
    );
  });
  it("should increase the benefit by 2 and decrease expiresIn between 10 and 5", () => {
    expect(new Drug(FERVEX, 6, 3).updateState()).toEqual(
      new Drug(FERVEX, 5, 5)
    );
  });
  it("should increase the benefit by 3 and decrease expiresIn between 5 and 0", () => {
    expect(new Drug(FERVEX, 5, 3).updateState()).toEqual(
      new Drug(FERVEX, 4, 6)
    );
  });
  it("should increase the benefit by 3 and decrease expiresIn between 5 and 0", () => {
    expect(new Drug(FERVEX, 1, 3).updateState()).toEqual(
      new Drug(FERVEX, 0, 6)
    );
  });
  it("should set the benefit to 0 and decrease expiresIn at 0", () => {
    expect(new Drug(FERVEX, 0, 10).updateState()).toEqual(
      new Drug(FERVEX, -1, 0)
    );
  });
  it("should leave the benefit at 0 and decrease expiresIn when negative", () => {
    expect(new Drug(FERVEX, -1, 0).updateState()).toEqual(
      new Drug(FERVEX, -2, 0)
    );
  });
  it("should set the benefit to 0 and decrease expiresIn when negative", () => {
    expect(new Drug(FERVEX, -1, 10).updateState()).toEqual(
      new Drug(FERVEX, -2, 0)
    );
  });
});

describe("Drug Dafalgan", () => {
  it("should decrease the benefit by 2 and expiresIn by 1", () => {
    expect(new Drug(DAFALGAN, 2, 3).updateState()).toEqual(
      new Drug(DAFALGAN, 1, 1)
    );
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(new Drug(DAFALGAN, 2, 0).updateState()).toEqual(
      new Drug(DAFALGAN, 1, 0)
    );
  });
  it("should decrease expiresIn by 1 benefit by 4", () => {
    expect(new Drug(DAFALGAN, 0, 5).updateState()).toEqual(
      new Drug(DAFALGAN, -1, 1)
    );
  });
  it("should decrease expiresIn by 1 benefit by 4", () => {
    expect(new Drug(DAFALGAN, -2, 5).updateState()).toEqual(
      new Drug(DAFALGAN, -3, 1)
    );
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(new Drug(DAFALGAN, -1, 0).updateState()).toEqual(
      new Drug(DAFALGAN, -2, 0)
    );
  });
  it("should decrease expiresIn and benefit only down to 0", () => {
    expect(new Drug(DAFALGAN, -1, 1).updateState()).toEqual(
      new Drug(DAFALGAN, -2, 0)
    );
  });
});

describe("Pharmacy Default", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 2)]);
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 0)]);
  });
  it("should decrease expiresIn by 1 benefit by 2", () => {
    expect(
      new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", -1, 1)]);
  });
  it("should decrease expiresIn by 1 benefit by 2", () => {
    expect(
      new Pharmacy([new Drug("test", -2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", -3, 1)]);
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(
      new Pharmacy([new Drug("test", -1, 0)]).updateBenefitValue()
    ).toEqual([new Drug("test", -2, 0)]);
  });
  it("should decrease expiresIn and benefit only down to 0", () => {
    expect(
      new Pharmacy([new Drug("test", -1, 1)]).updateBenefitValue()
    ).toEqual([new Drug("test", -2, 0)]);
  });
});

describe("Pharmacy Magic Pill", () => {
  it("should not decrease the benefit nor expiresIn when positive", () => {
    expect(
      new Pharmacy([new Drug(MAGICPILL, 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug(MAGICPILL, 2, 3)]);
  });
  it("should not decrease the benefit nor expiresIn when negative", () => {
    expect(
      new Pharmacy([new Drug(MAGICPILL, -2, 3)]).updateBenefitValue()
    ).toEqual([new Drug(MAGICPILL, -2, 3)]);
  });
  it("should not decrease the benefit nor expiresIn when 0", () => {
    expect(
      new Pharmacy([new Drug(MAGICPILL, 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug(MAGICPILL, 0, 3)]);
  });
});

describe("Pharmacy Herbal Tea", () => {
  it("should increase the benefit and decrease expiresIn when positive", () => {
    expect(
      new Pharmacy([new Drug(HERBALTEA, 1, 3)]).updateBenefitValue()
    ).toEqual([new Drug(HERBALTEA, 0, 4)]);
  });
  it("should increase the benefit by 2 and decrease expiresIn when 0", () => {
    expect(
      new Pharmacy([new Drug(HERBALTEA, 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug(HERBALTEA, -1, 5)]);
  });
  it("should increase the benefit by 2 and decrease expiresIn when negative", () => {
    expect(
      new Pharmacy([new Drug(HERBALTEA, -1, 3)]).updateBenefitValue()
    ).toEqual([new Drug(HERBALTEA, -2, 5)]);
  });
});

describe("Pharmacy FERVEX", () => {
  it("should increase the benefit by 1 and decrease expiresIn strictly above 10", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, 11, 3)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, 10, 4)]);
  });
  it("should increase the benefit by 2 and decrease expiresIn between 10 and 5", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, 10, 3)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, 9, 5)]);
  });
  it("should increase the benefit by 2 and decrease expiresIn between 10 and 5", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, 6, 3)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, 5, 5)]);
  });
  it("should increase the benefit by 3 and decrease expiresIn between 5 and 0", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, 5, 3)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, 4, 6)]);
  });
  it("should increase the benefit by 3 and decrease expiresIn between 5 and 0", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, 1, 3)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, 0, 6)]);
  });
  it("should set the benefit to 0 and decrease expiresIn at 0", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, 0, 10)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, -1, 0)]);
  });
  it("should leave the benefit at 0 and decrease expiresIn when negative", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, -1, 0)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, -2, 0)]);
  });
  it("should set the benefit to 0 and decrease expiresIn when negative", () => {
    expect(
      new Pharmacy([new Drug(FERVEX, -1, 10)]).updateBenefitValue()
    ).toEqual([new Drug(FERVEX, -2, 0)]);
  });
});

describe("Pharmacy Dafalgan", () => {
  it("should decrease the benefit by 2 and expiresIn by 1", () => {
    expect(
      new Pharmacy([new Drug(DAFALGAN, 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug(DAFALGAN, 1, 1)]);
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(
      new Pharmacy([new Drug(DAFALGAN, 2, 0)]).updateBenefitValue()
    ).toEqual([new Drug(DAFALGAN, 1, 0)]);
  });
  it("should decrease expiresIn by 1 benefit by 4", () => {
    expect(
      new Pharmacy([new Drug(DAFALGAN, 0, 5)]).updateBenefitValue()
    ).toEqual([new Drug(DAFALGAN, -1, 1)]);
  });
  it("should decrease expiresIn by 1 benefit by 4", () => {
    expect(
      new Pharmacy([new Drug(DAFALGAN, -2, 5)]).updateBenefitValue()
    ).toEqual([new Drug(DAFALGAN, -3, 1)]);
  });
  it("should decrease expiresIn and leave benefit to 0", () => {
    expect(
      new Pharmacy([new Drug(DAFALGAN, -1, 0)]).updateBenefitValue()
    ).toEqual([new Drug(DAFALGAN, -2, 0)]);
  });
  it("should decrease expiresIn and benefit only down to 0", () => {
    expect(
      new Pharmacy([new Drug(DAFALGAN, -1, 1)]).updateBenefitValue()
    ).toEqual([new Drug(DAFALGAN, -2, 0)]);
  });
});

describe("Pharmacy Mixed", () => {
  it("should update each Drug of the Pharmacy", () => {
    expect(
      new Pharmacy([
        new Drug("test", 5, 10),
        new Drug(HERBALTEA, 6, 11),
        new Drug(MAGICPILL, 7, 12),
        new Drug(FERVEX, 8, 13),
        new Drug(DAFALGAN, 9, 14),
        new Drug(MAGICPILL, 33, 33)
      ]).updateBenefitValue()
    ).toEqual([
      new Drug("test", 4, 9),
      new Drug(HERBALTEA, 5, 12),
      new Drug(MAGICPILL, 7, 12),
      new Drug(FERVEX, 7, 15),
      new Drug(DAFALGAN, 8, 12),
      new Drug(MAGICPILL, 33, 33)
    ]);
  });
});
