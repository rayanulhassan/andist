export enum UserTypes {
  General,
  OpenDashboard
};

export interface User {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  role: string;
  isPaid:boolean;
  type: UserTypes;
}
