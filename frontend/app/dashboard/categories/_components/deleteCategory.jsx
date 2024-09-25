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

function DeleteCategory() {
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
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategory;
