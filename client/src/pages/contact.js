import Layout from "../components/Layout";
import { FaMobileAlt, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Slide from "react-reveal/Slide";

function Contact() {
  return (
    <Layout>
      <div className="Container_addhome">
        <form className="FormContainer_addhome">
          <Slide left>
            <h1>Contact Us</h1>

            <input className="Input_addhome" placeholder="Your Name" />

            <input className="Input_addhome" placeholder="Your Email" />

            <input className="Input_addhome" placeholder=" Your Phone" />
            <input className="Input_addhome" placeholder="Subject (optional)" />
            <textarea className="Input_addhome" placeholder="Type your message here" rows={7}></textarea>
            <button className="Input_addhome Button_addhome" type="submit">Submit</button>
          </Slide>
        </form>
        <div className="RightColumn_contact">
          <Slide right>
            <h2>REST - Personal Real Estate Corporation</h2>
            <p>REST Pacafic Realty Ltd.</p>
            <ul>
              <li>
                <FaMapMarkerAlt /> 1234 12 street, surrey BC V4C 123
              </li>
              <li>
                <FaMobileAlt /> 6043333333
              </li>
              <li>
                <AiOutlineMail /> contact@rest.ca
              </li>
            </ul>
          </Slide>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
