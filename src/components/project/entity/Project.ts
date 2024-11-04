import { Complexity } from '../domain/enums/Complexity';
import { RangeOfGain } from '../domain/enums/RangeOfGain';
import { ProjectStatus } from '../domain/enums/Status';

export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly department: string,
    public readonly requester: string,
    public readonly description: string,
    public readonly status: ProjectStatus,
    public readonly goal: string,
    public readonly impactStakeholders: boolean,
    public readonly complexity: Complexity,
    public readonly monthlyRequests: number,
    public readonly averageTimeSpent: number,
    public readonly requestDate: Date,
    public readonly externalId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  get monthlyMinutesSaved(): number {
    return this.monthlyRequests * this.averageTimeSpent;
  }

  get financialGain(): number {
    return (this.monthlyMinutesSaved / 60) * 30.6;
  }

  get rangeOfGain(): RangeOfGain {
    const financialGain = this.financialGain;

    if (financialGain > 25000) return RangeOfGain.ABOVE_25000;
    if (financialGain > 10000) return RangeOfGain.UP_TO_25000;
    if (financialGain > 5000) return RangeOfGain.UP_TO_10000;
    if (financialGain > 1000) return RangeOfGain.UP_TO_5000;
    if (financialGain > 0) return RangeOfGain.UP_TO_1000;
    return RangeOfGain.NO_INFO;
  }

  get priorityLevel(): number {
    const impactScore = this.impactStakeholders ? 5 : 0;
    const complexityScore = this.getComplexityScore();
    const rangeOfGainScore = this.getRangeOfGainScore();
    const requestDateScore = this.calculateRequestDateScore();

    return impactScore + complexityScore + rangeOfGainScore + requestDateScore;
  }

  private getComplexityScore(): number {
    switch (this.complexity) {
      case Complexity.HIGH:
        return 1;
      case Complexity.MEDIUM:
        return 2;
      case Complexity.LOW:
        return 4;
      default:
        return 0;
    }
  }

  private getRangeOfGainScore(): number {
    switch (this.rangeOfGain) {
      case RangeOfGain.NO_INFO:
        return 0;
      case RangeOfGain.UP_TO_1000:
        return 1;
      case RangeOfGain.UP_TO_5000:
        return 3;
      case RangeOfGain.UP_TO_10000:
        return 5;
      case RangeOfGain.UP_TO_25000:
        return 7;
      case RangeOfGain.ABOVE_25000:
        return 10;
      default:
        return 0;
    }
  }

  private calculateRequestDateScore(): number {
    const daysSinceRequest = (new Date().getTime() - this.requestDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.trunc(daysSinceRequest / 60);
  }
}
