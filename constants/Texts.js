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
    "Juoksuohjelma räätälöidään valitsemastasi ajankohdasta taaksepäin",
    programSubHeader: "Jos valmistaudut kauden ensimmäiseen kisaan, valitse peruskunto. Jos olet kisojen välissä, valitsee kisakausi",
  settingsMetaSubHeader:
    "Maksimisykeen syöttämällä näet harjoituksien sykealueet.\nJos et tiedä omaa maksimisykettäsi, voit arvioida sen kaavalla \n \"220 miinus oma ikä\"; \nesim. 30 v = 220-30=190 bpm.",
  maxHeartRate: "Maksimisyke",
  programHeader: "Nykyinen harjoitusohjelma",
  programGuide:
    "Alla näet ohjelman harjoitusviikot",
  dayScreen: "Päivä",
  programScreen: "Ohjelma",
  settingsScreen: "Muokkaa",

  welcomeHeader: "Tervetuloa",
  welcomeSubHeader: "Treenaa itsesi maratonkuntoon",
  welcomeBullet1: "Syötä päivämäärä johon tähtäät",
  welcomeBullet2: "Valitse sinulle sopiva juoksuohjelma",
  welcomeBullet3: "Näet joka päivä mitä tulisi tehdä",
  start: "Aloita"
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
      "1-2 km lämmittely, jonka jälkeen kovia interval-vetoja sykealueella. Vetojen välissä 2-3 min palauttava kävely tai hölkkä. Lopuksi 5 - 10 min loppuverryttely"
  },
  t: {
    name: "Tempo",
    short: "Tempo",
    desc: "Astetta kovempaa lenkkiä tavallista korkeammalla sykealueella"
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
    desc: "Palauttava hidas lenkki tavallista matalammalla sykealueella"
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
      "Pyri pitämään tavoittelemaasi kisavauhtia tasaisesti koko lenkin ajan"
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
