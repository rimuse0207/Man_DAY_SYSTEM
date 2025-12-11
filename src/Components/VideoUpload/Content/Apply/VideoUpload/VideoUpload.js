import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { MdOutlineMoveToInbox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../../../ToastMessage/ToastManager";
import { request } from "../../../../../API";
import Loader from "../../../../Loader/Loader";

const ExcelUploadMainDivBox = styled.div`
  h2 {
    margin-bottom: 30px;
  }

  .icon {
    font-size: 5em;
    pointer-events: none;
  }

  input[type="file"] {
    display: none;
  }

  .preview {
    width: 100%;
    height: 250px;
    margin: auto;
    background-color: #fff;
    border-radius: 5px;
    border: 3px dashed #eee;
    /* padding: 70px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .preview_desc {
    color: gray;
  }

  .preview:hover {
    border-color: #111;
  }

  .preview.active {
    background-color: #efeef3;
    border-color: #111;
    opacity: 0.7;
  }

  .preview_info {
    list-style: none;
    padding: 0;
  }

  .preview_info li {
    margin-bottom: 5px;
  }

  .btn_upload {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background: #111;
    color: #fff;
    border-radius: 8px;
    font-size: 15px;
    :hover {
      cursor: pointer;
    }
  }
  .FileUploadLists {
    /* border: 1px solid lightgray; */
    padding: 30px;
    width: 100%;

    overflow-y: auto;
    ul {
      margin-bottom: 20px;
      li {
      }
    }
  }
`;

export const ScheduleRegistrationMainContainerDivBox = styled.div`
  min-width: 300px;
  .btn_Group {
    display: flex;
    justify-content: end;
    margin-top: 10px;
    .btn_container {
      width: 90px;
      height: 40px;
      text-align: center;
      .btn {
        background-color: #2a82f0;
        color: white;
        height: 100%;
        text-align: center;
        font-weight: bolder;
        width: 100%;
        border-radius: 5px;
        border: none;
        border: 1px solid lightgray;
        &:hover {
          cursor: pointer;
        }
      }
      .btn_space {
        width: 15px;
      }
    }
  }
  .Select_Vacation_Lists {
    display: flex;

    .Date_Pickers_Container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 0.9em;
      border-radius: 5px;
      margin-right: 10px;
      .Date_Pickers_Text {
        margin-left: 10px;
      }
      .Date_Pickers_Pickers {
        height: 100%;
        input {
          font-size: 0.9em;
          font-weight: bolder;
          height: 45px;
          background: none;
          border: 1px solid lightgray;
          border-radius: 5px;
          text-align: center;
          :focus {
            outline: none;
            border: none;
          }
          :hover {
            cursor: pointer;
          }
        }
      }
    }
    .Time_Pickers_Container {
      display: flex;
      height: 45px;
      width: 150px;
      justify-content: space-around;
      margin-top: 5px;
      .Hour_Pickers_Container {
        width: 49%;
        select {
          width: 100%;
          height: 100%;
          font-size: 1.3em;
          border: 1px solid lightgray;
          border-radius: 5px;
          padding-left: 10px;
          option {
            font-size: 1.2em;
          }
        }
      }
    }
  }
  .format_Container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .Title_Content {
      width: 100px;
    }
    .body_Content {
      width: 100%;
      border-bottom: 2px solid lightgray;
      input {
        border: none;
        width: 100%;
        padding-left: 10px;
        &:focus {
          outline: none;
          border: none;
        }
      }
      input[type="date"] {
        border: none; // 테두리 설정은 본인 맘대로
        position: relative; // 캘린더 아이콘을 클릭해야만 달력이 보이기 때문에 이 영역 자체를 제어하기 위해 설정
        width: 48%;
        padding: 8px;
        box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        text-align: center;
      }

      // 실제 캘린더 아이콘을 클릭하는 영역을 의미하는 선택자
      // 이 영역을 확장해서 input의 어떤 곳을 클릭해도 캘린더를 클릭한 것과 같은 효과를 만들자!
      input[type="date"]::-webkit-calendar-picker-indicator {
        position: absolute; // 이를 설정하기 위해 사전에 relative를 설정한 것이다.
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent; // 배경은 투명하게,
        color: transparent; // 글자도 투명하게! 이 두 설정을 통해 캘린더 아이콘을 사라지게 만든다.
        cursor: pointer;
      }

      // input에 어떠한 유효값이 입력된 상태인지 확인하는 선택자
      // 날짜를 선택하면 유효값이 입력된다.
      // 이 속성을 활용하고자 한다면 반드시 태그에 required 속성을 달아줘야한다.
      input[type="date"]:valid::before {
        /* display: none; // 유효값이 입력된 경우 before에 있는 것을 사라지게 한다. 즉, placeholder를 사라지게 한다. */
      }
    }
  }
  @media only screen and (max-width: 800px) {
    select {
      background-color: #fff;
      -webkit-appearance: none; /* iOS Safari */
      -moz-appearance: none; /* Firefox */
      appearance: none; /* 표준 */
      background: white
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='black'><polygon points='0,0 12,0 6,6'/></svg>")
        no-repeat right 0.75em center;
      background-size: 12px 12px;
      padding-right: 1em; /* 화살표 공간 확보 */
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
  select {
    border: 1px solid lightgray;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    font-size: 1em;
    padding-left: 10px;
  }
  .Date_Table_Container {
    margin-bottom: 30px;
    max-height: 100px;
    overflow: auto;
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9em;
      overflow: auto;
    }

    th,
    td {
      border: none;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 5px;
      text-align: center;
      border-left: none;
      border-right: none;
    }

    .Delete_Date {
      color: red;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    th {
      color: black;
    }
  }
`;

const VideoUpload = ({ Getting_File_Info_Datas }) => {
  const dispatch = useDispatch();
  const Login_Info_State = useSelector(
    (state) => state.Login_Info_Reducer_State.Login_Info
  );
  const [files, setFiles] = useState([]);
  const [uploadedInfo, setUploadedInfo] = useState([]);
  const [isActive, setActive] = useState(false);
  const [Loading_Check, setLoading_Check] = useState(false);
  const fileInputRef = React.useRef(null);

  const setFileInfo = (files) => {
    if (!files || files.length === 0) return;

    const fileInfoList = [...files].map((file) => {
      const { name, size, type } = file;
      return {
        name,
        size: (size / (1024 * 1024)).toFixed(2) + "MB",
        type,
      };
    });

    setUploadedInfo(fileInfoList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => setActive(true);
  const handleDragLeave = () => setActive(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const droppedFiles = [...event.dataTransfer.files]; // 🔥 여러 파일
    if (droppedFiles.length === 0) return;

    const allowedTypes = ["video/mp4", "video/x-msvideo"];

    const validFiles = droppedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validFiles.length === 0) {
      toast.show({
        title: `동영상 파일(.mp4, .avi)만 업로드할 수 있습니다.`,
        successCheck: false,
        duration: 6000,
      });
      return;
    }

    setFiles(validFiles);
    setFileInfo(validFiles);
  };

  const handleSelectFile = () => {
    fileInputRef.current.click(); // input 클릭 트리거
  };
  const handleChangeFile = (e) => {
    const selectedFiles = [...e.target.files]; // 🔥 여러 파일
    setFiles(selectedFiles);
    setFileInfo(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("파일을 선택하세요!");

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file); // 🔥 배열로 넣기
    });

    try {
      setLoading_Check(true);
      const res = await request.post(
        "/VideoUpload/VideoFilesUpload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          params: {
            email: Login_Info_State.id,
          },
        }
      );

      if (res.status === 200) {
        await Getting_File_Info_Datas();
        fileInputRef.current.value = "";

        setFiles([]);
        setUploadedInfo([]);

        toast.show({
          title: `정상적으로 업로드 하였습니다.`,
          successCheck: true,
          duration: 6000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.show({
        title: `업로드 실패. IT팀에 문의 바랍니다.`,
        successCheck: false,
        duration: 6000,
      });
    }

    setLoading_Check(false);
  };

  return (
    <ExcelUploadMainDivBox>
      <Loader loading={Loading_Check}></Loader>
      <h2 style={{ marginTop: "30px" }}>Video 파일 업로드</h2>

      <div
        className={`preview ${isActive ? "active" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleSelectFile}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".mp4, .avi"
          multiple
          onChange={handleChangeFile}
          style={{ display: "none" }}
        />

        {(!uploadedInfo || uploadedInfo.length === 0) && (
          <Fragment>
            <div className="icon">
              <MdOutlineMoveToInbox />
            </div>
            <p className="preview_msg">클릭 또는 파일을 드래그하여 업로드!!</p>
            <p className="preview_desc">동영상 파일만 업로드 가능합니다.</p>
          </Fragment>
        )}
        <div className="FileUploadLists">
          {uploadedInfo.map((info, index) => (
            <ul className="preview_info" key={index}>
              <li>{index + 1}.</li>
              <li>파일명 : {info.name}</li>
              <li>용량 : {info.size}</li>
              <li>타입 : {info.type}</li>
            </ul>
          ))}
        </div>
      </div>

      {uploadedInfo.length > 0 && (
        <ScheduleRegistrationMainContainerDivBox>
          <div className="btn_Group">
            <div className="btn_container">
              <button className="btn" onClick={handleUpload}>
                업로드
              </button>
            </div>
          </div>
        </ScheduleRegistrationMainContainerDivBox>
      )}
    </ExcelUploadMainDivBox>
  );
};

export default VideoUpload;
