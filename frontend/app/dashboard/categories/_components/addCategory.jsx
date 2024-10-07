"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useApi } from "@/contexts/contextApi";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker from "emoji-picker-react";
import react from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addCategoryFormSchema = z.object({
  name: z.string().min(4, { message: "Esse campo é obrigatório" }),
  amount: z.coerce
    .number()
    .positive({ message: "O limite deve ser maior que zero" }),
});

function AddCategory() {
  const { toast } = useToast();

  const [emojiIcon, setEmojiIcon] = react.useState("🙄");
  const [openEmojiPicker, setOpenEmojiPicker] = react.useState(false);
  const { userData } = useApi();

  const [open, setOpen] = react.useState(false);

  const addCategoryForm = useForm({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  async function onSubmit(values) {
    const combinedValues = {
      userId: userData.id,
      icon: emojiIcon,
      ...values,
    };

    const errorToast = (err) => {
      toast({
        title: `${err}`,
        variant: "destructive",
      });
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/categories/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedValues),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar categoria.");
      }

      console.log("Categoria criada com sucesso!");

      addCategoryForm.reset();
      setOpen(false);
    } catch (error) {
      console.error("Erro na requisição:", error);
      errorToast(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="md:w-2/3 lg:w-96">
        <div className="flex items-center justify-center bg-white border border-softGray rounded-md drop-shadow lg:w-96 h-[158px] md:h-[174px] text-4xl cursor-pointer hover:drop-shadow-lg transition duration-150 ease-out hover:ease-in">
          &#43;
        </div>
      </DialogTrigger>

      <DialogContent className="w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle>Criar Categoria</DialogTitle>
          <DialogDescription>
            Crie uma categoria para organizar suas despesas!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div>
            <Button
              variant="outline"
              className="text-lg size-10 border border-[#292E33]/40"
              onClick={(e) => {
                e.preventDefault();
                setOpenEmojiPicker(!openEmojiPicker);
              }}
            >
              {emojiIcon}
            </Button>
            <div className="absolute">
              <EmojiPicker
                open={openEmojiPicker}
                onEmojiClick={(e) => {
                  setEmojiIcon(e.emoji);
                  setOpenEmojiPicker(false);
                }}
              />
            </div>
          </div>

          <Form {...addCategoryForm}>
            <form
              onSubmit={addCategoryForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={addCategoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Nome da categoria
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ex. Moradia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addCategoryForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Limite da categoria
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex. R$ 300,00"
                        type="number"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full text-lg">Criar</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategory;
