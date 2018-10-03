export const targetEventNameChanged = name => ({
  type: "TARGET_EVENT_NAME_CHANGED",
  name
});

export const targetEventDateChanged = date => ({
  type: "TARGET_EVENT_DATE_CHANGED",
  date
});

export const maxHrChanged = hr => ({
  type: "MAX_HR_CHANGED",
  hr
});

export const targetTimeChanged = time => ({
  type: "TARGET_TIME_CHANGED",
  time
});

export const programIdChanged = id => ({
  type: "PROGRAM_ID_CHANGED",
  id
});
