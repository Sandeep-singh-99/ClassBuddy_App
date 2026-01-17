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


export interface IStudentGroupSubscription {
  teacher: {
    id: string;
    name: string;
    email: string;
    image_url?: string;
  };
  group: {
    id: string;
    name: string;
    description: string;
    image_url?: string;
  };
  plans: IPlan[];
  subscription: ISubscription | null;
}


export interface IPlan {
  id: string;
  group_id: string;
  group_name?: string;
  plan_name: string;
  amount: number;
  validity_days: number;
  created_at: string;
}


export interface ISubscription {
  id: string;
  group_id: string;
  plan_id: string;
  amount: number;
  start_date: string;
  valid_till: string;
  is_active: boolean;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  created_at: string;
  updated_at: string;
}
