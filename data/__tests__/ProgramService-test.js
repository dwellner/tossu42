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
      "Tossu.com5tunnintäysohjelma_24"
    );
    expect(ProgramService.getBestMatch(270).id).toEqual(
      "Tossu.com4tunnintäysohjelma_24"
    );
    expect(ProgramService.getBestMatch(269).id).toEqual(
      "Tossu.com4tunnintäysohjelma_24"
    );
  });

  it("getPrograms by targetTime should return programs within 30 mins from target time", () => {
    const programs = ProgramService.getPrograms(225).map(p => p.id);
    expect(programs).toEqual([
      "Tossu.com3.5tunnintäysohjelma_24",
      "Tossu.com3.5tunninväliohjelma_8",
      "Tossu.com3.5tunninväliohjelma_6",
      "Tossu.com3.5tunninväliohjelma_4",
      "Tossu.com3.5tunninväliohjelma_2",
      "Tossu.com4tunnintäysohjelma_24",
      "Tossu.com4tunninväliohjelma_8",
      "Tossu.com4tunninväliohjelma_6",
      "Tossu.com4tunninväliohjelma_4",
      "Tossu.com4tunninväliohjelma_2"
    ]);
  });

  it("getPrograms by targetTime and name should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu.com 4 tunnin väliohjelma"
    ).map(p => p.id);

    expect(programs).toEqual([
      "Tossu.com4tunninväliohjelma_8",
      "Tossu.com4tunninväliohjelma_6",
      "Tossu.com4tunninväliohjelma_4",
      "Tossu.com4tunninväliohjelma_2"
    ]);
  });

  it("getPrograms by targetTime, name and length should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu.com 4 tunnin väliohjelma",
      6
    ).map(p => p.id);

    expect(programs).toEqual(["Tossu.com4tunninväliohjelma_6"]);
  });

  it("getPrograms by targetTime, name and length should validate against stretchRules if defined", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu.com 3.5 tunnin täysohjelma",
      26
    ).map(p => p.id);

    expect(programs).toEqual(["Tossu.com3.5tunnintäysohjelma_24"]);
  });

  it("getProgramNames should return unique names", () => {
    expect(ProgramService.getProgramNames(240)).toEqual([
      "Tossu.com 4 tunnin täysohjelma",
      "Tossu.com 4 tunnin väliohjelma"
    ]);
    expect(ProgramService.getProgramNames(210)).toEqual([
      "Tossu.com 3.5 tunnin täysohjelma",
      "Tossu.com 3.5 tunnin väliohjelma"
    ]);
    expect(ProgramService.getProgramNames(60)).toEqual([]);
  });

  it("getProgramLength should return unique lengths valid for given params", () => {
    expect(
      ProgramService.getProgramLengths(210, "Tossu.com 3.5 tunnin täysohjelma")
    ).toEqual([
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40
    ]);
    expect(
      ProgramService.getProgramLengths(210, "Tossu.com 3.5 tunnin väliohjelma")
    ).toEqual([8, 6, 4, 2]);
    expect(
      ProgramService.getProgramLengths(210, "Tossu.com 5 tunnin väliohjelma")
    ).toEqual([]);
  });
});
