import React from 'react';

const DepartmentInfo = ({ NowSelect }) => {
    return (
        <>
            {' '}
            <div className="Content_Container">
                <div>부서명</div>
                <div>{NowSelect?.itemName}</div>
            </div>
            <div className="Content_Container">
                <div>부서코드</div>
                <div>{NowSelect?.itemCode}</div>
            </div>
            <div className="Content_Container">
                <div>상위 부서</div>
                <div>{NowSelect?.parentCode}</div>
            </div>
            <div className="Content_Container">
                <div></div>
                <div></div>
            </div>
        </>
    );
};

export default DepartmentInfo;
