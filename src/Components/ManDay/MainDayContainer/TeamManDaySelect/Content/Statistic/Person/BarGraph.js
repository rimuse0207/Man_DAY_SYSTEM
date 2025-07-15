import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';

export const BarsMainDivBox = styled.div`
    width: 100%;
    /* height: 100%; */
    height: calc(100vh - 400px);
    text-align: center;
    position: relative;
`;

const BarGraph = ({ Bar_State }) => {
    return (
        <BarsMainDivBox>
            <ResponsiveBar
                data={Bar_State}
                maxValue={1.2}
                keys={['rate']}
                indexBy="equipment"
                margin={{ top: 120, right: 0, bottom: 60, left: 100 }}
                padding={0.6}
                colors={['skyblue', 'gray']}
                colorBy="id"
                // theme={{
                //     labels: { text: { fontSize: '2vmin', fill: '#000000' } },
                //     legends: { text: { fontSize: '2vmin', fill: '#000000' } },
                //     axis: {
                //         legend: { text: { fontSize: '1.5vmin', fill: '#000000' } },
                //         ticks: { text: { fontSize: '2vmin', fill: '#000000' } },
                //     },
                // }}
                // axisBottom={{
                //     tickSize: 5,
                //     tickPadding: 5,
                //     tickRotation: 0,
                //     legendPosition: 'middle',
                //     legendOffset: 20,
                // }}
                // axisLeft={{
                //     tickSize: 1,
                //     tickPadding: 20,
                //     tickRotation: 0,
                //     legendPosition: 'middle',
                //     legendOffset: -40,
                // }}
                enableGridY={true}
                enableLabel={true}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'top-right',
                        direction: 'row',
                        translateX: 30,
                        translateY: -110,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 2,
                        symbolSize: 20,
                        itemDirection: 'left-to-right',
                    },
                ]}
            />
        </BarsMainDivBox>
    );
};

export default BarGraph;
