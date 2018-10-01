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
    expect(ProgramService.getBestMatch(310).id).toEqual("tossu_2018_2_500");
    expect(ProgramService.getBestMatch(270).id).toEqual("tossu_2018_2_500");
    expect(ProgramService.getBestMatch(269).id).toEqual("tossu_2018_2_400");
  });

  it("getProgramsByTargetTime should return programs within 30 mins from target time", () => {
    getPrograms = target =>
      ProgramService.getProgramsByTargetTime(target).map(p => p.id);

    expect(getPrograms(210)).toEqual([
      "tossu_2018_24_300",
      "tossu_2018_8_300",
      "tossu_2018_6_300",
      "tossu_2018_4_300",
      "tossu_2018_2_300",
      "tossu_2018_24_330",
      "tossu_2018_8_330",
      "tossu_2018_6_330",
      "tossu_2018_4_330",
      "tossu_2018_2_330",
      "tossu_2018_24_400",
      "tossu_2018_8_400",
      "tossu_2018_6_400",
      "tossu_2018_4_400",
      "tossu_2018_2_400"
    ]);
  });
});
