// @flow

import scheduleData from '../fixtures/Schedule-fixture';
let sortedScheduleData = scheduleData.sort((a, b) => {
  return new Date(a.dateString).valueOf() - new Date(b.dateString).valueOf();
});
let firstTalk = sortedScheduleData[0];
let lastTalk;
for (let i = sortedScheduleData.length - 1; i >= 0; i--) {
  if (sortedScheduleData[i].presenters) {
    lastTalk = sortedScheduleData[i];
    break;
  }
}

export const APP_TITLE = 'GeekCamp';
export const APP_SUB_TITLE = `Indonesia's Community Tech Conference`;
export const APP_DESCRIPTION = [
  `GeekCamp.id aspires to follow in the footsteps of Kamal's geeky legacy, while expanding to incorporate Indonesia's rich tradition of strong communities. Our goal is nurture Indonesia's tech community through communication, collaboration, and accessibility. We are trying to accomplish this by hosting the conference on a weekend encouraging speakers of all levels of seniority and charging a fraction of other conference ticket prices.`,
];

export const EVENT_DATE = new Date(`2017-07-15T08:00:00`);
export const EVENT_PLACE = {
  name: 'The Hall 8th Floor, Senayan City, Jakarta',
  coordinate:
    'place/Senayan+City+Mall/@-6.227595,106.7953756,17z/data=!3m2!4b1!5s0x2e69f148610ee4a3:0xaa9043c369af5e35!4m5!3m4!1s0x2e69f1485e476a65:0x300c043104acc004!8m2!3d-6.2276003!4d106.7975643?hl=en',
};
export const FIRST_TALK_TIME = new Date(firstTalk.dateString);

let lastTalkEnd;
if (lastTalk) {
  let lastTalkTime = new Date(lastTalk.dateString);
  lastTalkEnd = lastTalkTime.setTime(
    lastTalkTime.getTime() + lastTalk.durationInMinutes * 60 * 1000
  );
}

export const LAST_TALK_END = lastTalkEnd;
