"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
    email: z.string().email({ message: "Esse campo é obrigatório" }),
    password: z.string().min(4, { message: "Esse campo é obrigatório" }),
    confirmPassword: z.string().min(4, { message: "Esse campo é obrigatório" }),
})

function Register() {
    const registerForm = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    function onSubmit(values) {
        console.log(values)
    }

    return (
        <div className="flex flex-col gap-6 w-full text-center">
            <h3 className="scroll-m-20 text-4xl font-semibold tracking-tight">Cadastrar</h3>

            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    <FormField control={registerForm.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="exemplo@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField control={registerForm.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Senha</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="**********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField control={registerForm.control} name="confirmPassword" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Confirmar senha</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="**********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <Button className="w-full">Cadastrar</Button>
                </form>
            </Form>

            <small className="text-sm leading-none">Já possui uma conta? {" "}
                <Link href="login" className="font-medium hover:text-softBlue">
                    Entre
                </Link>
            </small>
        </div>
    );
}

export default Register;