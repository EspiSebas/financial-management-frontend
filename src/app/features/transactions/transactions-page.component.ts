import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TransactionType = 'Ingreso' | 'Gasto';
interface Transaction { id: number; description: string; category: string; amount: number; type: TransactionType; date: string; }

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe, NgFor, NgClass],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent {
  transactions: Transaction[] = [
    { id: 1, description: 'Salario mensual', category: 'Salario', amount: 3200000, type: 'Ingreso', date: '2026-09-01' },
    { id: 2, description: 'Mercado semanal', category: 'Alimentación', amount: 185000, type: 'Gasto', date: '2026-08-30' },
    { id: 3, description: 'Recarga de transporte', category: 'Transporte', amount: 60000, type: 'Gasto', date: '2026-08-29' }
  ];
  newTransaction: Omit<Transaction, 'id'> = { description: '', category: 'Alimentación', amount: 0, type: 'Gasto', date: new Date().toISOString().slice(0, 10) };

  addTransaction(): void {
    if (!this.newTransaction.description.trim() || this.newTransaction.amount <= 0) return;
    this.transactions = [{ ...this.newTransaction, description: this.newTransaction.description.trim(), id: Date.now() }, ...this.transactions];
    this.newTransaction = { description: '', category: 'Alimentación', amount: 0, type: 'Gasto', date: new Date().toISOString().slice(0, 10) };
  }
}
