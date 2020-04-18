import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public findById({ id }: Transaction): Transaction | null {
    const transaction = this.transactions.find(e => e.id === id);

    return transaction || null;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        income = transaction.value + income;
        return 0;
      }
      if (transaction.type === 'outcome') {
        outcome = transaction.value + outcome;
        return 0;
      }
      return 0;
    });

    total = income - outcome;

    const transaction = {
      income,
      outcome,
      total,
    };

    return transaction;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
