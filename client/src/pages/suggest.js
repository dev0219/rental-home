import { useState, useContext, useEffect } from "react";
import { DispatchContext } from "../context/GlobalContext";
import Layout from "../components/Layout";
import axios from "axios";
import Loading from "../components/Loading";

function Suggest() {
    const dispatch = useContext(DispatchContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [offerData, setOfferData] = useState([]);
    const [alert, setAlert] = useState("");

    useEffect(() => {
        async function getHomes() {
            dispatch({ type: "HOME_LIST_REQUEST" });
            setLoading(true);
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.userToken}`,
                    },
                };
                const { data } = await axios.get("/api/homes/", config);
                setLoading(false);
                setOfferData(data.offer);
                // eslint-disable-next-line
                dispatch({ type: "HOME_LIST_SUCCESS", payload: [...data.homes] });
            } catch (e) {
                // eslint-disable-next-line
                dispatch({ type: "HOME_LIST_FAIL", payload: "Someting went wrong" });
            }
        }
        getHomes();
    }, [alert]);
   
    const rentProperty = async (id, city, country, price, type, rooms, washrooms, size) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.userToken}`,
                },
            };
            await axios.post(
                "/api/cart/",
                {
                    city,
                    country,
                    price,
                    type,
                    rooms,
                    washrooms,
                    size,
                    id,
                },
                config
            );
            setAlert("Add to Cart Succeed")
            setTimeout(() => setAlert(""), 3000)
        } catch (e) {
            setError(
                e.message
                    ? e.message
                    : "Something went wrong."
            );
        }
    }

        return (
        <Layout>
            {loading && <Loading />}
            {error && <div className="error" style={{ color: '#999', marginTop: '5rem', marginBottom: "1rem" }}>{error}</div>}
            <div className="Container_addhome">
                    <div className="offer">
                        <h2>Suggested House for you based on history</h2>
                        <div>City: {offerData === null ? " " : offerData.city}</div>
                        <div>Country: {offerData === null ? "": offerData.country}</div>
                        <div>Price: {offerData === null ? "": offerData.price}</div>
                        <div>Type: {offerData === null ? "": offerData.type}</div>
                        <div>Room Number: {offerData === null ? "": offerData.rooms}</div>
                        <div>Size: {offerData === null ? "": offerData.size}</div>
                        <div>Washroom Number: {offerData === null ? "": offerData.washrooms}</div>
                        <div className="button_group">
                            <button className="Button_inner"
                            disabled = {offerData === null}
                             onClick={() => {
                                rentProperty(offerData._id, offerData.city, offerData.country, offerData.price, offerData.type, offerData.rooms, offerData.washrooms, offerData.size);
                            }}>RENT</button>
                        </div>
                    </div>
            </div>
        </Layout>
    );
}

export default Suggest;
