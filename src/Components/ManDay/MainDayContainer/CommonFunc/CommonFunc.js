import moment from 'moment';
// 월단위로 몇주차 인지 계산
export const getWeekOfMonth = dateStr => {
    const date = moment(dateStr);
    const year = date.year();
    const month = date.month(); // 0~11

    // 이번 주의 월요일 시작
    const startOfWeek = date.clone().startOf('isoWeek');

    // 이 주의 목요일 구하기
    const thursday = startOfWeek.clone().add(3, 'days');
    const targetMonth = thursday.month(); // 목요일의 달

    // 주차 계산 시작점: targetMonth의 첫 날부터 isoWeek 시작점 찾기
    let currentWeekStart = moment([year, targetMonth, 1]).startOf('isoWeek');
    let week = 1;

    while (currentWeekStart.isBefore(startOfWeek, 'day')) {
        const currentThursday = currentWeekStart.clone().add(3, 'days');
        if (currentThursday.month() === targetMonth) {
            week++;
        }
        currentWeekStart.add(1, 'week');
    }

    const monthStr = (targetMonth + 1).toString().padStart(2, '0');
    return `${monthStr}월 ${week}주차`;
};
