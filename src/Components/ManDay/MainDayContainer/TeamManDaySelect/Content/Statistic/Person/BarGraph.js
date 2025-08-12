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
                indexBy="equipment"
                margin={{ top: 50, right: 130, bottom: 60, left: 50 }}
                padding={0.6}
                colors={['skyblue', 'gray']}
                colorBy="id"
                enableGridY={true}
                enableLabel={true}
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
                    // tickValues: [0, 0.4, 0.8, 1.2],
                    // format: value => Number(value),
                }}
            />
        </BarsMainDivBox>
    );
};

export default BarGraph;
