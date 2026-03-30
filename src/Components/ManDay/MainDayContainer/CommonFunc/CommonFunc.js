import moment from "moment";
export const getWeekOfMonth = (dateStr) => {
  const date = moment(dateStr);

  const startOfWeek = date.clone().startOf("isoWeek");

  const thursday = startOfWeek.clone().add(3, "days");

  const targetMonth = thursday.month();
  const targetYear = thursday.year();

  let currentWeekStart = moment([targetYear, targetMonth, 1]).startOf(
    "isoWeek",
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

// ManDayValidation.js

// 상수(Constant)로 빼두면 오타 방지 및 유지보수가 편해집니다.
const FACTOR = 100000;
const EXPECTED_TOTAL = FACTOR * 8;

// 사용자 용
export const validateWeeklyManDay = (dateLists) => {
  if (!dateLists || dateLists.length === 0) return null;

  const hasEmptyField = dateLists.some((list) =>
    list.child.some(
      (item) =>
        !item.depart ||
        !item.sub_depart ||
        item.divide === "nothing" ||
        item.man_day === "",
    ),
  );
  if (hasEmptyField)
    return "설비군/설비명/업무 유형을 전부 입력해야 저장이 가능합니다.";

  const hasZeroManDay = dateLists.some((list) =>
    list.child.some((item) => Number(item.man_day) <= 0),
  );
  if (hasZeroManDay) return "Man-day(시간)는 0보다 커야 저장됩니다.";

  const isNotSumEight = dateLists
    .filter((item) => item.child.length > 0)
    .some((list) => {
      const total = list.child.reduce(
        (acc, child) => acc + Math.round(Number(child.man_day) * FACTOR),
        0,
      );
      return Math.abs(total - EXPECTED_TOTAL) > 0;
    });

  if (isNotSumEight) return "Man-day(시간)는 일별 합산이 8이 되어야 합니다.";

  return null;
};

// 관리자용
export const validateAdminManDay = (infos) => {
  if (!infos || infos.length === 0) return null;

  const hasEmptyField = infos.some(
    (item) => !item.departCode || !item.subDepartCode || !item.divide,
  );
  if (hasEmptyField) return "공란을 전부 작성 해 주세요.";

  const hasZeroManDay = infos.some((item) => Number(item.manDay) <= 0);
  if (hasZeroManDay) return "Man-day(시간)는 0보다 커야 저장됩니다.";

  const sumByDate = infos.reduce((acc, item) => {
    acc[item.date] =
      (acc[item.date] || 0) + Math.round(Number(item.manDay) * FACTOR);
    return acc;
  }, {});

  const isInvalidSum = Object.values(sumByDate).some(
    (total) => total !== EXPECTED_TOTAL && total !== 0,
  );

  if (isInvalidSum) return "Man-day 합산은 8이 되어야 합니다.";

  return null;
};
