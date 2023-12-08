import categories from "@/data/categories";
import { tokens } from "@/styles/theme";

export const generateTotalExpense = (records) => {
	var totalSpent = 0;
	records?.forEach((r) => {
		totalSpent += r.amount;
	});
	return totalSpent;
};

export const generateHighestExpense = (records) => {
	var highestSingleExpense = 0;
	records?.forEach((r) => {
		if (r.amount > highestSingleExpense) highestSingleExpense = r.amount;
	});
	return highestSingleExpense;
};

export const generateTopSpendingCategory = (records) => {
	let maxAmount = 0;
	let maxCategory = null;

	const accumulatedAmounts = accumulateAmountByCategory(records);

	Object.keys(accumulatedAmounts).forEach((category) => {
		if (accumulatedAmounts[category] > maxAmount) {
			maxAmount = accumulatedAmounts[category];
			maxCategory = category;
		}
	});

	return maxCategory;
};

export const generateExpenditureDetails = (records) => {
	var receiptYears = [];

	records?.forEach((r) => {
		const dateObj = new Date(r.date);
		if (!receiptYears.includes(dateObj.getFullYear())) {
			receiptYears.push(dateObj.getFullYear());
		}
	});

	receiptYears.sort((a, b) => a - b);

	const transformRecords = receiptYears.slice(-3).map((year, idx) => {
		const receipts = records.filter(
			(r) => new Date(r.date).getFullYear() === year
		);

		return {
			id: year,
			color: colors[idx],
			data: months.map((month) => {
				const monthAmount = receipts
					.filter((r) => new Date(r.date).getMonth() === months.indexOf(month))
					.reduce((sum, r) => sum + r.amount, 0);
				return { ...month, y: monthAmount };
			}),
		};
	});

	return transformRecords;
};

export const generatePast6MonthsDetails = (records) => {
	const getPastSixMonths = () => {
		const today = new Date();
		const sixMonthsAgo = new Date();
		sixMonthsAgo.setMonth(today.getMonth() - 5);
		return records?.filter((r) => new Date(r.date) >= sixMonthsAgo);
	};

	const transformRecords = () => {
		const recentSixMonthsRecords = getPastSixMonths();

		const monthNames = Array.from({ length: 6 }, (_, idx) => {
			const date = new Date();
			date.setMonth(date.getMonth() - idx);
			return new Intl.DateTimeFormat("en", {
				month: "short",
			}).format(date);
		});

		const transformedData = monthNames.map((monthName) => {
			const recordsForMonth = recentSixMonthsRecords?.filter(
				(record) =>
					new Intl.DateTimeFormat("en", { month: "short" }).format(
						new Date(record.date).getMonth()
					) === monthName
			);

			const categoryWiseExpenses = { month: monthName };

			recordsForMonth?.forEach((record) => {
				if (!categoryWiseExpenses[record.category]) {
					categoryWiseExpenses[record.category] = 0;
				}
				categoryWiseExpenses[record.category] += record.amount;
			});

			return categoryWiseExpenses;
		});

		transformedData
			.sort((a, b) => new Date(a.month) - new Date(b.month))
			.reverse();

		return transformedData;
	};

	const result = transformRecords();

	return result;
};

const months = [
	{ x: "Jan" },
	{ x: "Feb" },
	{ x: "Mar" },
	{ x: "Apr" },
	{ x: "May" },
	{ x: "Jun" },
	{ x: "Jul" },
	{ x: "Aug" },
	{ x: "Sep" },
	{ x: "Oct" },
	{ x: "Nov" },
	{ x: "Dec" },
];

const colors = [
	tokens("dark").greenAccent[500],
	tokens("dark").blueAccent[300],
	tokens("dark").redAccent[200],
];

const accumulateAmountByCategory = (records) => {
	const accumulatedAmounts = {};
	categories.forEach((category) => {
		accumulatedAmounts[category] = 0;
	});
	records?.forEach((record) => {
		const { category, amount } = record;

		if (categories.includes(category)) {
			accumulatedAmounts[category] += amount;
		}
	});
	return accumulatedAmounts;
};
