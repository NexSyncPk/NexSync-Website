import TeamsSection from "./TeamsSection";

const MediaAboutPage = () => {
  return (
    <div className="w-full min-h-[85vh] bg-background-ice flex flex-col items-center mt-20 space-y-4 px-4">
      <h1 className="text-3xl font-semibold">Media About Page</h1>
      <div className="w-full max-w-6xl">
        <TeamsSection />
      </div>
    </div>
  );
};

export default MediaAboutPage;
