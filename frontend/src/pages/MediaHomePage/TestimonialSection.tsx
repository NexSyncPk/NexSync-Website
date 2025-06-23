import { Delete, Edit, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fallbackTestimonials } from "@/data/mockData";
import type { Testimonial } from "@/types";
import {
  addTestimonial,
  deleteTestimonialDetails,
  getTestimonialsData,
  updateTestimonialDetails,
} from "@/api/services";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { testimonialSchema } from "@/schemas/MediaTestimonialSchema";

const TestimonialSection = () => {
  const [testimonialEdit, setTestimonialEdit] = useState(false);
  const [testimonialAdd, setTestimonialAdd] = useState(false);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<
    number | null
  >(null);
  const [testimonialId, setTestimonialId] = useState<number | null>(null);

  // Delete modal state management
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] =
    useState<Testimonial | null>(null);
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<
    number | null
  >(null);

  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(fallbackTestimonials);

  // Testimonial Schema for both add and edit

  const getTestimonials = async () => {
    try {
      const response = await getTestimonialsData();
      if (response && response.data) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials data:", error);
    }
  };

  // Fetch testimonials on component mount
  useEffect(() => {
    getTestimonials();
  }, []);

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
      feedback: "",
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
      feedback: "",
      designation: "",
      company: "",
    },
  });

  const onSubmitTestimonialAdd = async (data: TestimonialFormValues) => {
    console.log("Testimonial Add Data Submitted:", data);
    const updatedValues = {
      ...data,
      pageId: 1,
    };

    try {
      const response = await addTestimonial(updatedValues);
      if (response && response.data) {
        getTestimonials();
      }
    } catch (error) {
      console.log(error);
    }

    // Here you would call your ADD API
    resetAddForm();
    setTestimonialAdd(false);
  };
  const onSubmitTestimonialEdit = async (data: TestimonialFormValues) => {
    console.log(
      "Testimonial Edit Data Submitted:",
      "Index:",
      editingTestimonialIndex
    );

    // Here you would call your EDIT API with editingTestimonialIndex
    try {
      const response = await updateTestimonialDetails(data, testimonialId!);
      if (response && response.data) {
        toast.success("Testimonial Updated Succesfully");
        getTestimonials();
      }
    } catch (error) {
      console.log(error);
    }
    resetEditForm();
    setTestimonialEdit(false);
    setEditingTestimonialIndex(null);
  };

  const handleEditTestimonial = (index: number) => {
    const testimonialToEdit = testimonials[index];
    console.log("Editing Testimonial:", testimonialToEdit);
    setEditingTestimonialIndex(index);

    // Prepopulate the edit form with existing values
    setEditValue("name", testimonialToEdit.name);
    setEditValue("feedback", testimonialToEdit.feedback);
    setEditValue("designation", testimonialToEdit.designation);
    setEditValue("company", testimonialToEdit.company);

    setTestimonialEdit(true);
  };

  const handleAddTestimonial = () => {
    resetAddForm(); // Ensure form is empty
    setTestimonialAdd(true);
  };
  // Handle delete modal
  const handleDeleteClick = (testimonial: Testimonial) => {
    setTestimonialToDelete(testimonial);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!testimonialToDelete) return;

    if (deletingTestimonialId === testimonialToDelete.id) return; // Prevent multiple clicks

    setDeletingTestimonialId(testimonialToDelete.id);
    try {
      console.log("Deleting Testimonial with ID:", testimonialToDelete.id);
      const response = await deleteTestimonialDetails(
        testimonialToDelete.id,
        "soft"
      );
      if (response) {
        toast.success("Testimonial Deleted Successfully");
        await getTestimonials();
        setShowDeleteModal(false);
        setTestimonialToDelete(null);
      } else {
        throw new Error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial");
    } finally {
      setDeletingTestimonialId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setTestimonialToDelete(null);
  };

  return (
    <section className="w-full h-fit bg-white rounded-md shadow-lg mb-6">
      <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
        <h1 className="text-2xl font-bold">Testimonial Section</h1>
        <div className="flex items-center space-x-2 ">
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
        testimonials.length === 0 ? (
          <div className="p-6 text-gray-500 italic">
            No testimonials to show. Click the plus icon to add one.
          </div>
        ) : (
          <div className="p-6 space-y-4  h-96 overflow-auto">
            {testimonials.map((item: Testimonial, index: number) => (
              <div
                key={index}
                className="border rounded p-4 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center gap-x-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-secondary-navy">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.feedback}</p>
                  <p className="text-sm text-secondary-steel">
                    {item.designation}, {item.company}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Edit
                    className="w-6 h-6 text-secondary-navy cursor-pointer"
                    onClick={() => {
                      handleEditTestimonial(index),
                        setTestimonialId(testimonials[index]?.id);
                    }}
                  />{" "}
                  <Delete
                    className="w-6 h-6 text-red-500 cursor-pointer ml-2"
                    onClick={() => handleDeleteClick(item)}
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
                {...registerTestimonialEdit("feedback")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
              />
              {errorsTestimonialEdit.feedback && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialEdit.feedback.message}
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
              <label className="block font-semibold mb-1">Feedback</label>
              <textarea
                {...registerTestimonialAdd("feedback")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
              />
              {errorsTestimonialAdd.feedback && (
                <span className="text-red-500 text-sm">
                  {errorsTestimonialAdd.feedback.message}
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
            </button>{" "}
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${testimonialToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deletingTestimonialId === testimonialToDelete?.id}
        variant="danger"
      />
    </section>
  );
};

export default TestimonialSection;
