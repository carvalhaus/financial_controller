import Image from "next/image";
import edit from "@/public/edit.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function EditExpense({ expense }) {
  return (
    <Dialog>
      <DialogTrigger className="h-full">
        <Image
          src={edit}
          alt="Ícone de editar"
          className="cursor-pointer h-full"
        />
      </DialogTrigger>

      <DialogContent className="w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>

          <DialogDescription>Edite a despesa selecionada</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={expense?.name} />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Valor</Label>
            <Input id="username" defaultValue={expense?.amount} />
          </div>

          <Button type="submit">Editar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpense;
