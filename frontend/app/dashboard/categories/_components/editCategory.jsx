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
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker from "emoji-picker-react";
import react from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editCategoryFormSchema = z.object({
  name: z.string().min(4, { message: "Esse campo é obrigatório" }),
  amount: z.coerce
    .number()
    .positive({ message: "O limite deve ser maior que zero" }),
});

function EditCategory({ category, fetchProtectedData }) {
  const [open, setOpen] = react.useState(false);
  const [emojiIcon, setEmojiIcon] = react.useState(category?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = react.useState(false);

  const editCategoryForm = useForm({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      name: category?.name,
      amount: category?.amount,
    },
  });

  react.useEffect(() => {
    if (category) {
      editCategoryForm.reset({
        name: category.name,
        amount: category.amount,
      });
      setEmojiIcon(category.icon);
    }
  }, [category, editCategoryForm]);

  async function updateCategory(data) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/categories/update`,
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

      return true;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  }

  async function onSubmit(values) {
    const updatedValues = { id: category.id, ...values, icon: emojiIcon };

    const categoryComparable = {
      id: category.id,
      name: category.name,
      amount: category.amount,
      icon: category.icon,
    };

    const comparedData =
      JSON.stringify(categoryComparable) === JSON.stringify(updatedValues);

    if (!comparedData) {
      const isUpdated = await updateCategory(updatedValues);

      if (isUpdated) {
        fetchProtectedData();
      }
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button className="w-full">Editar categoria</Button>
      </DialogTrigger>

      <DialogContent className="w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>Edite a categoria selecionada</DialogDescription>
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

          <Form {...editCategoryForm}>
            <form
              onSubmit={editCategoryForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={editCategoryForm.control}
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
                control={editCategoryForm.control}
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

              <Button className="w-full text-lg">Editar</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategory;
