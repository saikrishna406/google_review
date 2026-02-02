
export enum View {
  MARKETING = 'MARKETING',
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  SEND_REQUESTS = 'SEND_REQUESTS',
  FEEDBACK_INBOX = 'FEEDBACK_INBOX',
  BILLING = 'BILLING',
  PUBLIC_RATING = 'PUBLIC_RATING'
}

export interface ReviewRequest {
  id: string;
  customerName: string;
  phoneNumber: string;
  status: 'sent' | 'delivered' | 'read' | 'completed' | 'failed';
  date: string;
  rating?: number;
}

export interface Feedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'new' | 'responded' | 'archived';
}

export interface User {
  id: string;
  email: string;
  businessName: string;
  plan: 'starter' | 'pro' | 'enterprise';
}
