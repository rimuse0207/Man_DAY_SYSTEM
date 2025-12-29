import moment from "moment";
export const getWeekOfMonth = (dateStr) => {
  const date = moment(dateStr);

  // 이번 주의 월요일 시작
  const startOfWeek = date.clone().startOf("isoWeek");

  // 이 주의 목요일
  const thursday = startOfWeek.clone().add(3, "days");

  const targetMonth = thursday.month(); // 목요일 기준 달
  const targetYear = thursday.year(); // 🔥 목요일 기준 연도

  // 해당 달의 첫 주 isoWeek 시작
  let currentWeekStart = moment([targetYear, targetMonth, 1]).startOf(
    "isoWeek"
  );
  let week = 1;

  while (currentWeekStart.isBefore(startOfWeek, "day")) {
    const currentThursday = currentWeekStart.clone().add(3, "days");
    if (
      currentThursday.month() === targetMonth &&
      currentThursday.year() === targetYear
    ) {
      week++;
    }
    currentWeekStart.add(1, "week");
  }

  const monthStr = (targetMonth + 1).toString().padStart(2, "0");
  return `${monthStr}월 ${week}주차`;
};
