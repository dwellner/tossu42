import ProgramModel from "../ProgramModel";

describe("ProgramModel", () => {
  it("Should match original program", () => {
    const program = ProgramModel.getWeekProgram("2018-10-01", {
      targetTime: 210,
      name: "Peruskunto - 3.5t tavoiteaika",
      length: 24
    });
    expect(program.weeks.length).toEqual(24);
    expect(program.weeks[0].days[0].date).toEqual("2018-04-17");
    expect(program.weeks[0].days[6].distance).toEqual(14);
    expect(program.weeks[1].days[6].distance).toEqual(18);
    expect(program.weeks[2].days[6].distance).toEqual(10);
    expect(program.weeks[3].days[6].distance).toEqual(18);
    expect(program.weeks[4].days[6].distance).toEqual(20);
    expect(program.weeks[23].days[6].date).toEqual("2018-10-01");
  });

  it("Should be extended when stretched with 6 weeks", () => {
    const program = ProgramModel.getWeekProgram("2018-09-29", {
      targetTime: 210,
      name: "Peruskunto - 3.5t tavoiteaika",
      length: 30
    });
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

  it("Should be extended when stretched with 4 weeks", () => {
    const program = ProgramModel.getWeekProgram("2018-09-29", {
      targetTime: 210,
      name: "Peruskunto - 3.5t tavoiteaika",
      length: 28
    });
    expect(program.weeks.length).toEqual(28);
    expect(program.weeks[0].days[0].date).toEqual("2018-03-18");
    expect(program.weeks[0].days[6].distance).toEqual(10);
    expect(program.weeks[1].days[6].distance).toEqual(14);
    expect(program.weeks[2].days[6].distance).toEqual(18);
    expect(program.weeks[3].days[6].distance).toEqual(10);
    expect(program.weeks[4].days[6].distance).toEqual(14);
    expect(program.weeks[5].days[6].distance).toEqual(18);
    expect(program.weeks[6].days[6].distance).toEqual(10);
    expect(program.weeks[7].days[6].distance).toEqual(18);
    expect(program.weeks[8].days[6].distance).toEqual(20);
    expect(program.weeks[27].days[6].date).toEqual("2018-09-29");
  });
});
