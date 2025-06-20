import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { JobApplicationSchema } from "../../schemas/JobApplicationSchema";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { applyForJob } from "../../api/services/userService";

type FormValues = z.infer<typeof JobApplicationSchema>;

const ApplyJobForm: React.FC = () => {
  const jobId = useParams<{ id: string }>().id;
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle toast notifications when status changes
  useEffect(() => {
    if (submitStatus === "success") {
      console.log(
        "Application submitted successfully! Thank you for applying. We will get back to you soon."
      );
      navigate("/careers");
    } else if (submitStatus === "error") {
      console.log("Application submission failed. Please try again later.");
    }
  }, [submitStatus]);

  // console.log("Job ID:", jobId);

  const form = useForm<FormValues>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      lastEducation: "intermediate",
      yearOfPassing: "",
      expectedSalary: "",
      availability: "remote",
      resume: undefined as unknown as File,
      jobPostingsId: jobId ? parseInt(jobId, 10) : undefined, // Ensure jobId is a number
    },
  });

  // Custom reset function that also clears file input
  const resetForm = () => {
    form.reset({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      lastEducation: "intermediate",
      yearOfPassing: "",
      expectedSalary: "",
      availability: "remote",
      resume: undefined as unknown as File,
      jobPostingsId: jobId ? parseInt(jobId, 10) : undefined, // Reset jobPostingId
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  async function handleSubmit(values: FormValues) {
    try {
      setSubmitStatus("idle");

      if (!jobId) {
        toast.error("Job ID is missing. Please try again.");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("address", values.address || "");
      formData.append("lastEducation", values.lastEducation);
      formData.append("yearOfPassing", values.yearOfPassing);
      formData.append("expectedSalary", values.expectedSalary);
      formData.append("availability", values.availability);
      formData.append("jobPostingsId", jobId);

      // Append the actual file object, not just the filename
      if (values.resume) {
        formData.append("resume", values.resume);
      }

      console.log("Form submitted with data:");
      // Log form data entries for debugging
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, value.name, value.size, value.type);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Call the actual API
      const response = await applyForJob(formData);

      if (response && response.status) {
        console.log("Form submission completed successfully!");
        setSubmitStatus("success");
        // Reset form after successful submission
        setTimeout(() => {
          resetForm();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
      toast.error("Failed to submit application. Please try again.");

      // Reset error status after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }
  }

  return (
    <>
      {/* Show loader overlay when form is submitting */}
      {form.formState.isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader />
            <p className="mt-4 text-gray-700 font-medium">
              Submitting your application...
            </p>
          </div>{" "}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={`relative space-y-6 w-4/5 mx-auto p-6 bg-white rounded-lg shadow-md my-10 md:w-3/5 lg:w-2/5 ${
            form.formState.isSubmitting ? "pointer-events-none opacity-75" : ""
          }`}
        >
          <h1 className="text-center text-2xl font-bold">Job Application</h1>{" "}
          <div
            className="absolute top-0 right-4 cursor-pointer"
            onClick={() => {
              resetForm();
            }}
          ></div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe12@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="03xx-xxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R-16, Defence, Phase VI, Karachi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastEducation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Education</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="intermediate" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearOfPassing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Of Passing</FormLabel>
                <FormControl>
                  <Input placeholder="2019" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expectedSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Salary</FormLabel>
                <FormControl>
                  <Input placeholder="50000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Availability</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Remote" />
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
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={`w-full ${
              form.formState.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ApplyJobForm;
