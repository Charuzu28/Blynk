import defaultAlarm from "../../assets/alarm/alarmRing.mp3";
import catLaugh from "../../assets/alarm/cat-laugh.mp3";
import dangerAlarm from "../../assets/alarm/danger-alarm.mp3";
import alarmDubist from "../../assets/alarm/du-bist-gut-genug.mp3";
import fahAlarm from "../../assets/alarm/Faaaaah.mp3";
import alarmVoice from "../../assets/alarm/alarm-voice.mp3";
import ratDanceAlarm from "../../assets/alarm/rat-dance-music.mp3";

export const ALARM_SOUND_OPTIONS = [
  {
    id: "default",
    label: "Default Alarm",
    src: defaultAlarm,
  },
  {
    id: "catLaugh",
    label: "Cat Laugh",
    src: catLaugh,
  },
  {
    id: "dangerAlarm",
    label: "Danger Alarm",
    src: dangerAlarm,
  },
  {
    id: "alarmDubist",
    label: "Alarm Dubist",
    src: alarmDubist,
  },
  {
    id: "fahAlarm",
    label: "Fah Alarm",
    src: fahAlarm,
  },
  {
    id: "alarmVoice",
    label: "Alarm Voice",
    src: alarmVoice,
  },
  {
    id: "ratDanceAlarm",
    label: "Rat Dance Alarm",
    src: ratDanceAlarm,
  },
];

export const ALARM_SOUNDS = Object.fromEntries(
  ALARM_SOUND_OPTIONS.map((sound) => [
    sound.id,
    sound,
  ])
);