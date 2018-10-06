import ProgramService from "../ProgramService";

describe("ProgramService", () => {
  it("All programs should have unique keys", () => {
    const ids = [];
    ProgramService.getAll().forEach(p => {
      if (ids.indexOf(p.id) >= 0) {
        fail(`Duplicated id: ${p.id}`);
      }
      ids.push(p.id);
    });
  });

  it("getBestMatch should return first match closest to given targetTime", () => {
    expect(ProgramService.getBestMatch(310).id).toEqual(
      "Tossu.com5tunnintäysohjelma_300_24"
    );
    expect(ProgramService.getBestMatch(270).id).toEqual(
      "Tossu.com4tunnintäysohjelma_240_24"
    );
    expect(ProgramService.getBestMatch(269).id).toEqual(
      "Tossu.com4tunnintäysohjelma_240_24"
    );
  });

  it("getPrograms by targetTime should return programs within 30 mins from target time", () => {
    const programs = ProgramService.getPrograms(225).map(p => p.id);
    expect(programs).toEqual([
      "Tossu.com3.5tunnintäysohjelma_210_24",
      "Tossu.com3.5tunninväliohjelma_210_8",
      "Tossu.com3.5tunninväliohjelma_210_6",
      "Tossu.com3.5tunninväliohjelma_210_4",
      "Tossu.com3.5tunninväliohjelma_210_2",
      "Tossu.com4tunnintäysohjelma_240_24",
      "Tossu.com4tunninväliohjelma_240_8",
      "Tossu.com4tunninväliohjelma_240_6",
      "Tossu.com4tunninväliohjelma_240_4",
      "Tossu.com4tunninväliohjelma_240_2"
    ]);
  });

  it("getPrograms by targetTime and name should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu.com 4 tunnin väliohjelma"
    ).map(p => p.id);

    expect(programs).toEqual([
      "Tossu.com4tunninväliohjelma_240_8",
      "Tossu.com4tunninväliohjelma_240_6",
      "Tossu.com4tunninväliohjelma_240_4",
      "Tossu.com4tunninväliohjelma_240_2"
    ]);
  });

  it("getPrograms by targetTime, name and length should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu.com 4 tunnin väliohjelma",
      6
    ).map(p => p.id);

    expect(programs).toEqual(["Tossu.com4tunninväliohjelma_240_6"]);
  });

  it("getPrograms by targetTime, name and length should validate against stretchRules if defined", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu.com 3.5 tunnin täysohjelma",
      26
    ).map(p => p.id);

    expect(programs).toEqual(["Tossu.com3.5tunnintäysohjelma_210_24"]);
  });
});
