import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, type FieldArrayPath } from "react-hook-form";
import { z } from "zod";
import { JobCreationSchema } from "@/schemas/JobCreationSchema";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { BadgeX } from "lucide-react";

type FormValues = z.infer<typeof JobCreationSchema>;

interface CreatePostFormProps {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ setForm }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(JobCreationSchema),
    defaultValues: {
      title: "",
      position: "full-time",
      description: "",
      jobType: "remote",
      domain: "",
      salary: "",
      requirements: [""],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements" as FieldArrayPath<FormValues>,
  });

  function handleSubmit(values: FormValues) {
    const requirementsObj = values.requirements.reduce((acc, val, i) => {
      acc[`req${i + 1}`] = val;
      return acc;
    }, {} as Record<string, string>);

    console.log({ ...values, requirements: requirementsObj });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="relative space-y-6 w-4/5 mx-auto p-6 bg-white rounded-lg shadow-md mt-20 md:w-3/5 lg:w-2/5"
      >
        <h1 className="text-center text-2xl font-bold">Create Job</h1>
        <div
          className="absolute top-0 right-4 cursor-pointer"
          onClick={() => {
            form.reset();
            setForm(false);
          }}
        >
          <BadgeX />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Job Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full-Time</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Job description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <div className="space-y-4 flex flex-col">
          <FormLabel>Requirements</FormLabel>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`requirements.${index}` as const}
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormControl>
                    <Input
                      placeholder={`Requirement # ${index + 1}`}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    size="icon"
                    disabled={fields.length === 1}
                  >
                    <BadgeX className="w-4 h-4" />
                  </Button>
                </FormItem>
              )}
            />
          ))}
          <Button type="button" onClick={() => append("")}>
            + Add Requirement
          </Button>
        </div>
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="e.g., IT, Marketing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input type="text" placeholder="50000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
