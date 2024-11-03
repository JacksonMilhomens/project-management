import { Project } from '../entity/Project';

export class ProjectPresenter {
  constructor(private readonly project: Project) {}

  toJSON() {
    return {
      id: this.project.id,
      name: this.project.name,
      department: this.project.department,
      requester: this.project.requester,
      description: this.project.description,
      status: this.project.status,
      goal: this.project.goal,
      impactStakeholders: this.project.impactStakeholders,
      complexity: this.project.complexity,
      monthlyRequests: this.project.monthlyRequests,
      averageTimeSpent: this.project.averageTimeSpent,
      monthlyMinutesSaved: this.project.monthlyMinutesSaved,
      financialGain: this.formatCurrency(this.project.financialGain),
      rangeOfGain: this.project.rangeOfGain,
      priorityLevel: this.project.priorityLevel,
      requestDate: this.formatDate(this.project.requestDate),
      createdAt: this.formatDate(this.project.createdAt),
      updatedAt: this.formatDate(this.project.updatedAt),
    };
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }
}
