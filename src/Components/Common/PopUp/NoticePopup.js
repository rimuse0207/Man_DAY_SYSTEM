import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NoticePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const hideDate = localStorage.getItem("hide_update_notice");

    // 저장된 날짜가 오늘 날짜와 다르면 팝업을 띄움
    if (hideDate !== today) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleHideToday = () => {
    const today = new Date().toLocaleDateString();

    localStorage.setItem("hide_update_notice", today);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <PopupContainer>
        <PopupHeader>
          <h2>신규 설비 추가 및 업데이트 안내</h2>
        </PopupHeader>

        <PopupBody>
          <p className="intro">
            시스템에 새로운 신규 설비가 추가 및 업데이트 되었습니다. 아래 내용을
            확인해 주세요.
          </p>

          <UpdateList>
            <UpdateItem>
              <div className="badge">New</div>
              <div className="content">
                <strong>설비명 MT8313 추가</strong>
                <span className="location">
                  위치: 설비군 : Wafer {">"} 설비명 : MT8313
                </span>
              </div>
            </UpdateItem>
            <UpdateItem>
              <div className="badge" style={{ background: "green" }}>
                Update
              </div>
              <div className="content">
                <strong>설비명 MT8311H → SIRIUS</strong>
                <span className="location">
                  위치: 설비군 : Wafer {">"} 설비명 : SIRIUS
                </span>
              </div>
            </UpdateItem>
            <UpdateItem>
              <div className="badge" style={{ background: "green" }}>
                Update
              </div>
              <div className="content">
                <strong>설비명 MT3131 → MT3000</strong>
                <span className="location">
                  위치: 설비군 : Wafer {">"} 설비명 : MT3000
                </span>
              </div>
            </UpdateItem>
          </UpdateList>
        </PopupBody>

        <PopupFooter>
          <button className="hide-btn" onClick={handleHideToday}>
            오늘 하루 보지 않기
          </button>
          <button className="close-btn" onClick={handleClose}>
            닫기
          </button>
        </PopupFooter>
      </PopupContainer>
    </Overlay>
  );
};

export default NoticePopup;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupContainer = styled.div`
  background: #ffffff;
  width: 500px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-family: "Pretendard", sans-serif;
`;

const PopupHeader = styled.div`
  background-color: #2b3a55;
  color: white;
  padding: 16px 24px;

  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const PopupBody = styled.div`
  padding: 24px;

  .intro {
    margin-top: 0;
    margin-bottom: 20px;
    color: #4b5563;
    font-size: 0.95rem;
  }
`;

const UpdateList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UpdateItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;

  .badge {
    background-color: #3b82f6;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 6px;

    strong {
      font-size: 1rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: #64748b;
      line-height: 1.4;
    }

    .location {
      margin-top: 4px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #0ea5e9;
    }
  }
`;

const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #f1f5f9;
  border-top: 1px solid #e2e8f0;

  button {
    cursor: pointer;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .hide-btn {
    background: transparent;
    color: #64748b;
    text-decoration: underline;

    &:hover {
      color: #334155;
    }
  }

  .close-btn {
    background-color: #2b3a55;
    color: white;

    &:hover {
      background-color: #1e293b;
    }
  }
`;
