import { ResponsivePie } from '@nivo/pie';
import { tokens } from '@/styles/theme';
import { useTheme } from '@emotion/react';

const PieChart = ({ data }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const totalAmount = data.reduce((acc, curr) => acc + curr.value, 0);
	console.log(totalAmount);

	return (
		<ResponsivePie
			data={data}
			theme={{
				fontSize: 14,
				legends: {
					text: {
						fontSize: 14,
					},
				},
			}}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			activeOuterRadiusOffset={8}
			colors={{ scheme: 'nivo' }}
			borderWidth={1}
			borderColor={{
				from: 'color',
				modifiers: [['darker', 0.2]],
			}}
			arcLinkLabelsSkipAngle={10}
			arcLinkLabelsTextColor={colors.grey[100]}
			arcLinkLabelsThickness={3}
			arcLinkLabelsColor={{ from: 'color' }}
			arcLabel={function (e) {
				return (
					((e.value / totalAmount) * 100).toFixed(2) + '% ($' + e.value + ')'
				);
			}}
			arcLabelsSkipAngle={10}
			arcLabelsTextColor={{
				from: 'color',
				modifiers: [['darker', 2]],
			}}
			legends={[
				{
					anchor: 'bottom',
					direction: 'row',
					justify: false,
					translateX: 0,
					translateY: 56,
					itemsSpacing: 0,
					itemWidth: 180,
					itemHeight: 18,
					itemTextColor: colors.grey[100],
					itemDirection: 'left-to-right',
					itemOpacity: 1,
					symbolSize: 18,
					symbolShape: 'circle',
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#000',
							},
						},
					],
				},
			]}
		/>
	);
};

export default PieChart;
