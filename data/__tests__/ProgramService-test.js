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
      "Peruskunto5ttavoiteaika_24"
    );
    expect(ProgramService.getBestMatch(270).id).toEqual(
      "Peruskunto4ttavoiteaika_24"
    );
    expect(ProgramService.getBestMatch(269).id).toEqual(
      "Peruskunto4ttavoiteaika_24"
    );
  });

  it("getPrograms by targetTime should return programs within 30 mins from target time", () => {
    const programs = ProgramService.getPrograms(225).map(p => p.id);
    expect(programs).toEqual([
      "Peruskunto3.5ttavoiteaika_24",
      "Kisakausi3.5ttavoiteaika_8",
      "Kisakausi3.5ttavoiteaika_6",
      "Kisakausi3.5ttavoiteaika_4",
      "Kisakausi3.5ttavoiteaika_2",
      "Peruskunto4ttavoiteaika_24",
      "Kisakausi4ttavoiteaika_8",
      "Kisakausi4ttavoiteaika_6",
      "Kisakausi4ttavoiteaika_4",
      "Kisakausi4ttavoiteaika_2"
    ]);
  });

  it("getPrograms by targetTime and name should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Kisakausi - 4t tavoiteaika"
    ).map(p => p.id);

    expect(programs).toEqual([
      "Kisakausi4ttavoiteaika_8",
      "Kisakausi4ttavoiteaika_6",
      "Kisakausi4ttavoiteaika_4",
      "Kisakausi4ttavoiteaika_2"
    ]);
  });

  it("getPrograms by targetTime, name and length should return only valid programs", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Kisakausi - 4t tavoiteaika",
      6
    ).map(p => p.id);

    expect(programs).toEqual(["Kisakausi4ttavoiteaika_6"]);
  });

  it("getPrograms by targetTime, name and length should validate against stretchRules if defined", () => {
    const programs = ProgramService.getPrograms(
      225,
      "Peruskunto - 3.5t tavoiteaika",
      26
    ).map(p => p.id);

    expect(programs).toEqual(["Peruskunto3.5ttavoiteaika_24"]);
  });

  it("getProgramNames should return unique names", () => {
    expect(ProgramService.getProgramNames(240)).toEqual([
      "Peruskunto - 4t tavoiteaika",
      "Kisakausi - 4t tavoiteaika"
    ]);
    expect(ProgramService.getProgramNames(210)).toEqual([
      "Peruskunto - 3.5t tavoiteaika",
      "Kisakausi - 3.5t tavoiteaika"
    ]);
    expect(ProgramService.getProgramNames(60)).toEqual([]);
  });

  it("getProgramLength should return unique lengths valid for given params", () => {
    expect(
      ProgramService.getProgramLengths(210, "Peruskunto - 3.5t tavoiteaika")
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
      ProgramService.getProgramLengths(210, "Kisakausi - 3.5t tavoiteaika")
    ).toEqual([8, 6, 4, 2]);
    expect(
      ProgramService.getProgramLengths(210, "Kisakausi - 5t tavoiteaika")
    ).toEqual([]);
  });
});
