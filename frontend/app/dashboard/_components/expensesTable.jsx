import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import trash from "@/public/trash-x.svg";
import Image from "next/image";
import EditExpense from "./editExpense";
import DeleteExpense from "./deleteExpense";

const expenses = [
  {
    id: 1,
    name: "Supermercado",
    amount: 250.5,
    category: "Alimentação",
    date: "2024-09-15",
  },
  {
    id: 2,
    name: "Academia",
    amount: 100.0,
    category: "Saúde",
    date: "2024-09-01",
  },
  {
    id: 3,
    name: "Conta de Luz",
    amount: 150.75,
    category: "Utilidades",
    date: "2024-09-10",
  },
  {
    id: 4,
    name: "Gasolina",
    amount: 120.0,
    category: "Transporte",
    date: "2024-09-12",
  },
  {
    id: 5,
    name: "Assinatura Netflix",
    amount: 39.9,
    category: "Entretenimento",
    date: "2024-09-05",
  },
  {
    id: 6,
    name: "Jantar Restaurante",
    amount: 85.0,
    category: "Alimentação",
    date: "2024-09-08",
  },
  {
    id: 7,
    name: "Medicamentos",
    amount: 60.25,
    category: "Saúde",
    date: "2024-09-14",
  },
  {
    id: 8,
    name: "Aluguel",
    amount: 1200.0,
    category: "Moradia",
    date: "2024-09-01",
  },
  {
    id: 9,
    name: "Internet",
    amount: 99.9,
    category: "Utilidades",
    date: "2024-09-02",
  },
  {
    id: 10,
    name: "Cinema",
    amount: 45.0,
    category: "Entretenimento",
    date: "2024-09-07",
  },
  {
    id: 11,
    name: "Manutenção do Carro",
    amount: 350.0,
    category: "Transporte",
    date: "2024-09-11",
  },
  {
    id: 12,
    name: "Roupas",
    amount: 200.0,
    category: "Vestuário",
    date: "2024-09-13",
  },
  {
    id: 13,
    name: "Plano de Saúde",
    amount: 450.0,
    category: "Saúde",
    date: "2024-09-03",
  },
  {
    id: 14,
    name: "Café da manhã",
    amount: 15.5,
    category: "Alimentação",
    date: "2024-09-04",
  },
  {
    id: 15,
    name: "Material de Escritório",
    amount: 35.0,
    category: "Trabalho",
    date: "2024-09-06",
  },
];

export function ExpensesTable({ pathname }) {
  return (
    <Table className="bg-white border border-softGray rounded-md drop-shadow text-center ">
      <TableHeader className="">
        <TableRow>
          <TableHead className="text-primary text-base text-center">
            Nome
          </TableHead>
          <TableHead className="text-primary text-base w-28 text-center">
            Valor
          </TableHead>
          <TableHead className="text-primary text-base w-44 text-center">
            Categoria
          </TableHead>
          <TableHead className="text-primary text-base w-28 text-center">
            Data
          </TableHead>
          {pathname !== "/dashboard" && (
            <TableHead className="text-primary text-base w-28 text-center">
              Ações
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{expense.name}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{expense.date}</TableCell>
            {pathname !== "/dashboard" && (
              <TableCell className="flex items-center justify-center gap-3">
                <EditExpense expense={expense} />

                <DeleteExpense expense={expense} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
