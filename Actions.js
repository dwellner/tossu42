export const ActionTypes = {
  targetEventNameChanged: "TARGET_EVENT_NAME_CHANGED",
  targetEventDateChanged: "TARGET_EVENT_DATE_CHANGED",
  maxHrChanged: "MAX_HR_CHANGED",
  targetTimeChanged: "TARGET_TIME_CHANGED",
  programNameChanged: "PROGRAM_NAME_CHANGED",
  programLengthChanged: "PROGRAM_LENGTH_CHANGED"
};

export const targetEventNameChanged = name => ({
  type: ActionTypes.targetEventNameChanged,
  name
});

export const targetEventDateChanged = date => ({
  type: ActionTypes.targetEventDateChanged,
  date
});

export const maxHrChanged = hr => ({
  type: ActionTypes.maxHrChanged,
  hr
});

export const targetTimeChanged = time => ({
  type: ActionTypes.targetTimeChanged,
  time
});

export const programNameChanged = name => ({
  type: ActionTypes.programNameChanged,
  name
});

export const programLengthChanged = length => ({
  type: ActionTypes.programLengthChanged,
  length
});
