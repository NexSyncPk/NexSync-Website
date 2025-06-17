import { Delete, Edit, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const TestimonialSection = () => {
  const [testimonialEdit, setTestimonialEdit] = useState(false);
  const [testimonialAdd, setTestimonialAdd] = useState(false);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<
    number | null
  >(null);

  // Testimonial Schema for both add and edit
  const testimonialSchema = z.object({
    name: z.string().min(1, "Name is required"),
    testimonial: z
      .string()
      .min(10, "Testimonial must be at least 10 characters"),
    designation: z.string().min(1, "Designation is required"),
    company: z.string().min(1, "Company is required"),
  });

  type TestimonialFormValues = z.infer<typeof testimonialSchema>;

  // Form for adding testimonials
  const {
    register: registerTestimonialAdd,
    handleSubmit: handleTestimonialAddSubmit,
    formState: { errors: errorsTestimonialAdd },
    reset: resetAddForm,
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      testimonial: "",
      designation: "",
      company: "",
    },
  });

  // Form for editing testimonials
  const {
    register: registerTestimonialEdit,
    handleSubmit: handleTestimonialEditSubmit,
    formState: { errors: errorsTestimonialEdit },
    reset: resetEditForm,
    setValue: setEditValue,
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      testimonial: "",
      designation: "",
      company: "",
    },
  });

  const onSubmitTestimonialAdd = (data: TestimonialFormValues) => {
    console.log("Testimonial Add Data Submitted:", data);
    // Here you would call your ADD API
    resetAddForm();
    setTestimonialAdd(false);
  };

  const onSubmitTestimonialEdit = (data: TestimonialFormValues) => {
    console.log(
      "Testimonial Edit Data Submitted:",
      data,
      "Index:",
      editingTestimonialIndex
    );
    // Here you would call your EDIT API with editingTestimonialIndex
    resetEditForm();
    setTestimonialEdit(false);
    setEditingTestimonialIndex(null);
  };

  const handleEditTestimonial = (index: number) => {
    const testimonialToEdit = testimonial[index];
    setEditingTestimonialIndex(index);

    // Prepopulate the edit form with existing values
    setEditValue("name", testimonialToEdit.name);
    setEditValue("testimonial", testimonialToEdit.testimonial);
    setEditValue("designation", testimonialToEdit.designation);
    setEditValue("company", testimonialToEdit.company);

    setTestimonialEdit(true);
  };

  const handleAddTestimonial = () => {
    resetAddForm(); // Ensure form is empty
    setTestimonialAdd(true);
  };

  const testimonial = [
    {
      name: "Jane Doe",
      testimonial:
        "Working with this team was a fantastic experience. Highly professional and always on time.",
      designation: "Marketing Manager",
      company: "CreativeCorp",
    },
    {
      name: "John Smith",
      testimonial:
        "The results exceeded our expectations. Great communication and support throughout.",
      designation: "CTO",
      company: "TechWave",
    },
    {
      name: "Alice Johnson",
      testimonial:
        "Exceptional quality and attention to detail. Will collaborate again!",
      designation: "CEO",
      company: "InnovateX",
    },
  ];

  return (
    <section className="w-full h-fit bg-white rounded-md shadow-lg mb-6">
      <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
        <h1 className="text-2xl font-bold">Testimonial Section</h1>
        <div className="flex items-center space-x-2">
          {(testimonialEdit || testimonialAdd) && (
            <X
              className="w-6 h-6 text-secondary-navy cursor-pointer"
              onClick={() => {
                setTestimonialEdit(false);
                setTestimonialAdd(false);
                setEditingTestimonialIndex(null);
                resetEditForm();
                resetAddForm();
              }}
            />
          )}
          {!testimonialAdd && !testimonialEdit && (
            <UserPlus
              className="cursor-pointer hover:scale-105"
              onClick={handleAddTestimonial}
            />
          )}
        </div>
      </div>

      {!testimonialEdit && !testimonialAdd ? (
        testimonial.length === 0 ? (
          <div className="p-6 text-gray-500 italic">
            No testimonials to show. Click the plus icon to add one.
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {testimonial.map((item, index) => (
              <div
                key={index}
                className="border rounded p-4 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center gap-x-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-secondary-navy">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.testimonial}</p>
                  <p className="text-sm text-secondary-steel">
                    {item.designation}, {item.company}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Edit
                    className="w-6 h-6 text-secondary-navy cursor-pointer"
                    onClick={() => handleEditTestimonial(index)}
                  />
                  <Delete
                    className="w-6 h-6 text-red-500 cursor-pointer ml-2"
                    onClick={() => {
                      // Handle delete logic here
                      console.log("Delete testimonial:", item.name);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      ) : testimonialEdit ? (
        <div className="w-full h-fit p-6">
          <h3 className="text-lg font-semibold mb-4 text-secondary-navy">
            Edit Testimonial
          </h3>
          <form
            onSubmit={handleTestimonialEditSubmit(onSubmitTestimonialEdit)}
            className="space-y-4"
          >
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                {...registerTestimonialEdit("name")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTestimonialEdit.name && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialEdit.name.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Testimonial</label>
              <textarea
                {...registerTestimonialEdit("testimonial")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
              />
              {errorsTestimonialEdit.testimonial && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialEdit.testimonial.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Designation</label>
              <input
                type="text"
                {...registerTestimonialEdit("designation")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTestimonialEdit.designation && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialEdit.designation.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <input
                type="text"
                {...registerTestimonialEdit("company")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTestimonialEdit.company && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialEdit.company.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-secondary-navy text-white px-4 py-2 rounded hover:bg-secondary-navy/80"
            >
              Update Testimonial
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-fit p-6">
          <h3 className="text-lg font-semibold mb-4 text-secondary-navy">
            Add New Testimonial
          </h3>
          <form
            onSubmit={handleTestimonialAddSubmit(onSubmitTestimonialAdd)}
            className="space-y-4"
          >
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                {...registerTestimonialAdd("name")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTestimonialAdd.name && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialAdd.name.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Testimonial</label>
              <textarea
                {...registerTestimonialAdd("testimonial")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
              />
              {errorsTestimonialAdd.testimonial && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialAdd.testimonial.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Designation</label>
              <input
                type="text"
                {...registerTestimonialAdd("designation")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTestimonialAdd.designation && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialAdd.designation.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <input
                type="text"
                {...registerTestimonialAdd("company")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTestimonialAdd.company && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialAdd.company.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-secondary-navy text-white px-4 py-2 rounded hover:bg-secondary-navy/80"
            >
              Add Testimonial
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
