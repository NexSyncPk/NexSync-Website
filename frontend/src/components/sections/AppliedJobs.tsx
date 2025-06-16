import BarChartExample from "../utils/BarChartExample";

const AppliedJobs = () => {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center p-4 mt-16">
      <h1 className="text-3xl">Applied Jobs</h1>
      <p className="text-sm  text-center mb-4">
        This section will display the jobs that users have applied for, along
        with the number of applications and job openings.
      </p>
      {/* You can add charts, tables, or any other components to visualize the data */}
      <BarChartExample />
    </div>
  );
};

export default AppliedJobs;
