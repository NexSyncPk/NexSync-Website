import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("admin_token") || null;
};

export const getEducationLabel = (education: string) => {
    const labels = {
      intermediate: "Intermediate",
      diploma: "Diploma",
      undergraduate: "Bachelor's Degree",
      masters: "Master's Degree",
    };
    return labels[education as keyof typeof labels] || education;
  };

  export const getAvailabilityBadge = (availability: string) => {
    const styles = {
      remote: "bg-green-100 text-green-800 border-green-200",
      hybrid: "bg-blue-100 text-blue-800 border-blue-200",
      onsite: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return (
      styles[availability as keyof typeof styles] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  export const getPositionBadge = (position: string) => {
    const styles = {
      "full-time": "bg-purple-100 text-purple-800 border-purple-200",
      "part-time": "bg-yellow-100 text-yellow-800 border-yellow-200",
      intern: "bg-indigo-100 text-indigo-800 border-indigo-200",
      contract: "bg-pink-100 text-pink-800 border-pink-200",
    };
    return (
      styles[position as keyof typeof styles] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  export const formatSalary = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PKR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };
  
     export const convertTo12Hour = (time24: string | Date | undefined | null) => {
        if (!time24) return "";
    
        let timeString = "";
        try {
          if (time24 instanceof Date) {
            timeString = time24.toTimeString().slice(0, 5); // Get HH:MM format
          } else {
            timeString = String(time24);
          }
    
          // Handle if timeString doesn't contain ":"
          if (!timeString.includes(":")) {
            return timeString; // Return as is if it's not a time format
          }
    
          const [hours, minutes] = timeString.split(":");
          const hour = parseInt(hours, 10);
    
          // Validate hour and minutes
          if (isNaN(hour) || hour < 0 || hour > 23) {
            return timeString; // Return original if invalid
          }
    
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
          return `${hour12}:${minutes} ${ampm}`;
        } catch (error) {
          console.warn("Error converting time:", error);
          return String(time24); // Return original value if conversion fails
        }
      };