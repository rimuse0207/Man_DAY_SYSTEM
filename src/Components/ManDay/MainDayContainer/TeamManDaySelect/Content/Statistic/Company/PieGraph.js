import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieGraph = ({ Pie_State }) => {
    return (
        <div style={{ width: '100%', height: '40vh', textAlign: 'center' }}>
            <ResponsivePie
                data={Pie_State}
                margin={{ top: 100, right: 0, bottom: 80, left: 0 }}
                innerRadius={0}
                padAngle={1}
                cornerRadius={0}
                // colors={['#12203f', '#ebf0f5', '#ff6b6b', '#ffa800', '#00b48e']} // 커스터하여 사용할 때
                colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                borderWidth={0}
                arcLinkLabelsSkipAngle={0}
                arcLinkLabelsTextColor="#000000"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
                arcLabelsSkipAngle={10}
                theme={{
                    labels: {
                        text: {
                            fontSize: '1.3vmin',
                            fill: '#000000',
                        },
                    },
                    legends: {
                        text: {
                            fontSize: 15,
                            // fill: '#000000',
                        },
                    },
                }}
                legends={[
                    {
                        anchor: 'bottom', // 위치
                        direction: 'row', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 0, // chart와 X 간격
                        translateY: 56, // chart와 Y 간격
                        itemsSpacing: 20, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 18, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 1, // item opacity
                        symbolSize: 15, // symbol (색상 표기) 크기
                        symbolShape: 'square', // symbol (색상 표기) 모양
                    },
                ]}
            />
        </div>
    );
};
export default PieGraph;
