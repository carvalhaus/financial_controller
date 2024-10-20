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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Esse campo é obrigatório" }),
  password: z.string().min(4, { message: "Esse campo é obrigatório" }),
});

function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const endpoint =
      "https://financial-controller-xck7.onrender.com/api/sessions/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Enviar cookies
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: data.error,
        });
      }
    } catch (err) {
      toast({
        title: err,
      });
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full text-center">
      <h3 className="scroll-m-20 text-4xl font-semibold tracking-tight">
        Entrar
      </h3>

      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={loginForm.control}
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
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Entrar</Button>
        </form>
      </Form>

      <small className="text-sm leading-none">
        Não possui uma conta?{" "}
        <Link href="register" className="font-medium hover:text-softBlue">
          Cadastre-se
        </Link>
      </small>
    </div>
  );
}

export default Login;
