import type { EMIInput, EMIResult } from "@/types";

/**
 * Calculate EMI (Equated Monthly Installment) using standard formula:
 * EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
 */
export function calculateEMI(input: EMIInput): EMIResult {
	const { propertyPrice, downPaymentPercent, interestRate, loanTermYears } =
		input;

	const downPayment = (propertyPrice * downPaymentPercent) / 100;
	const loanAmount = propertyPrice - downPayment;
	const monthlyRate = interestRate / 12 / 100;
	const totalMonths = loanTermYears * 12;

	let emi = 0;
	if (loanAmount > 0 && monthlyRate > 0 && totalMonths > 0) {
		const pow = Math.pow(1 + monthlyRate, totalMonths);
		emi = (loanAmount * monthlyRate * pow) / (pow - 1);
	} else if (loanAmount > 0 && totalMonths > 0) {
		emi = loanAmount / totalMonths;
	}

	const totalPayment = emi * totalMonths;
	const totalInterest = totalPayment - loanAmount;

	// Monthly breakdown (amortization schedule)
	const monthlyBreakdown: EMIResult["monthlyBreakdown"] = [];
	let balance = loanAmount;
	for (let month = 1; month <= totalMonths && month <= 360; month++) {
		const interestPart = balance * monthlyRate;
		const principalPart = emi - interestPart;
		balance = Math.max(0, balance - principalPart);
		monthlyBreakdown.push({
			month,
			principal: principalPart,
			interest: interestPart,
			balance,
		});
	}

	return {
		loanAmount,
		downPayment,
		emi: Math.round(emi * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		totalPayment: Math.round(totalPayment * 100) / 100,
		monthlyBreakdown,
	};
}
