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
      "Tossu5tunnintäysohjelma_24"
    );
    expect(ProgramService.getBestMatch(270).id).toEqual(
      "Tossu4tunnintäysohjelma_24"
    );
    expect(ProgramService.getBestMatch(269).id).toEqual(
      "Tossu4tunnintäysohjelma_24"
    );
  });

  it("getPrograms by targetTime should return programs within 30 mins from target time", () => {
    const programs = ProgramService.getPrograms(225).map(p => p.id);
    expect(programs).toEqual([
      "Tossu3.5tunnintäysohjelma_24",
      "Tossu3.5tunninväliohjelma_8",
      "Tossu3.5tunninväliohjelma_6",
      "Tossu3.5tunninväliohjelma_4",
      "Tossu3.5tunninväliohjelma_2",
      "Tossu4tunnintäysohjelma_24",
      "Tossu4tunninväliohjelma_8",
      "Tossu4tunninväliohjelma_6",
      "Tossu4tunninväliohjelma_4",
      "Tossu4tunninväliohjelma_2"
    ]);
  });

  it("getPrograms by targetTime and name should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu 4 tunnin väliohjelma"
    ).map(p => p.id);

    expect(programs).toEqual([
      "Tossu4tunninväliohjelma_8",
      "Tossu4tunninväliohjelma_6",
      "Tossu4tunninväliohjelma_4",
      "Tossu4tunninväliohjelma_2"
    ]);
  });

  it("getPrograms by targetTime, name and length should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu 4 tunnin väliohjelma",
      6
    ).map(p => p.id);

    expect(programs).toEqual(["Tossu4tunninväliohjelma_6"]);
  });

  it("getPrograms by targetTime, name and length should validate against stretchRules if defined", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Tossu 3.5 tunnin täysohjelma",
      26
    ).map(p => p.id);

    expect(programs).toEqual(["Tossu3.5tunnintäysohjelma_24"]);
  });

  it("getProgramNames should return unique names", () => {
    expect(ProgramService.getProgramNames(240)).toEqual([
      "Tossu 4 tunnin täysohjelma",
      "Tossu 4 tunnin väliohjelma"
    ]);
    expect(ProgramService.getProgramNames(210)).toEqual([
      "Tossu 3.5 tunnin täysohjelma",
      "Tossu 3.5 tunnin väliohjelma"
    ]);
    expect(ProgramService.getProgramNames(60)).toEqual([]);
  });

  it("getProgramLength should return unique lengths valid for given params", () => {
    expect(
      ProgramService.getProgramLengths(210, "Tossu 3.5 tunnin täysohjelma")
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
      ProgramService.getProgramLengths(210, "Tossu 3.5 tunnin väliohjelma")
    ).toEqual([8, 6, 4, 2]);
    expect(
      ProgramService.getProgramLengths(210, "Tossu 5 tunnin väliohjelma")
    ).toEqual([]);
  });
});
