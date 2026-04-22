export const generateOptions = (sourceList, parentCode) => {
  if (!parentCode) return [];

  return sourceList
    .filter((item) => item.itemParentCode === parentCode)
    .sort((a, b) => a.itemRank - b.itemRank)
    .map((item) => ({ value: item.itemCode, label: item.itemName }));
};

export const accessCheck = (LoginInfo) => {
  if (
    LoginInfo.id === "jiseop.kim@yccorp.com" ||
    LoginInfo.id === "sjyoo@dhk.co.kr"
  ) {
    return true;
  } else {
    return false;
  }
};
