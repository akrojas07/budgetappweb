export class GoalsRequest {
    Id: number;
    UserId: number;
    GoalName: string;
    GoalSummary: string;
    GoalAmount: number;
    StartDate: Date;
    EndDate: Date;
    TargetAmount: number;
    Progress: number;
    DaysRemaining: number;
}
