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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const invitationFormSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório.",
    })
    .email({ message: "O e-mail deve ser válido." }),
});

function FriendInvitation() {
  const [open, setOpen] = React.useState(false);
  const { userData } = useApi();

  const invitationForm = useForm({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function invitFriend(data) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/invit-friend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar convite!");
      }

      return true;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  }

  async function onSubmit(values) {
    const combinedData = {
      ...values,
      name: userData.name,
    };

    const inviteSent = await invitFriend(combinedData);

    if (inviteSent) {
      invitationForm.reset();
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full text-base" size="lg">
          Convide um amigo
        </Button>
      </DialogTrigger>

      <DialogContent className="w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle>Convidar um amigo</DialogTitle>
          <DialogDescription>
            Convide um amigo para ter a mesma experiência que você utilizando o{" "}
            <span className="italic font-medium">Treasr</span>!
          </DialogDescription>
        </DialogHeader>

        <Form {...invitationForm}>
          <form
            onSubmit={invitationForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={invitationForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full text-lg">Enviar convite</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FriendInvitation;
