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
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function DeleteCategory({ id }) {
  const router = useRouter();

  async function onDelete() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/categories/category/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao deletar a categoria!");
      }

      console.log("Categoria deletada com sucesso!");

      router.push("/dashboard/categories");
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full">
        <Button className="w-full" variant="destructive">
          Excluir categoria
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-11/12 rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir essa categoria?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar você irá excluir permanentemente essa categoria
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

export default DeleteCategory;
