/*2. Создайте файл `finance.ts`, в котором определите пространство имен `Finance`.
Внутри него создайте классы:
`LoanCalculator`, который рассчитывает ежемесячные платежи по кредиту по формуле аннуитета.
`TaxCalculator`, который рассчитывает налог на доход.
Используйте эти классы в файле `main.ts` для расчета платежей по кредиту и налога на примерных данных. */
// ежемесячные платежи по кредиту по формуле аннуитета
export var Finance;
(function (Finance) {
    class LoanCalculator {
        principal;
        rate;
        months;
        constructor(principal, rate, months) {
            this.principal = principal;
            this.rate = rate;
            this.months = months;
        }
        calculateMonthlyPayment() {
            const monthlyRate = this.rate / 12 / 100;
            return (this.principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -this.months)); // Формула для рассчета аннуитета
        }
    }
    Finance.LoanCalculator = LoanCalculator;
    // рассчитывает налог на доход
    class TaxCalculator {
        income;
        taxRate;
        constructor(income, taxRate) {
            this.income = income;
            this.taxRate = taxRate;
        }
        calculateTax() {
            return (this.income * this.taxRate) / 100;
        }
    }
    Finance.TaxCalculator = TaxCalculator;
})(Finance || (Finance = {}));
//# sourceMappingURL=finance.js.map