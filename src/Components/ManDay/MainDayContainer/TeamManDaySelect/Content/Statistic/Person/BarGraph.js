import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';

export const BarsMainDivBox = styled.div`
    width: 100%;
    /* height: 100%; */
    height: calc(90vh - 450px);
    text-align: center;
    position: relative;
`;

const BarGraph = ({ Bar_State, keys }) => {
    return (
        <BarsMainDivBox>
            <ResponsiveBar
                data={Bar_State}
                // maxValue={1.2}
                keys={[keys ? '단위: 천만원' : 'man_day']}
                indexBy="id"
                margin={{ top: 50, right: 130, bottom: 60, left: 50 }}
                padding={0.6}
                colors={['skyblue', 'gray']}
                colorBy="id"
                enableGridY={true}
                enableLabel={true}
                tooltip={({ indexValue, value, data }) => (
                    <div
                        style={{
                            padding: '6px 12px',
                            background: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    >
                        man-day - {data.equipment} : <strong>{value}</strong>
                    </div>
                )}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: '장비명',
                    legendPosition: 'middle',
                    legendOffset: 40,
                    format: id => {
                        // id → 데이터에서 indexBy로 지정된 값
                        // 해당 row의 equipment을 표시하도록 변환
                        const item = Bar_State.find(d => d.id === id);
                        return item ? item.equipment : id;
                    },
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'top-right',
                        direction: 'row',
                        translateX: 120,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 2,
                        symbolSize: 20,
                        itemDirection: 'left-to-right',
                    },
                ]}
                axisLeft={{
                    tickSize: 1,
                    tickPadding: 20,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
            />
        </BarsMainDivBox>
    );
};

export default BarGraph;
