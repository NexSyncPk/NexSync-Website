import { Delete, Edit, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card } from "../../components";
import {
  createTeamsMember,
  getTeamSectionData,
  updateTeamMemberDetails,
  deleteTeamMemberDetails,
} from "@/api/services";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { MediaTeamSchema } from "@/schemas/MediaTeamSection";

const TeamsSection = () => {
  const [teamEdit, setTeamEdit] = useState(false);
  const [teamAdd, setTeamAdd] = useState(false);
  const [editingTeamIndex, setEditingTeamIndex] = useState<number | null>(null);
  const [imagePreviewAdd, setImagePreviewAdd] = useState<string>("");
  const [imagePreviewEdit, setImagePreviewEdit] = useState<string>("");
  const [teamDetails, setTeamDetails] = useState<any[]>([]);

  // Delete modal state management
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<any | null>(null);
  const [deletingTeamId, setDeletingTeamId] = useState<number | null>(null);
  const fetchTeamDetails = async () => {
    try {
      const response = await getTeamSectionData();
      if (response && response.data) {
        console.log("Fetched Team Details:", response.data);
        setTeamDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  useEffect(() => {
    fetchTeamDetails();
  }, []);

  // Team Schema for both add and edit

  type TeamFormValues = z.infer<typeof MediaTeamSchema>; // Form for adding team details
  const {
    register: registerTeamAdd,
    handleSubmit: handleTeamAddSubmit,
    formState: { errors: errorsTeamAdd },
    reset: resetAddForm,
  } = useForm<TeamFormValues>({
    resolver: zodResolver(MediaTeamSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      description: "",
    },
  }); // Form for editing teams Details
  const {
    register: registerTeamEdit,
    handleSubmit: handleTeamEditSubmit,
    formState: { errors: errorsTeamEdit },
    reset: resetEditForm,
    setValue: setEditValue,
  } = useForm<TeamFormValues>({
    resolver: zodResolver(MediaTeamSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      description: "",
    },
  });
  const onSubmitTeamAdd = async (data: TeamFormValues) => {
    console.log("Team Add Data Submitted:", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    formData.append("email", data.email);
    formData.append("description", data.description);
    formData.append("pageId", "2"); // Assuming pageId is 2 for now
    if (data.picture && data.picture[0]) {
      formData.append("picture", data.picture[0]);
    }
    console.log("FormData prepared for API:", formData);

    try {
      const response = await createTeamsMember(formData);
      if (response && response.data) {
        fetchTeamDetails(); // Refresh team details after adding
      }
    } catch (error) {
      console.error("Error adding team member:", error);
    }

    // Here you would call your ADD API with formData
    resetAddForm();
    setImagePreviewAdd("");
    setTeamAdd(false);
  };
  const onSubmitTeamEdit = async (data: TeamFormValues) => {
    if (editingTeamIndex === null) return;

    console.log("Team Edit Data Submitted:", data, "Index:", editingTeamIndex);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    formData.append("email", data.email);
    formData.append("description", data.description);
    if (data.picture && data.picture[0]) {
      formData.append("picture", data.picture[0]);
    }

    const teamId = teamDetails[editingTeamIndex]?.id;
    if (!teamId) {
      toast.error("Team member ID not found");
      return;
    }

    try {
      const response = await updateTeamMemberDetails(teamId, formData);
      if (response && response.data) {
        toast.success("Team member updated successfully!");
        await fetchTeamDetails(); // Refresh team details after updating
        resetEditForm();
        setImagePreviewEdit("");
        setTeamEdit(false);
        setEditingTeamIndex(null);
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("Failed to update team member. Please try again.");
    }
  };
  const handleEditTeam = (index: number) => {
    const teamToEdit = teamDetails[index];
    setEditingTeamIndex(index);

    // Prepopulate the edit form with existing values
    setEditValue("name", teamToEdit.name);
    setEditValue("position", teamToEdit.position);
    setEditValue("email", teamToEdit.email);
    setEditValue("description", teamToEdit.description || ""); // Set image preview for existing image
    if (teamToEdit.picture) {
      setImagePreviewEdit(teamToEdit.picture);
    } else {
      setImagePreviewEdit("");
    }

    setTeamEdit(true);
  };

  const handleAddTeam = () => {
    resetAddForm(); // Ensure form is empty
    setImagePreviewAdd(""); // Clear image preview
    setTeamAdd(true);
  };

  const handleImageChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewAdd(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewEdit(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle delete modal
  const handleDeleteClick = (team: any) => {
    setTeamToDelete(team);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!teamToDelete) return;

    if (deletingTeamId === teamToDelete.id) return; // Prevent multiple clicks

    setDeletingTeamId(teamToDelete.id);
    try {
      console.log("Deleting Team Member with ID:", teamToDelete.id);
      const response = await deleteTeamMemberDetails(teamToDelete.id, "soft");
      if (response) {
        toast.success("Team Member Deleted Successfully");
        await fetchTeamDetails();
        setShowDeleteModal(false);
        setTeamToDelete(null);
      } else {
        throw new Error("Failed to delete team member");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    } finally {
      setDeletingTeamId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setTeamToDelete(null);
  };

  return (
    <section className="w-10/12 min-h-[400px] bg-white rounded-md shadow-lg mb-6 mx-auto">
      <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
        <h1 className="text-2xl font-bold">Teams Section</h1>
        <div className="flex items-center space-x-2">
          {" "}
          {(teamEdit || teamAdd) && (
            <X
              className="w-6 h-6 text-secondary-navy cursor-pointer"
              onClick={() => {
                setTeamEdit(false);
                setTeamAdd(false);
                setEditingTeamIndex(null);
                setImagePreviewAdd("");
                setImagePreviewEdit("");
                resetEditForm();
                resetAddForm();
              }}
            />
          )}{" "}
          {!teamAdd && !teamEdit && (
            <UserPlus
              className="cursor-pointer hover:scale-105"
              onClick={handleAddTeam}
            />
          )}
        </div>
      </div>

      {!teamEdit && !teamAdd ? (
        teamDetails.length === 0 ? (
          <div className="p-6 text-gray-500 italic min-h-[300px] flex items-center justify-center">
            No Team Members to show. Click the plus icon to add one.
          </div>
        ) : (
          <div className="p-6 w-full min-h-[300px]">
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
              {teamDetails.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group  "
                >
                  <Card className="text-center transition-all ease-linear duration-200 ring-1 ring-slate-200 shadow-xl h-full mx-2 ">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                      <Edit
                        className="w-5 h-5 text-secondary-navy cursor-pointer hover:text-primary-blue"
                        onClick={() => handleEditTeam(index)}
                      />{" "}
                      <Delete
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteClick(item)}
                      />
                    </div>
                    <div className="p-3">
                      {" "}
                      {item.picture ? (
                        <img
                          src={item.picture}
                          alt={item.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-primary-blue/20"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full mx-auto mb-4"></div>
                      )}{" "}
                      <h3 className="text-xl font-semibold text-secondary-navy mb-2">
                        {item.name}
                      </h3>
                      <p className="text-secondary-steel mb-2">
                        {item.position}
                      </p>
                      {item.description && (
                        <p className="text-sm text-secondary-steel mb-3 italic">
                          {item.description}
                        </p>
                      )}
                      <p className="text-sm text-secondary-steel w-full break-words">
                        {item.email}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )
      ) : teamEdit ? (
        <div className="w-full min-h-[300px] p-6">
          <h3 className="text-lg font-semibold mb-4 text-secondary-navy">
            Edit Team Member Details
          </h3>
          <form
            onSubmit={handleTeamEditSubmit(onSubmitTeamEdit)}
            className="space-y-4 max-w-2xl"
          >
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                {...registerTeamEdit("name")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTeamEdit.name && (
                <span className="text-red-500 text-sm">
                  {errorsTeamEdit.name.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Position</label>
              <textarea
                {...registerTeamEdit("position")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
              />
              {errorsTeamEdit.position && (
                <span className="text-red-500 text-sm">
                  {errorsTeamEdit.position.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="text"
                {...registerTeamEdit("email")}
                className="w-full border rounded px-3 py-2"
              />{" "}
              {errorsTeamEdit.email && (
                <span className="text-red-500 text-sm">
                  {errorsTeamEdit.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                {...registerTeamEdit("description")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
                placeholder="Enter a brief description of the team member..."
              />
              {errorsTeamEdit.description && (
                <span className="text-red-500 text-sm">
                  {errorsTeamEdit.description.message}
                </span>
              )}
            </div>{" "}
            <div>
              <label className="block font-semibold mb-1">Picture</label>
              <input
                type="file"
                accept="image/*"
                {...registerTeamEdit("picture")}
                onChange={handleImageChangeEdit}
                className="w-full border rounded px-3 py-2"
              />
              {imagePreviewEdit && (
                <div className="mt-2">
                  <img
                    src={imagePreviewEdit}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                  />
                </div>
              )}{" "}
              {errorsTeamEdit.picture && (
                <span className="text-red-500 text-sm">
                  {String(
                    errorsTeamEdit.picture?.message || errorsTeamEdit.picture
                  )}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-secondary-navy text-white px-4 py-2 rounded hover:bg-secondary-navy/80"
            >
              Update Details
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full min-h-[300px] p-6">
          <h3 className="text-lg font-semibold mb-4 text-secondary-navy">
            Add New Team Member
          </h3>
          <form
            onSubmit={handleTeamAddSubmit(onSubmitTeamAdd)}
            className="space-y-4 max-w-2xl"
          >
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                {...registerTeamAdd("name")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTeamAdd.name && (
                <span className="text-red-500 text-sm">
                  {errorsTeamAdd.name.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Position</label>
              <textarea
                {...registerTeamAdd("position")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
              />
              {errorsTeamAdd.position && (
                <span className="text-red-500 text-sm">
                  {errorsTeamAdd.position.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="text"
                {...registerTeamAdd("email")}
                className="w-full border rounded px-3 py-2"
              />{" "}
              {errorsTeamAdd.email && (
                <span className="text-red-500 text-sm">
                  {errorsTeamAdd.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                {...registerTeamAdd("description")}
                className="w-full border rounded px-3 py-2 h-24"
                rows={4}
                placeholder="Enter a brief description of the team member..."
              />
              {errorsTeamAdd.description && (
                <span className="text-red-500 text-sm">
                  {errorsTeamAdd.description.message}
                </span>
              )}
            </div>{" "}
            <div>
              <label className="block font-semibold mb-1">Picture</label>
              <input
                type="file"
                accept="image/*"
                {...registerTeamAdd("picture")}
                onChange={handleImageChangeAdd}
                className="w-full border rounded px-3 py-2"
              />
              {imagePreviewAdd && (
                <div className="mt-2">
                  <img
                    src={imagePreviewAdd}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                  />
                </div>
              )}{" "}
              {errorsTeamAdd.picture && (
                <span className="text-red-500 text-sm">
                  {String(
                    errorsTeamAdd.picture?.message || errorsTeamAdd.picture
                  )}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-secondary-navy text-white px-4 py-2 rounded hover:bg-secondary-navy/80"
            >
              Add Team Member
            </button>{" "}
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${teamToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deletingTeamId === teamToDelete?.id}
        variant="danger"
      />
    </section>
  );
};

export default TeamsSection;
