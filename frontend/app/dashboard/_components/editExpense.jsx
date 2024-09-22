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
      <DialogTrigger>
        <Image src={edit} alt="Ícone de editar" className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>

          <DialogDescription>Edite a despesa selecionada</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <Input id="name" defaultValue={expense?.name} />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="username" className="">
              Valor
            </Label>
            <Input id="username" defaultValue={expense?.amount} />
          </div>

          <Button type="submit">Editar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpense;
