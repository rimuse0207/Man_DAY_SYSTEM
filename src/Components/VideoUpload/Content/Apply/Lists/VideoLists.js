import React from "react";
import styled from "styled-components";
import moment from "moment";
import { request } from "../../../../../API";

const ExcelUploadListMainDivBox = styled.div`
  margin-top: 50px;
`;

export const MealSelectTableMainDivBox = styled.div`
  height: calc(100vh - 150px);
  overflow: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    overflow: auto;
    .Hovering {
      &:hover {
        cursor: pointer;

        background-color: #efefef;
      }
    }
    .OpacityOn {
      opacity: 0.5;
    }
    .Selected {
      opacity: 1;
      background-color: #efefef;
      font-weight: bolder;
    }
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
    font-size: 0.9em;
  }

  th {
    color: black;
  }
  .Open_Click_Modal_Container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .Button_Container {
      margin-left: 20px;

      button {
        border: none;
        padding: 5px;
        background-color: #fff;
        border: 1px solid lightgray;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          opacity: 0.7;
        }
      }
    }
  }
  thead {
    position: sticky;
    top: -1px;
    height: 30px;
    background-color: #fff;
    z-index: 1;
  }
  tbody {
    button {
      padding: 5px 10px;
      background-color: #fff;
      border: 1px solid lightgray;
      border-radius: 5px;
      margin-right: 10px;
      font-weight: 550;
      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
  .Mobile_Container {
    display: none;
  }
  .disabledTr {
    color: black;
    background-color: #efefef;
    opacity: 0.6;
  }
  @media only screen and (max-width: 800px) {
    .Mobile_Container {
      display: block;
    }
  }
  .URLHover {
    cursor: pointer;
    color: blue;
  }
`;

const VideoLists = ({ fileUploadLists = [] }) => {
  return (
    <ExcelUploadListMainDivBox>
      <div>
        <MealSelectTableMainDivBox>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            업로드 한 파일 리스트
          </h3>
          <table>
            <thead>
              <tr style={{ background: "#efefef" }}>
                <th>일자</th>
                <th>URL 주소</th>
                <th>파일 이름</th>
                <th>사이즈</th>
                <th>작성자</th>
              </tr>
            </thead>
            <tbody>
              {fileUploadLists.map((list) => {
                return (
                  <tr key={list.fileName}>
                    <td>{moment(list.createDate).format("YYYY.MM.DD")}</td>
                    <td
                      className="URLHover"
                      onDoubleClick={() =>
                        window.open(
                          `${process.env.REACT_APP_VIDEO_HOST}/API/AssociateCompany/YC/Man_Day/VideoUpload/VideoStream/${list.fileName}`
                        )
                      }
                    >{`${process.env.REACT_APP_VIDEO_HOST}/API/AssociateCompany/YC/Man_Day/VideoUpload/VideoStream/${list.fileName}`}</td>
                    <td>{list.originalName}</td>
                    <td>
                      {Math.floor(list.size / 1000 / 1000).toLocaleString()} MB
                    </td>
                    <td>{list.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </MealSelectTableMainDivBox>
      </div>
    </ExcelUploadListMainDivBox>
  );
};

export default VideoLists;
