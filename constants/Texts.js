export const Labels = {
  mandatory: "Pakollinen",
  daysUntil: "päivää ennen",
  dayUntil: "päivä ennen",
  totalDistance: "Kokonaismatka",
  intensity: "Intensiteetti",
  programSetFor: "Juoksuohjelma on asetettu jaksolle",
  eventName: "Tapahtuman nimi",
  eventDate: "Pvm",
  targetTime: "Tavoiteaika",
  nextMaraton: "Seuraava maraton",
  program: "Juoksuohjelma",
  programType: "Juoksuohjelman tyyppi",
  noProgram: "Et ole vielä asettanut ohjelmaa",
  weekShort: "Viikko",
  weeks: "viikkoa",
  startingAt: "Alkaen",
  programDuration: "Ohjelman kesto",
  settingsTargetDate: "Aseta päivämäärä",
  settingsGoalSubHeader:
    "Juoksuohjelma räätelöidään sinua varten valitusta maratonin ajankohdasta taaksepäin",
  settingsMetaSubHeader:
    "Maksimisykeen avulla voidaan laskea harjoituksille sykealueet",
  maxHeartRate: "Maksimisyke",
  programHeader: "Nykyinen harjoitusohjelma",
  programGuide:
    "Alla naet ohjelman harjoitusviikot, pääset tarkastelemaan viikkoa klikkaamalla",
  dayScreen: "Päivä",
  programScreen: "Ohjelma",
  settingsScreen: "Muokkaa"
};

export const WeekDays = [
  "Sunnuntai",
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
  "Sunnuntai"
];

export const ProgramTypes = {
  full: "Täysimittainen valmisteluohjelma",
  inter: "Maratonien väliohjelma"
};

export const RunTypes = {
  iv: {
    name: "Interval",
    short: "IV",
    desc:
      "1-2 km lämmittely, jonka jälkeen kovia interval vetoja sykealueella. Vetojen välissä 2-3 min palauttava kävely tai hölkkä. Lopuksi 5 - 10 min loppuverryttely"
  },
  t: {
    name: "Tempo",
    short: "Tempo",
    desc: "Astetta kovempaa lenkkiä tavallista korkeammalla sykealueella."
  },
  pi: {
    name: "Pitkä",
    short: "Pitkä",
    desc: "Rauhallinen lenki tasaisella ja matalalla sykkeellä"
  },
  pe: {
    name: "Peruskunto",
    short: "Perus",
    desc: "Peruslenkki"
  },
  pa: {
    name: "Palautus",
    short: "Palautus",
    desc: "Palauttava hidas lenkki tavallista matalammalla sykealueella."
  },
  lepo: {
    name: "Lepopäivä",
    short: "Lepo",
    desc: ""
  },
  k: {
    name: "Kilpavauhti",
    short: "Kilpa",
    desc:
      "Pyrki pitämään tavoitteelemasi kisavauhtia tasaisesti koko lenkin aikana"
  },
  m: {
    name: "Mäkivedot",
    short: "Mäki",
    desc:
      "Mäkinen lenkki tai porrasjuoksu. Ylämäkeen kovat vedot. Alastulo rauhallisesti. Muista lämmittely ja loppuverryttely!"
  },
  r: {
    name: "Maraton",
    short: "Kilpailu",
    desc: "Muista tankkaus ja nesteytys!\nFiiliksen mukaan kohti 🏁"
  },
  ve: {
    name: "Vapaa",
    short: "Vapaa",
    desc: "Juoksu tai muu liikunta"
  }
};
