import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Save, X, MapPin, Clock } from "lucide-react";
import { Card } from "../components";

const MediaContactPage = () => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingHours, setIsEditingHours] = useState(false);

  // Schema for address form
  const addressSchema = z.object({
    address: z.string().min(1, "Address is required"),
  });
  // Schema for business hours form
  const businessHoursSchema = z.object({
    startDay: z.string().min(1, "Start day is required"),
    endDay: z.string().min(1, "End day is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  });

  type AddressFormValues = z.infer<typeof addressSchema>;
  type BusinessHoursFormValues = z.infer<typeof businessHoursSchema>;
  // Current data (this would typically come from an API)
  const [contactData, setContactData] = useState({
    address: "National Incubation Center, NED University, Karachi, 75270",
    businessHours: "Monday - Friday: 8:00 AM - 6:00 PM",
    // Separate fields for editing
    startDay: "Monday",
    endDay: "Friday",
    startTime: "08:00",
    endTime: "18:00",
  });

  // Address form
  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddressForm,
    setValue: setAddressValue,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: contactData.address,
    },
  });
  // Business hours form
  const {
    register: registerHours,
    handleSubmit: handleHoursSubmit,
    formState: { errors: hoursErrors },
    reset: resetHoursForm,
    setValue: setHoursValue,
  } = useForm<BusinessHoursFormValues>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      startDay: contactData.startDay,
      endDay: contactData.endDay,
      startTime: contactData.startTime,
      endTime: contactData.endTime,
    },
  });

  const onSubmitAddress = (data: AddressFormValues) => {
    console.log("Address Update Data:", data);
    // Here you would call your API to update address
    setContactData((prev) => ({ ...prev, address: data.address }));
    setIsEditingAddress(false);
  };
  const convertTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const onSubmitHours = (data: BusinessHoursFormValues) => {
    console.log("Business Hours Update Data:", data);
    // Convert 24-hour time to 12-hour format and merge the separate fields
    const startTime12 = convertTo12Hour(data.startTime);
    const endTime12 = convertTo12Hour(data.endTime);
    const mergedHours = `${data.startDay} - ${data.endDay}: ${startTime12} - ${endTime12}`;

    // Here you would call your API to update business hours
    setContactData((prev) => ({
      ...prev,
      businessHours: mergedHours,
      startDay: data.startDay,
      endDay: data.endDay,
      startTime: data.startTime,
      endTime: data.endTime,
    }));
    setIsEditingHours(false);
  };

  const handleEditAddress = () => {
    setAddressValue("address", contactData.address);
    setIsEditingAddress(true);
  };
  const handleEditHours = () => {
    setHoursValue("startDay", contactData.startDay);
    setHoursValue("endDay", contactData.endDay);
    setHoursValue("startTime", contactData.startTime);
    setHoursValue("endTime", contactData.endTime);
    setIsEditingHours(true);
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
    setIsEditingHours(false);
    resetAddressForm();
    resetHoursForm();
  };

  return (
    <div className="w-full min-h-[85vh] bg-background-ice flex flex-col items-center mt-20 space-y-4 px-4 mb-10">
      <h1 className="text-3xl font-semibold">Media Contact Page</h1>

      <div className="w-full max-w-4xl space-y-6  ">
        {/* Address Section */}
        <Card className="w-full bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-secondary-navy" />
              <h2 className="text-xl font-bold">Address Information</h2>
            </div>
            <div className="flex items-center space-x-2">
              {isEditingAddress && (
                <X
                  className="w-6 h-6 text-secondary-navy cursor-pointer hover:text-red-500"
                  onClick={handleCancelEdit}
                />
              )}
              {!isEditingAddress && (
                <Edit
                  className="w-6 h-6 text-secondary-navy cursor-pointer hover:text-primary-blue"
                  onClick={handleEditAddress}
                />
              )}
            </div>
          </div>

          <div className="p-6 min-h-[150px]">
            {!isEditingAddress ? (
              <div>
                <h4 className="font-semibold text-secondary-navy mb-2">
                  Address
                </h4>
                <p className="text-secondary-steel text-lg">
                  {contactData.address}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleAddressSubmit(onSubmitAddress)}
                className="space-y-4"
              >
                <div>
                  <label className="block font-semibold mb-2 text-secondary-navy">
                    Address
                  </label>
                  <textarea
                    {...registerAddress("address")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Enter complete address..."
                  />
                  {addressErrors.address && (
                    <span className="text-red-500 text-sm">
                      {addressErrors.address.message}
                    </span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-secondary-navy text-white px-6 py-2 rounded-lg hover:bg-secondary-navy/80 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </Card>

        {/* Business Hours Section */}
        <Card className="w-full bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-secondary-navy" />
              <h2 className="text-xl font-bold">Business Hours</h2>
            </div>
            <div className="flex items-center space-x-2">
              {isEditingHours && (
                <X
                  className="w-6 h-6 text-secondary-navy cursor-pointer hover:text-red-500"
                  onClick={handleCancelEdit}
                />
              )}
              {!isEditingHours && (
                <Edit
                  className="w-6 h-6 text-secondary-navy cursor-pointer hover:text-primary-blue"
                  onClick={handleEditHours}
                />
              )}
            </div>
          </div>{" "}
          <div className="p-6 min-h-[150px]">
            {!isEditingHours ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-navy mb-2">
                    Business Hours
                  </h4>
                  <p className="text-secondary-steel text-lg">
                    {contactData.businessHours}
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleHoursSubmit(onSubmitHours)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-secondary-navy">
                      Start Day
                    </label>
                    <select
                      {...registerHours("startDay")}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    >
                      <option value="">Select day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                    {hoursErrors.startDay && (
                      <span className="text-red-500 text-sm">
                        {hoursErrors.startDay.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-secondary-navy">
                      End Day
                    </label>
                    <select
                      {...registerHours("endDay")}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    >
                      <option value="">Select day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                    {hoursErrors.endDay && (
                      <span className="text-red-500 text-sm">
                        {hoursErrors.endDay.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-secondary-navy">
                      Start Time
                    </label>
                    <input
                      type="time"
                      {...registerHours("startTime")}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                    {hoursErrors.startTime && (
                      <span className="text-red-500 text-sm">
                        {hoursErrors.startTime.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-secondary-navy">
                      End Time
                    </label>
                    <input
                      type="time"
                      {...registerHours("endTime")}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                    {hoursErrors.endTime && (
                      <span className="text-red-500 text-sm">
                        {hoursErrors.endTime.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-secondary-navy text-white px-6 py-2 rounded-lg hover:bg-secondary-navy/80 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="w-full bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out">
          <div className="p-4 border-b-2 border-slate-200">
            <h2 className="text-xl font-bold text-secondary-navy">
              Live Preview
            </h2>
            <p className="text-sm text-secondary-steel">
              This is how it will appear on the contact page
            </p>
          </div>
          <div className="p-6">
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-secondary-navy">Address</h4>
                <p className="text-secondary-steel">{contactData.address}</p>
              </div>{" "}
              <div>
                <h4 className="font-semibold text-secondary-navy">
                  Business Hours
                </h4>
                <p className="text-secondary-steel">
                  {contactData.businessHours}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MediaContactPage;
