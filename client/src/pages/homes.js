import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StateContext, DispatchContext } from "../context/GlobalContext";
import Layout from "../components/Layout";
import GoogleApiWrapper from "../components/Map";
import ListCard from "../components/ListCard";
import Footer from "../components/Footer";
import HomeDetails from "../components/HomeDetails";
import Loading from "../components/Loading";

const HomesPage = ({ match, history }) => {
  const state = useContext(StateContext);
  const { loading} = state.homesList;
  const [homeFromServer, setHomeServer] = useState([]);
  const dispatch = useContext(DispatchContext);
  const [openHomeDetails, setOpenHomeDetails] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);

  useEffect(() => {
    async function getHomes() {
      dispatch({ type: "HOME_LIST_REQUEST" });
      try {
        const { data } = await axios.get("/api/homes/");
        let notRented = data.homes.filter( home => home.rented !== true || home.rentBy === localStorage.getItem("userId") )
        setHomeServer(notRented);
        // eslint-disable-next-line
        dispatch({ type: "HOME_LIST_SUCCESS", payload: notRented });
      } catch (e) {
        // eslint-disable-next-line
        dispatch({ type: "HOME_LIST_FAIL", payload: "Someting went wrong" });
      }
    }
    getHomes();
  }, []);
  useEffect(() => {
    if (match.params.id) {
      setSelectedHome(
        homeFromServer.filter((home) => home._id === match.params.id)[0]
      );
      setOpenHomeDetails(true);
    }
  }, [match.params.id, homeFromServer]);
  return (
    <Layout hideFooter="true">
      {loading ? (
        <div className="Container_404">
          <Loading />
        </div>
      ) : (
        <div className="Container_homes" display={openHomeDetails ? "none" : "flex"}>
          <div className="MapWrapper_homes">
            <GoogleApiWrapper data={homeFromServer} />
          </div>
          <div className="ListWrapper_homes">
            {state.map.selectedItem !== null && (
              <ListCard {...state.map.selectedItem} />
            )}
            <div
              style={{
                display: state.map.selectedItem === null ? "block" : "none",
              }}
            >
              {homeFromServer.map((home, i) => (
                <ListCard key={i} {...home} />
              ))}
            </div>
            <Footer />
          </div>
        </div>
      )}

      {openHomeDetails && selectedHome && (
        <HomeDetails
          home={selectedHome}
          back={() => {
            setOpenHomeDetails(false);
            setSelectedHome(null);
            history.goBack();
          }}
        />
      )}
    </Layout>
  );
};

export default HomesPage;
