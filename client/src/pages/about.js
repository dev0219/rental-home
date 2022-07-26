import Layout from "../components/Layout";
import InfoSection from "../components/InfoSection";
import { AboutUsSection } from "../data/AboutUsData";

function About() {
  return (
    <Layout>
      <div className="Container_about">
        <InfoSection {...AboutUsSection} />
      </div>
    </Layout>
  );
}

export default About;
