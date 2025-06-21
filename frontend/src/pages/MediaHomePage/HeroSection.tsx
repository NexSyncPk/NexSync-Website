import { Edit, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getHeroSectionData, updateHeroSectionDetails } from "@/api/services";
import { MediaHeroSchema } from "@/schemas/MediaHeroSchema";
const HeroSection = () => {
  const [heroEdit, setHeroEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Hero Schema

  const [heroDetails, setHeroDetails] = useState<HeroFormValues | null>(null);
  const fetchHeroDetails = async () => {
    try {
      // Replace this URL with your actual backend endpoint to fetch hero details
      const response = await getHeroSectionData(); // Example ID
      if (response && response.data) {
        setHeroDetails(response.data);
        console.log("Fetched Hero Details:", response.data);

        // Update form values with fetched data
        reset({
          id: response.data.id,
          noOfProjects: response.data.noOfProjects,
          noOfClients: response.data.noOfClients,
          satisfactionPercentage: response.data.satisfactionPercentage,
        });
      }
    } catch (error) {
      console.error("Error fetching hero details:", error);
    }
  };
  useEffect(() => {
    // Fetch hero details when the component mounts
    fetchHeroDetails();
  }, []);

  type HeroFormValues = z.infer<typeof MediaHeroSchema>;
  const {
    register: registerHero,
    handleSubmit: handleHeroSubmit,
    formState: { errors: errorsHero },
    setValue,
    reset,
  } = useForm<HeroFormValues>({
    resolver: zodResolver(MediaHeroSchema),
    defaultValues: {
      id: 1,
      noOfProjects: 50,
      noOfClients: 20,
      satisfactionPercentage: 90,
    },
  });
  const onSubmitHero = async (data: HeroFormValues) => {
    console.log("Hero Data Submitted:", data);

    // Create FormData to handle file upload
    const formData = new FormData();

    // Only append the file if it exists and is not the placeholder
    if (
      data.heroImage &&
      data.heroImage.size > 0 &&
      data.heroImage.name !== ""
    ) {
      formData.append("heroImage", data.heroImage);
    }

    // Append other form fields
    formData.append("noOfProjects", data.noOfProjects.toString());
    formData.append("noOfClients", data.noOfClients.toString());
    formData.append(
      "satisfactionPercentage",
      data.satisfactionPercentage.toString()
    );

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      // Use the ID from the form data for the API call
      const response = await updateHeroSectionDetails(formData, data.id);

      if (response && response.data) {
        console.log("Hero section updated successfully:", response);
        // Refresh the hero details after successful update
        await fetchHeroDetails();
        handleEditToggle(false);
      } else {
        console.error("Failed to update hero section");
      }
    } catch (error) {
      console.error("Error updating hero section:", error);
    }
  };

  // Cleanup preview URL when component unmounts or edit mode changes
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);
  // Reset preview when exiting edit mode
  const handleEditToggle = (editMode: boolean) => {
    setHeroEdit(editMode);

    if (editMode && heroDetails) {
      // Pre-populate form when entering edit mode
      reset({
        id: heroDetails.id,
        noOfProjects: heroDetails.noOfProjects,
        noOfClients: heroDetails.noOfClients,
        satisfactionPercentage: heroDetails.satisfactionPercentage,
      });
    }

    if (!editMode && previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  };

  return (
    <section className="w-full h-fit bg-white rounded-md shadow-lg mb-6">
      <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
        <h1 className="text-2xl font-bold">Hero Section</h1>{" "}
        {!heroEdit ? (
          <Edit
            className="w-6 h-6 text-secondary-navy cursor-pointer"
            onClick={() => handleEditToggle(true)}
          />
        ) : (
          <X
            className="w-6 h-6 text-secondary-navy cursor-pointer"
            onClick={() => handleEditToggle(false)}
          />
        )}
      </div>

      {!heroEdit ? (
        <div>
          <div className="w-full h-fit p-6 relative ">
            <h2 className="text-2xl py-2 ">Hero Image</h2>{" "}
            <img
              src={
                heroDetails?.heroImage
                  ? typeof heroDetails.heroImage === "string"
                    ? heroDetails.heroImage
                    : URL.createObjectURL(heroDetails.heroImage)
                  : "Hero.jpg"
              }
              alt="Hero Image"
              className="w-11/12 mx-auto md:w-2/4"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
            <div className="flex flex-col items-center ">
              <span className="text-3xl font-extrabold text-secondary-navy">
                {heroDetails?.noOfProjects || 50}+
              </span>
              <span className="mt-2 text-lg text-gray-600 ">Projects</span>
            </div>
            <div className="flex flex-col items-center ">
              <span className="text-3xl font-extrabold text-secondary-navy">
                {heroDetails?.noOfClients || 30}+
              </span>
              <span className="mt-2 text-lg text-gray-600">Clients</span>
            </div>
            <div className="flex flex-col items-center ">
              <span className="text-3xl font-extrabold text-secondary-navy">
                {heroDetails?.satisfactionPercentage || 90}%
              </span>
              <span className="mt-2 text-lg text-gray-600">Satisfaction</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-fit p-6 relative ">
          <form onSubmit={handleHeroSubmit(onSubmitHero)} className="space-y-4">
            {" "}
            <div>
              <label className="block font-semibold mb-1">
                Hero Image Upload
              </label>
              {/* Current Image Display */}
              {heroDetails?.heroImage && !previewImage && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img
                    src={
                      typeof heroDetails.heroImage === "string"
                        ? heroDetails.heroImage
                        : URL.createObjectURL(heroDetails.heroImage)
                    }
                    alt="Current hero image"
                    className="w-48 h-32 object-cover border rounded"
                  />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Set the actual File object in react-hook-form
                    setValue("heroImage", file, { shouldValidate: true });

                    // Create preview URL
                    const url = URL.createObjectURL(file);
                    setPreviewImage(url);
                  }
                }}
              />

              {/* New Image Preview */}
              {previewImage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    New Image Preview:
                  </p>
                  <img
                    src={previewImage}
                    alt="Hero image preview"
                    className="w-48 h-32 object-cover border rounded"
                  />
                </div>
              )}

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
                {...registerHero("noOfProjects", { valueAsNumber: true })}
                defaultValue={heroDetails?.noOfProjects}
                className="w-full border rounded px-3 py-2"
              />
              {errorsHero.noOfProjects && (
                <span className="text-red-500 text-sm">
                  {errorsHero.noOfProjects.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Clients</label>
              <input
                type="number"
                {...registerHero("noOfClients", { valueAsNumber: true })}
                defaultValue={heroDetails?.noOfClients}
                className="w-full border rounded px-3 py-2"
              />
              {errorsHero.noOfClients && (
                <span className="text-red-500 text-sm">
                  {errorsHero.noOfClients.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Satisfaction (%)
              </label>
              <input
                type="number"
                {...registerHero("satisfactionPercentage", {
                  valueAsNumber: true,
                })}
                defaultValue={heroDetails?.satisfactionPercentage}
                className="w-full border rounded px-3 py-2"
              />
              {errorsHero.satisfactionPercentage && (
                <span className="text-red-500 text-sm">
                  {errorsHero.satisfactionPercentage.message}
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
