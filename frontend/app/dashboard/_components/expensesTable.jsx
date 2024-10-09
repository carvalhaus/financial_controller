import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditExpense from "./editExpense";
import DeleteExpense from "./deleteExpense";
import { usePathname } from "next/navigation";

export function ExpensesTable({ expenses }) {
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";
  const hasCategories = pathname.includes("categories");

  return (
    <Table className="bg-white border border-softGray rounded-md drop-shadow text-center table-auto">
      <TableHeader className="">
        <TableRow>
          <TableHead className="text-primary text-base text-center">
            Nome
          </TableHead>
          <TableHead className="text-primary text-base w-28 text-center px-0 md:px-4">
            Valor
          </TableHead>
          {hasCategories || (
            <TableHead className="text-primary text-base w-44 text-center px-3 md:px-4">
              Categoria
            </TableHead>
          )}

          <TableHead className="text-primary text-base w-28 text-center hidden md:table-cell">
            Data
          </TableHead>
          {isDashboard || (
            <TableHead className="text-primary text-base w-28 text-center">
              Ações
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses?.map((expense) => (
          <TableRow key={expense?.id}>
            <TableCell>{expense?.name}</TableCell>
            <TableCell className="px-0">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(expense?.amount)}
            </TableCell>
            {hasCategories || (
              <TableCell className="px-0">{expense?.category?.name}</TableCell>
            )}
            <TableCell className="hidden md:table-cell">
              {new Date(expense?.createdAt).toLocaleDateString("pt-BR")}
            </TableCell>
            {isDashboard || (
              <TableCell className="flex items-center justify-center gap-3 h-full align-middle">
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
