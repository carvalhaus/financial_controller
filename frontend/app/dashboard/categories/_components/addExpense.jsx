"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function AddExpense() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-4 py-4 px-6 bg-white border border-softGray rounded-md drop-shadow w-full md:w-96">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Adicionar despesa
      </h2>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="" />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="username">Valor</Label>
          <Input id="username" defaultValue="" />
        </div>

        <Button
          onClick={(e) => {
            e.preventDefault();
            toast({
              title: "Sua despesa foi adicionada com sucesso!",
            });
          }}
        >
          Adicionar
        </Button>
      </form>
    </div>
  );
}

export default AddExpense;
