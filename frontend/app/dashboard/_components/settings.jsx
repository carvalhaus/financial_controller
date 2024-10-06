"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const settingsFormSchema = z.object({
  username: z.string().min(4, { message: "Esse campo é obrigatório" }),
  name: z.string().min(4, { message: "Esse campo é obrigatório" }),
  email: z.string().email({ message: "Esse campo é obrigatório" }),
  birthday: z.date(),
});

function SettingsModal({ userData }) {
  const settingsForm = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      username: userData.username,
      name: userData.name,
      email: userData.email,
      birthday: userData.birthday,
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <DialogContent className="p-5 w-11/12 rounded-md">
      <DialogHeader>
        <DialogTitle>Configurações</DialogTitle>
        <DialogDescription>
          Gerencia as configurações da sua conta e suas preferências.
        </DialogDescription>
      </DialogHeader>

      <Form {...settingsForm}>
        <form
          onSubmit={settingsForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={settingsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={settingsForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={settingsForm.control}
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
            control={settingsForm.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Data de nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal border-[#292E33]/40",
                          !field.value &&
                            "text-muted-foreground border-2 border-red-700"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose asChild>
            <Button className="w-full text-lg">Salvar</Button>
          </DialogClose>
        </form>
      </Form>
    </DialogContent>
  );
}

export default SettingsModal;
