"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createExpenseFormSchema = z.object({
  name: z.string().min(4, { message: "Esse campo é obrigatório" }),
  amount: z.coerce
    .number()
    .positive({ message: "O limite deve ser maior que zero" }),
});

function AddExpense({ id, fetchProtectedData }) {
  const { toast } = useToast();

  const createExpenseForm = useForm({
    resolver: zodResolver(createExpenseFormSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  const errorToast = (err) => {
    toast({
      title: `${err}`,
      variant: "destructive",
    });
  };

  async function onSubmit(values) {
    const combinedValues = {
      ...values,
      categoryId: id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/expenses/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedValues),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar despesa.");
      }

      createExpenseForm.reset();
      fetchProtectedData();
    } catch (error) {
      console.error("Erro na requisição:", error);
      errorToast(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4 px-6 bg-white border border-softGray rounded-md drop-shadow w-full md:w-96">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Adicionar despesa
      </h2>

      <Form {...createExpenseForm}>
        <form
          onSubmit={createExpenseForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={createExpenseForm.control}
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
            control={createExpenseForm.control}
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
    </div>
  );
}

export default AddExpense;
