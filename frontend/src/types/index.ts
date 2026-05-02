export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense'; // Só aceita esses dois textos
  category: string;
  date: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}