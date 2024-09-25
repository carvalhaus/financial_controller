"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const invitationFormSchema = z.object({
  email: z.string().email({ message: "Esse campo é obrigatório" }),
  message: z.string().min(10, { message: "Esse campo é obrigatório" }),
});

function FriendInvitation() {
  const invitationForm = useForm({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-base" size="lg">
          Convide um amigo
        </Button>
      </DialogTrigger>

      <DialogContent>
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

            <FormField
              control={invitationForm.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite uma mensagem para seu amigo aqui."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogClose asChild>
              <Button className="w-full text-lg">Enviar convite</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FriendInvitation;
