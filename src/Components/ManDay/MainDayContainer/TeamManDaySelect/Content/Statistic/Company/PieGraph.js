import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useOrdinalColorScale } from '@nivo/colors';

const PieGraph = ({ Pie_State }) => {
    const colorScale = useOrdinalColorScale({ scheme: 'nivo' }, 'id');

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            {/* 그래프 영역 */}
            <div style={{ width: '100%', height: '35vh' }}>
                <ResponsivePie
                    data={Pie_State}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    innerRadius={0}
                    padAngle={1}
                    cornerRadius={0}
                    colors={colorScale}
                    borderWidth={0}
                    arcLinkLabelsSkipAngle={0}
                    arcLinkLabelsTextColor="#000000"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLinkLabel={d => d.data.name}
                    arcLabelsSkipAngle={10}
                    arcLabel={d => d.value}
                    tooltip={({ datum }) => (
                        <div style={{ padding: '6px 9px', background: 'white', border: '1px solid #ccc' }}>
                            <strong>{datum.data.name}</strong>: {datum.value}
                        </div>
                    )}
                    theme={{
                        labels: {
                            text: {
                                fontSize: '1.3vmin',
                                fill: '#000000',
                            },
                        },
                    }}
                />
            </div>

            {/* 범례 영역 */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 20px',
                    justifyContent: 'center',
                    marginTop: '10px',
                    maxWidth: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                {Pie_State.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: colorScale(item),
                            }}
                        />
                        <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default PieGraph;
