/*2. Создайте файл `finance.ts`, в котором определите пространство имен `Finance`. 
Внутри него создайте классы:
`LoanCalculator`, который рассчитывает ежемесячные платежи по кредиту по формуле аннуитета.
`TaxCalculator`, который рассчитывает налог на доход.
Используйте эти классы в файле `main.ts` для расчета платежей по кредиту и налога на примерных данных. */

// ежемесячные платежи по кредиту по формуле аннуитета
export namespace Finance {
  export class LoanCalculator {
    constructor(
      private principal: number,
      private rate: number,
      private months: number
    ) {}

    public calculateMonthlyPayment(): number {
      const monthlyRate = this.rate / 12 / 100;
      return (this.principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -this.months)); // Формула для рассчета аннуитета
    }
  }

  // рассчитывает налог на доход
  export class TaxCalculator {
    constructor(private income: number, private taxRate: number) {}

    public calculateTax(): number {
      return (this.income * this.taxRate) / 100;
    }
  }
}
