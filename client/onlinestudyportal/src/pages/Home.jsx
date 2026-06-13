import Hero from "../components/Hero";
import Introduction from "../components/Introduction";

const Home = () => {
  return (
    <>
      <div className="pt-16">
      {/* Hero Section */}
      <Hero />

      {/* Introduction */}
      <Introduction />
      </div>
    </>
  );
};

export default Home;