import React from 'react';
import styled from 'styled-components';

const LicnenseContainerMainDivBox = styled.div`
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #e0e8ee;
    .Descript {
        font-size: 12px;
        padding-left: 20px;
        margin-bottom: 10px;
        strong {
            font-size: 13px;
        }
    }
    table {
        font-size: 14px;
        tr {
            padding: 10px;
        }
        .Td_Title {
            padding-right: 20px;
        }
        .Td_Descript {
            font-size: 12px;
        }
    }
`;

const LicenseContainer = () => {
    return (
        <LicnenseContainerMainDivBox>
            <div>
                <div style={{ marginBottom: '10px', fontWeight: 'bolder', textAlign: 'center' }}>고객사 CE교육 이수증</div>

                <table>
                    <tbody>
                        <tr>
                            <td className="Td_Title">
                                <strong>이수증 종류. </strong>
                            </td>
                            <td className="Td_Descript">SD00005</td>
                        </tr>
                        <tr>
                            <td className="Td_Title">
                                <strong>취득일. </strong>
                            </td>
                            <td className="Td_Descript">2023년 03월 13일</td>
                        </tr>
                        <tr>
                            <td className="Td_Title">
                                <strong>만료일. </strong>
                            </td>
                            <td className="Td_Descript">2025년 05월 15일</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </LicnenseContainerMainDivBox>
    );
};

export default LicenseContainer;
