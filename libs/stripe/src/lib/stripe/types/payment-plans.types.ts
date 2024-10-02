const premiumUserRoleId = 'f272449a-8e27-4cd5-ad92-329697a40efb';
const enterpriseUserRoleId =
  '83f0fb5f-e4b1-4f10-8281-37ffa6802cfd';


export type PaymentPlansTypes = 'premium' | 'enterprise';

export const PaymentPlans: {
  name: PaymentPlansTypes;
  price: number;
  text: string;
  assignedUserRole: string;
  priceId: string;
  userType: 'normal' | 'project';
}[] = [
  {
    name: 'premium',
    price: 299,
    text: 'Premium',
    assignedUserRole: premiumUserRoleId,
    priceId: '',
    userType: 'normal',
  },
  {
    name: 'enterprise',
    price: 300,
    text: 'Enterprise',
    assignedUserRole: enterpriseUserRoleId,
    priceId: '',
    userType: 'normal',
  },
];