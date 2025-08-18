import React from 'react';
import styled from 'styled-components';

const ManDayExampleMainPageMainDivBox = styled.div`
    border-top: 1px solid gray;
    .Explane_Container {
        border-top: 1px solid gray;
        ul {
            list-style: square;
            padding-left: 30px;
        }
        li {
            list-style: square;
            padding: 5px;
            font-weight: bolder;
        }
    }
`;

const ManDayExampleMainPage = () => {
    return (
        <ManDayExampleMainPageMainDivBox style={{ padding: '10px' }}>
            <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Man_day 입력 예시</h2>
            <img width="100%" src={'/Example.png'}></img>
            <div className="Explane_Container">
                <ul>
                    <li>개발: 자사 제품의 핵심 기술을 개발하고, 새로운 장비의 기획 및 설계를 통해 경쟁력을 확보하는 업무</li>
                    <li>양산후개발: 기본적인 개발이 아닌 양산 후 고객사의 요청등으로 인한 추가 개발 </li>
                    <li>회의: 모든 유형의 회의</li>
                    <li>불량대응: 제품 사용 중 발생할 수 있는 문제나 불량 사례에 대해 신속하게 분석하고 해결하는 업무</li>
                    <li>
                        교육: 고객사 담당자들 또는 사내 인력이 장비를 보다 효과적으로 운용, 개발할 수 있도록 제품에 대하여 교육하거나 받는
                        업무
                    </li>
                </ul>
            </div>
        </ManDayExampleMainPageMainDivBox>
    );
};

export default ManDayExampleMainPage;
