import Image from "next/image";
import edit from "@/public/edit.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";

const editExpenseFormSchema = z.object({
  name: z.string().min(4, { message: "Esse campo é obrigatório" }),
  amount: z.coerce
    .number()
    .positive({ message: "O limite deve ser maior que zero" }),
});

function EditExpense({ expense, fetchProtectedData }) {
  const [open, setOpen] = React.useState(false);

  const editExpenseForm = useForm({
    resolver: zodResolver(editExpenseFormSchema),
    defaultValues: {
      name: expense.name,
      amount: expense.amount,
    },
  });

  async function updateExpense(data) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/expenses/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar os dados!");
      }

      console.log("Dados atualizados com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  }

  async function onSubmit(values) {
    const updateValue = { id: expense.id, ...values };
    const updateComparable = {
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
    };

    const comparedData =
      JSON.stringify(updateComparable) === JSON.stringify(updateValue);

    if (!comparedData) {
      console.log("Atualizando dados");

      const isUpdated = await updateExpense(updateValue);

      if (isUpdated) {
        fetchProtectedData();
      }
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <Form {...editExpenseForm}>
          <form
            onSubmit={editExpenseForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={editExpenseForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Nome da despesa</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. Açaí" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editExpenseForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Valor da despesa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. R$ 20,00"
                      type="number"
                      min="1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full text-lg">Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpense;
