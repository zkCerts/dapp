"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


export default function AttestForm({ handleAttestSubmit }: { handleAttestSubmit: () => void }) {
  const form = useForm()

  // 2. Define a submit handler.
  function onSubmit() {
    handleAttestSubmit()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="contractAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ContractAddress</FormLabel>
              <FormControl>
                <Input placeholder="0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941" {...field} />
              </FormControl>
              <FormDescription>
                Hypercert Contract Address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="11155111n"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TokenID</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                HyperCert Token ID
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chainID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>chainID</FormLabel>
              <FormControl>
                <Input placeholder="135772664401454446921886468365275516370944n" {...field} />
              </FormControl>
              <FormDescription>
                HyperCert Chain ID
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Attest</Button>
      </form>
    </Form>
  )
}
