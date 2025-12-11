import { useState } from 'react';

export const useCalendarEventHooks = () => {
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    // 캘린더 Hover 시
    const handleMouseEnter = (e, event, index) => {
        const parentElement = e.currentTarget.closest('.AnnualLeaveCalendarTableMainDivBox'); // 부모 요소 찾기
        if (!parentElement) return;

        const parentRect = parentElement.getBoundingClientRect(); // 부모 요소 위치 정보 가져오기
        let popupX = e.clientX - parentRect.left + parentElement.scrollLeft; // 화면 기준 X 좌표
        let popupY = e.clientY - parentRect.top + parentElement.scrollTop - 30; // 부모 요소 내 Y 좌표

        // 금요일(5) 또는 토요일(6)일 때 왼쪽으로 이동
        if (e.clientX >= 1200) {
            popupX -= 270; // 왼쪽으로 이동
        }

        // 4번째 주(3) 이상이면 위로 이동
        if (e.clientY >= 300) {
            popupY -= 170; // 위로 이동
        }

        setHoveredEvent(event);
        setPopupPosition({ x: popupX, y: popupY });
    };

    // 캘린더 Hover OUT 시
    const handleMouseLeave = () => {
        setHoveredEvent(null);
    };

    return {
        hoveredEvent,
        popupPosition,
        handleMouseEnter,
        handleMouseLeave,
    };
};
