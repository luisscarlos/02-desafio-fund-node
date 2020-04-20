import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  balance = 0;

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions.reduce(
      (total: number, transaction: Transaction): number => {
        if (transaction.type === 'income') {
          const income = total + transaction.value;
          return income;
        }
        return total;
      },
      0,
    );

    const outcomeSum = this.transactions.reduce(
      (total: number, transaction: Transaction): number => {
        if (transaction.type === 'outcome') {
          const outcome = total + transaction.value;
          return outcome;
        }
        return total;
      },
      0,
    );

    this.balance = incomeSum - outcomeSum;

    const resume = {
      income: incomeSum,
      outcome: outcomeSum,
      total: this.balance,
    };

    return resume;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
