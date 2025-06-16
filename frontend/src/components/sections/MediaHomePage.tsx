import { Delete, Edit, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const MediaHomePage = () => {
  const [heroEdit, setHeroEdit] = useState(false);
  const [testimonialEdit, setTestimonialEdit] = useState(false);
  // const [testimonialAdd, setTestimonialAdd] = useState(false);

  // Hero Schema
  const heroSchema = z.object({
    heroImage: z.string().url({ message: "Must be a valid URL" }),
    projects: z.number().min(0, "Must be at least 0"),
    clients: z.number().min(0, "Must be at least 0"),
    satisfaction: z
      .number()
      .min(0, "Must be at least 0")
      .max(100, "Cannot exceed 100"),
  });

  type HeroFormValues = z.infer<typeof heroSchema>;

  const {
    register: registerHero,
    handleSubmit: handleHeroSubmit,
    formState: { errors: errorsHero },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      heroImage: "/Hero.jpg",
      projects: 50,
      clients: 20,
      satisfaction: 90,
    },
  });

  const onSubmitHero = (data: HeroFormValues) => {
    console.log("Hero Data Submitted:", data);
    setHeroEdit(false);
  };

  // Testimonial Schema
  const testimonialSchema = z.object({
    name: z.string().min(1, "Name is required"),
    testimonial: z
      .string()
      .min(10, "Testimonial must be at least 10 characters"),
    designation: z.string().min(1, "Designation is required"),
    company: z.string().min(1, "Company is required"),
  });

  type TestimonialFormValues = z.infer<typeof testimonialSchema>;

  const {
    register: registerTestimonial,
    handleSubmit: handleTestimonialSubmit,
    formState: { errors: errorsTestimonial },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      testimonial: "",
      designation: "",
      company: "",
    },
  });

  const onSubmitTestimonial = (data: TestimonialFormValues) => {
    console.log("Testimonial Data Submitted:", data);
    setTestimonialEdit(false);
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
    <div className="relative w-full h-full bg-background-ice mt-10">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center my-4">Media Home Page</h1>

        {/* Hero Section */}
        <section className="w-full h-fit bg-white rounded-md shadow-lg mb-6">
          <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
            <h1 className="text-2xl font-bold">Hero Section</h1>
            {!heroEdit ? (
              <Edit
                className="w-6 h-6 text-secondary-navy cursor-pointer"
                onClick={() => setHeroEdit(true)}
              />
            ) : (
              <X
                className="w-6 h-6 text-secondary-navy cursor-pointer"
                onClick={() => setHeroEdit(false)}
              />
            )}
          </div>

          {!heroEdit ? (
            <div>
              <div className="w-full h-fit p-6 relative ">
                <h2 className="text-2xl py-2 ">Hero Image</h2>
                <img
                  src="/Hero.jpg"
                  alt=""
                  className="w-11/12 mx-auto md:w-2/4"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
                <div className="flex flex-col items-center ">
                  <span className="text-3xl font-extrabold text-secondary-navy">
                    50+
                  </span>
                  <span className="mt-2 text-lg text-gray-600 ">Projects</span>
                </div>
                <div className="flex flex-col items-center ">
                  <span className="text-3xl font-extrabold text-secondary-navy">
                    20+
                  </span>
                  <span className="mt-2 text-lg text-gray-600">Clients</span>
                </div>
                <div className="flex flex-col items-center ">
                  <span className="text-3xl font-extrabold text-secondary-navy">
                    90%
                  </span>
                  <span className="mt-2 text-lg text-gray-600">
                    Satisfaction
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-fit p-6 relative ">
              <form
                onSubmit={handleHeroSubmit(onSubmitHero)}
                className="space-y-4"
              >
                <div>
                  <label className="block font-semibold mb-1">
                    Hero Image Upload
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border rounded px-3 py-2"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        // Set the value in react-hook-form
                        // Since react-hook-form expects a string, we use setValue
                        // @ts-ignore
                        registerHero("heroImage").onChange({
                          target: { name: "heroImage", value: url },
                        });
                      }
                    }}
                  />

                  {errorsHero.heroImage && (
                    <span className="text-red-500 text-sm">
                      {errorsHero.heroImage.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-1">Projects</label>
                  <input
                    type="number"
                    {...registerHero("projects", { valueAsNumber: true })}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errorsHero.projects && (
                    <span className="text-red-500 text-sm">
                      {errorsHero.projects.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-1">Clients</label>
                  <input
                    type="number"
                    {...registerHero("clients", { valueAsNumber: true })}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errorsHero.clients && (
                    <span className="text-red-500 text-sm">
                      {errorsHero.clients.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Satisfaction (%)
                  </label>
                  <input
                    type="number"
                    {...registerHero("satisfaction", { valueAsNumber: true })}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errorsHero.satisfaction && (
                    <span className="text-red-500 text-sm">
                      {errorsHero.satisfaction.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-secondary-navy text-white px-4 py-2 rounded hover:bg-secondary-navy/80"
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </section>

        {/* Testimonial Section */}
        <section className="w-full h-fit bg-white rounded-md shadow-lg mb-6">
          <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
            <h1 className="text-2xl font-bold">Testimonial Section</h1>
            {testimonialEdit && (
              <X
                className="w-6 h-6 text-secondary-navy cursor-pointer"
                onClick={() => setTestimonialEdit(false)}
              />
            )}
            {!testimonialEdit && <Button></Button>}
          </div>

          {!testimonialEdit ? (
            testimonial.length === 0 ? (
              <div className="p-6 text-gray-500 italic">
                No testimonials to show. Click edit to add one.
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
                        onClick={() => setTestimonialEdit(true)}
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
          ) : (
            <div className="w-full h-fit p-6">
              <form
                onSubmit={handleTestimonialSubmit(onSubmitTestimonial)}
                className="space-y-4"
              >
                <div>
                  <label className="block font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    {...registerTestimonial("name")}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errorsTestimonial.name && (
                    <span className="text-red-500 text-sm">
                      {errorsTestimonial.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Testimonial
                  </label>
                  <textarea
                    {...registerTestimonial("testimonial")}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errorsTestimonial.testimonial && (
                    <span className="text-red-500 text-sm">
                      {errorsTestimonial.testimonial.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    {...registerTestimonial("designation")}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errorsTestimonial.designation && (
                    <span className="text-red-500 text-sm">
                      {errorsTestimonial.designation.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    {...registerTestimonial("company")}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errorsTestimonial.company && (
                    <span className="text-red-500 text-sm">
                      {errorsTestimonial.company.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-secondary-navy text-white px-4 py-2 rounded hover:bg-secondary-navy/80"
                >
                  Save Testimonial
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MediaHomePage;
