import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import trash from "@/public/trash-x.svg";
import { buttonVariants } from "@/components/ui/button";

function DeleteExpense({ expense, fetchProtectedData }) {
  async function onDelete() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/expenses/expense/delete/${expense.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao deletar despesa!");
      }

      fetchProtectedData();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="h-full">
        <Image
          src={trash}
          alt="Ícone de deletar"
          className="cursor-pointer h-full"
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="w-11/12 rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir essa despesa?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar você irá excluir permanentemente essa despesa
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={onDelete}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteExpense;
