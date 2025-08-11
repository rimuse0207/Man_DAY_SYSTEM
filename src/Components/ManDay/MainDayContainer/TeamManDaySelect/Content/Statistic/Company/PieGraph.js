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
                tooltip={({ datum }) => (
                    <div style={{ padding: '6px 9px', background: 'white', border: '1px solid #ccc' }}>
                        <strong>{datum.data.name}</strong>: {datum.value}
                    </div>
                )}
                arcLabel={e => e.data.name}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        symbolSize: 15,
                        symbolShape: 'square',

                        // name으로 보이게 커스터마이징
                        label: datum => {
                            const matched = Pie_State.find(item => item.id === datum.id);
                            return matched ? matched.name : datum.id;
                        },
                    },
                ]}
            />
        </div>
    );
};
export default PieGraph;
