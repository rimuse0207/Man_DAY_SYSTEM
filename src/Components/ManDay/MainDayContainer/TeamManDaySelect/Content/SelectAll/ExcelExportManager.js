import * as XLSX from "xlsx/xlsx.mjs";
import moment from "moment";
import { toast } from "../../../../../ToastMessage/ToastManager";

const generateAndDownloadExcel = (data, fileName) => {
  if (!data || data.length === 0) {
    toast.show({
      title: `다운로드할 데이터가 없습니다.`,
      successCheck: false,
      duration: 6000,
    });
    return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, `Man-Day`);

  XLSX.writeFile(workbook, fileName);
  toast.show({
    title: `Excel 다운로드 되었습니다.`,
    successCheck: true,
    duration: 6000,
  });
};

const getAnnualLeaveCategory = (selected) => {
  const rank = Number(selected);
  if (isNaN(rank)) return "-";
  if (rank >= 1 && rank <= 4) return "01~04년";
  if (rank >= 5 && rank <= 9) return "05~09년";
  if (rank >= 10 && rank <= 14) return "10~14년";
  if (rank >= 15) return "15년 이상";
  return "-";
};

export const exportGeneralManDayExcel = (manDayInfos) => {
  const flattenedData = [];

  manDayInfos.forEach((data) => {
    data.user_lists?.forEach((item) => {
      if (item.man_day && item.man_day.length > 0) {
        item.man_day.forEach((re) => {
          flattenedData.push({
            회사: item.company,
            날짜: data.date,
            팀: item.departmentName,
            이름: item.name,
            설비군: re.depart || "",
            설비명: re.sub_depart || "",
            업무유형: re.divideCode || "",
            Man_Day: re.manDay || "",
          });
        });
      } else {
        flattenedData.push({
          회사: item.company,
          날짜: data.date,
          팀: item.departmentName,
          이름: item.name,
          설비군: "",
          설비명: "",
          업무유형: "",
          Man_Day: "",
        });
      }
    });
  });

  generateAndDownloadExcel(
    flattenedData,
    `${moment().format("YYMMDD")}_Man-Day 데이터.xlsx`,
  );
};

export const exportDevOpsManDayExcel = (selectedData) => {
  const flattenedData = [];

  const processedData = selectedData.map((list) => ({
    ...list,
    gradebounceww: list.gradebounceName === "인턴" ? 1 : list.gradebounceName,
  }));

  processedData.forEach((data) => {
    flattenedData.push({
      년도: data.year,
      월: data.month,
      회사: data.companyName,
      직군: data.occupationalName,
      팀: data.TeamdepartmentName,
      파트: data.departmentName,
      이름: data.Name,
      설비군: data.departName,
      설비명: data.subDepartName,
      업무유형: data.divideName,
      MM: `${(Number(data.sum_man_day / data.counts) * 100).toFixed(5)} %`,
      연차구분: getAnnualLeaveCategory(data.gradebounceww),
      연차: data.gradebounceName,
      호봉: data.salarygradeName,
    });
  });

  generateAndDownloadExcel(
    flattenedData,
    `개발운영팀 ${moment().format("YYMMDD")}_Man-Day 데이터.xlsx`,
  );
};
