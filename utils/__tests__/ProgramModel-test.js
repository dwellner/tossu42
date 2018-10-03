import ProgramModel from "../ProgramModel";

describe("ProgramModel", () => {
  it("Should match original program", () => {
    const program = ProgramModel.getWeekProgram(
      "2018-10-01",
      "tossu_2018_24_330"
    );
    expect(program.weeks.length).toEqual(24);
    expect(program.weeks[0].days[0].date).toEqual("2018-04-17");
    expect(program.weeks[0].days[6].distance).toEqual(14);
    expect(program.weeks[1].days[6].distance).toEqual(18);
    expect(program.weeks[2].days[6].distance).toEqual(10);
    expect(program.weeks[3].days[6].distance).toEqual(18);
    expect(program.weeks[4].days[6].distance).toEqual(20);
    expect(program.weeks[23].days[6].date).toEqual("2018-10-01");
  });

  it("Should be extended when stretched with exactly 6 weeks", () => {
    const program = ProgramModel.getWeekProgram(
      "2018-09-29",
      "tossu_2018_24_330",
      "2018-03-04"
    );
    expect(program.weeks.length).toEqual(30);
    expect(program.weeks[0].days[0].date).toEqual("2018-03-04");
    expect(program.weeks[0].days[6].distance).toEqual(14);
    expect(program.weeks[1].days[6].distance).toEqual(18);
    expect(program.weeks[2].days[6].distance).toEqual(10);
    expect(program.weeks[3].days[6].distance).toEqual(14);
    expect(program.weeks[4].days[6].distance).toEqual(18);
    expect(program.weeks[5].days[6].distance).toEqual(10);
    expect(program.weeks[6].days[6].distance).toEqual(14);
    expect(program.weeks[7].days[6].distance).toEqual(18);
    expect(program.weeks[8].days[6].distance).toEqual(10);
    expect(program.weeks[9].days[6].distance).toEqual(18);
    expect(program.weeks[10].days[6].distance).toEqual(20);
    expect(program.weeks[29].days[6].date).toEqual("2018-09-29");
  });

  it("Should be extended when stretched with 4 weeks and 4 days", () => {
    const program = ProgramModel.getWeekProgram(
      "2018-09-29",
      "tossu_2018_24_330",
      "2018-03-14"
    );
    expect(program.weeks.length).toEqual(29);
    expect(program.weeks[0].days[0].date).toEqual("2018-03-11");

    expect(program.weeks[0].days[0].type).toEqual("lepo");
    expect(program.weeks[0].days[1].type).toEqual("lepo");
    expect(program.weeks[0].days[2].type).toEqual("lepo");
    expect(program.weeks[0].days[3].type).toEqual("k");
    expect(program.weeks[0].days[4].type).toEqual("lepo");
    expect(program.weeks[0].days[5].type).toEqual("pa");
    expect(program.weeks[0].days[6].type).toEqual("pi");


    expect(program.weeks[0].days[6].distance).toEqual(18);
    expect(program.weeks[1].days[6].distance).toEqual(10);
    expect(program.weeks[2].days[6].distance).toEqual(14);
    expect(program.weeks[3].days[6].distance).toEqual(18);
    expect(program.weeks[4].days[6].distance).toEqual(10);
    expect(program.weeks[5].days[6].distance).toEqual(14);
    expect(program.weeks[6].days[6].distance).toEqual(18);
    expect(program.weeks[7].days[6].distance).toEqual(10);
    expect(program.weeks[8].days[6].distance).toEqual(18);
    expect(program.weeks[9].days[6].distance).toEqual(20);
    expect(program.weeks[28].days[6].date).toEqual("2018-09-29");
  });

  it("Should be extended when stretched with 1 day", () => {
    const program = ProgramModel.getWeekProgram(
      "2018-09-29",
      "tossu_2018_24_330",
      "2018-04-14"
    );
    expect(program.weeks.length).toEqual(25);
    expect(program.weeks[0].days[0].date).toEqual("2018-04-08");
    expect(program.weeks[0].days[6].distance).toEqual(10);
    expect(program.weeks[0].days[0].type).toEqual("lepo");
    expect(program.weeks[0].days[1].type).toEqual("lepo");
    expect(program.weeks[0].days[2].type).toEqual("lepo");
    expect(program.weeks[0].days[3].type).toEqual("lepo");
    expect(program.weeks[0].days[4].type).toEqual("lepo");
    expect(program.weeks[0].days[5].type).toEqual("lepo");
    expect(program.weeks[0].days[6].type).toEqual("pi");
    expect(program.weeks[24].days[6].date).toEqual("2018-09-29");
  });

  it("Should return maximum program when maxWeeks exceeded", () => {
    const program = ProgramModel.getWeekProgram(
      "2018-09-29", 
      "tossu_2018_24_330",
      "2017-01-01" // way to long
    );
    expect(program.weeks.length).toEqual(40);
    expect(program.weeks[0].days[0].date).toEqual("2017-12-24");
    expect(program.weeks[39].days[6].date).toEqual("2018-09-29");
  });

  // TODO: shrink

  // test shrink fails when out of limit
});
