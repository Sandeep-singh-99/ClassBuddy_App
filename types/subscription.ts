export interface ISubscriptionPlan {
  id: string;
  group_id: string;
  group_name: string;
  plan_name: string;
  amount: number;
  validity_days: number;
  created_at: string;
  updated_at: string;
}

export interface IStats {
  total_students: number;
  total_earnings: number;
  paid_students: number;
}

export interface IPlanEarnings {
  name: string;
  value: number;
}

export interface IMonthlyTrend {
  name: string;
  [key: string]: number | string; // key is plan name, value is earnings (number) or date (string)
}

export interface IAnalytics {
  plan_earnings: IPlanEarnings[];
  monthly_trends: IMonthlyTrend[];
}
