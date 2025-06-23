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
import { useAuth } from "@/contexts/AuthContext";
import { createJob } from "@/api/services";

type FormValues = z.infer<typeof JobCreationSchema>;

interface CreatePostFormProps {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchJobs: () => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  setForm,
  fetchJobs,
}) => {
  const { setIsFormOpen } = useAuth();
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
  async function handleSubmit(values: FormValues) {
    try {
      // Filter out empty requirements and keep as array
      const filteredRequirements = values.requirements.filter(
        (req) => req.trim() !== ""
      );

      const submissionData = {
        ...values,
        requirements: filteredRequirements, // Keep as JSON array
        pageId: 3,
      };

      console.log("Submitting job data:", submissionData);

      const response = await createJob(submissionData);
      if (response && response.status) {
        console.log("Job created successfully:", response);
        // Refresh job postings after successful creation
        // Close the form and reset it
        setIsFormOpen(false);
        await fetchJobs();
        form.reset();
        setForm(false);
      } else {
        console.error("Failed to create job posting:", response);
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  }
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="relative p-8 space-y-6 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Create Job</h1>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => {
                setIsFormOpen(false);
                form.reset();
                setForm(false);
              }}
            >
              <BadgeX className="w-6 h-6 text-gray-500" />
            </button>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[10000]">
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
                  <Textarea
                    placeholder="Job description..."
                    className="min-h-[100px]"
                    {...field}
                  />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[10000]">
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <FormLabel>Requirements</FormLabel>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`requirements.${index}` as const}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormControl className="flex-1">
                        <Input
                          placeholder={`Requirement ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        size="icon"
                        disabled={fields.length === 1}
                        className="shrink-0"
                      >
                        <BadgeX className="w-4 h-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              onClick={() => append("")}
              variant="outline"
              className="w-full"
            >
              + Add Requirement
            </Button>
          </div>

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Domain" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[10000]">
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
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

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsFormOpen(false);
                form.reset();
                setForm(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary-blue hover:bg-primary-blue/90"
            >
              Create Job
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostForm;
