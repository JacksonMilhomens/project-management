import { RangeOfGain } from './enums/RangeOfGain';

export class FinancialImpact {
  constructor(
    private readonly financialGain: number,
    private readonly rangeOfGain: RangeOfGain,
  ) {}
}
