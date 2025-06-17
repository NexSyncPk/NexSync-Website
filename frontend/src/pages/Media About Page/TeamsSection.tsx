import { Delete, Edit, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card } from "../../components";

const TeamsSection = () => {
  const [teamEdit, setTeamEdit] = useState(false);
  const [teamAdd, setTeamAdd] = useState(false);
  const [editingTeamIndex, setEditingTeamIndex] = useState<number | null>(null);

  // Team Schema for both add and edit
  const teamSchema = z.object({
    name: z.string().min(1, "Name is required"),
    position: z.string().min(1, "Position is required"),
    email: z.string().email("Must be a valid email"),
    picture: z.string().url("Must be a valid URL"),
  });

  type TeamFormValues = z.infer<typeof teamSchema>;

  // Form for adding team details
  const {
    register: registerTeamAdd,
    handleSubmit: handleTeamAddSubmit,
    formState: { errors: errorsTeamAdd },
    reset: resetAddForm,
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      picture: "",
    },
  });

  // Form for editing teams Details
  const {
    register: registerTeamEdit,
    handleSubmit: handleTeamEditSubmit,
    formState: { errors: errorsTeamEdit },
    reset: resetEditForm,
    setValue: setEditValue,
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      picture: "",
    },
  });

  const onSubmitTeamAdd = (data: TeamFormValues) => {
    console.log("Team Add Data Submitted:", data);
    // Here you would call your ADD API
    resetAddForm();
    setTeamAdd(false);
  };

  const onSubmitTeamEdit = (data: TeamFormValues) => {
    console.log("Team Edit Data Submitted:", data, "Index:", editingTeamIndex);
    // Here you would call your EDIT API with editingTeamIndex
    resetEditForm();
    setTeamEdit(false);
    setEditingTeamIndex(null);
  };

  const handleEditTeam = (index: number) => {
    const teamToEdit = team[index];
    setEditingTeamIndex(index);

    // Prepopulate the edit form with existing values
    setEditValue("name", teamToEdit.name);
    setEditValue("position", teamToEdit.position);
    setEditValue("email", teamToEdit.email);
    setEditValue("picture", teamToEdit.picture);

    setTeamEdit(true);
  };
  const handleAddTeam = () => {
    resetAddForm(); // Ensure form is empty
    setTeamAdd(true);
  };

  const team = [
    {
      name: "Jane Doe",
      position: "Marketing Manager",
      email: "jane.doe@creativecorp.com",
      picture: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "John Smith",
      position: "Chief Technology Officer",
      email: "john.smith@techwave.com",
      picture: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Alice Johnson",
      position: "Chief Executive Officer",
      email: "alice.johnson@innovatex.com",
      picture: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];
  return (
    <section className="w-10/12 min-h-[400px] bg-white rounded-md shadow-lg mb-6 mx-auto">
      <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
        <h1 className="text-2xl font-bold">Teams Section</h1>
        <div className="flex items-center space-x-2">
          {(teamEdit || teamAdd) && (
            <X
              className="w-6 h-6 text-secondary-navy cursor-pointer"
              onClick={() => {
                setTeamEdit(false);
                setTeamAdd(false);
                setEditingTeamIndex(null);
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
        team.length === 0 ? (
          <div className="p-6 text-gray-500 italic min-h-[300px] flex items-center justify-center">
            No Team Members to show. Click the plus icon to add one.
          </div>
        ) : (
          <div className="p-6 w-full min-h-[300px]">
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
              {team.map((item, index) => (
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
                      />
                      <Delete
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => {
                          // Handle delete logic here
                          console.log("Delete Team Member:", item.name);
                        }}
                      />
                    </div>
                    <div className="p-3">
                      {item.picture ? (
                        <img
                          src={item.picture}
                          alt={item.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-primary-blue/20"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-r from-primary-blue to-primary-orange rounded-full mx-auto mb-4"></div>
                      )}
                      <h3 className="text-xl font-semibold text-secondary-navy mb-2">
                        {item.name}
                      </h3>
                      <p className="text-secondary-steel mb-4">
                        {item.position}
                      </p>
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
              />
              {errorsTeamEdit.email && (
                <span className="text-red-500 text-sm">
                  {errorsTeamEdit.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Picture</label>
              <input
                type="text"
                {...registerTeamEdit("picture")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTeamEdit.picture && (
                <span className="text-red-500 text-sm">
                  {errorsTeamEdit.picture.message}
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
              />
              {errorsTeamAdd.email && (
                <span className="text-red-500 text-sm">
                  {errorsTeamAdd.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Picture</label>
              <input
                type="text"
                {...registerTeamAdd("picture")}
                className="w-full border rounded px-3 py-2"
              />
              {errorsTeamAdd.picture && (
                <span className="text-red-500 text-sm">
                  {errorsTeamAdd.picture.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-secondary-navy text-white px-4 py-2 rounded hover:bg-secondary-navy/80"
            >
              Add Team Member
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default TeamsSection;
