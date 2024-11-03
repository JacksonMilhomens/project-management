export class ProjectMetrics {
  constructor(
    private readonly monthlyRequests: number,
    private readonly averageTimeSpent: number,
    private readonly monthlyMinutesSaved: number,
  ) {}
}
