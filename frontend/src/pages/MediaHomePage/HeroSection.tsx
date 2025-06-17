import { Edit, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const HeroSection = () => {
  const [heroEdit, setHeroEdit] = useState(false);

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
    // Here you would call your HERO UPDATE API
    setHeroEdit(false);
  };

  return (
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
            <img src="/Hero.jpg" alt="" className="w-11/12 mx-auto md:w-2/4" />
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
              <span className="mt-2 text-lg text-gray-600">Satisfaction</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-fit p-6 relative ">
          <form onSubmit={handleHeroSubmit(onSubmitHero)} className="space-y-4">
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
  );
};

export default HeroSection;
