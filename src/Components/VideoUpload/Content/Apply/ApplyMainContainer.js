import React, { useEffect, useState } from "react";
import VideoUpload from "./VideoUpload/VideoUpload";
import VideoLists from "./Lists/VideoLists";
import { Request_Get_Axios } from "../../../../API";

const ApplyMainContainer = () => {
  const [fileUploadLists, setFileUploadLists] = useState([]);

  const Getting_File_Info_Datas = async () => {
    const Getting_File_Info_Datas_Axios = await Request_Get_Axios(
      "/VideoUpload/Getting_File_Upload_Lists"
    );

    if (Getting_File_Info_Datas_Axios.status) {
      setFileUploadLists(Getting_File_Info_Datas_Axios.data);
    }
  };

  useEffect(() => {
    Getting_File_Info_Datas();
  }, []);
  return (
    <div style={{ marginRight: "30px" }}>
      <VideoUpload
        Getting_File_Info_Datas={Getting_File_Info_Datas}
      ></VideoUpload>
      <VideoLists fileUploadLists={fileUploadLists}></VideoLists>
    </div>
  );
};

export default ApplyMainContainer;
