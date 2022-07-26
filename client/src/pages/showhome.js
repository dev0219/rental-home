import { useState, useContext, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';
import { DispatchContext } from "../context/GlobalContext";
import Layout from "../components/Layout";
import axios from "axios";
import Loading from "../components/Loading";

function Showhome() {
    const dispatch = useContext(DispatchContext);
    const [loading, setLoading] = useState(false);
    const [homesData, setHomesData] = useState([]);
    const [homesList, setHomesList] = useState([]);
    const [error, setError] = useState("");
    const [fromApi, setFromApi] = useState({});
    const [play, setPlay] = useState(false);
    const [query, setQuery] = useState('');
    const [alert, setAlert] = useState("");

    useEffect(() => {
        async function getHomes() {
            dispatch({ type: "HOME_LIST_REQUEST" });
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.userToken}`,
                    },
                };
                const { data } = await axios.get("/api/homes/", config);
                let notRented = data.homes.filter( home => home.rented !== true || home.rentBy === localStorage.getItem("userId") )
                setHomesData(notRented);
                setHomesList(notRented);
                // eslint-disable-next-line
                dispatch({ type: "HOME_LIST_SUCCESS", payload: [...data.homes] });
            } catch (e) {
                // eslint-disable-next-line
                dispatch({ type: "HOME_LIST_FAIL", payload: "Someting went wrong" });
            }
        }
        getHomes();
        getNews();
    }, [alert]);
    const homeData = {
        columns: [
            {
                label: 'Address',
                field: 'address',
                sort: 'asc',
                width: 200
            },
            {
                label: 'City',
                field: 'city',
                sort: 'asc',
                width: 100
            },
            {
                label: 'State',
                field: 'state',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Country',
                field: 'country',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Size',
                field: 'size',
                sort: 'asc',
                width: 100
            },
            {
                label: 'RENT the PROPERTY',
                field: 'add',
                sort: 'asc',
                width: 100
            },
            {
                label: 'LEAVE the PROPERTY',
                field: 'remove',
                sort: 'asc',
                width: 100
            },
        ],
        rows: homesList.map((home) => {
            return (
                {
                    address: home.address,
                    city: home.city,
                    state: home.state,
                    country: home.country,
                    price: home.price,
                    type: home.type,
                    size: home.size,
                    add: <button
                        onClick={() => {
                            rentProperty(home._id);
                        }
                        }
                        disabled = {home.rented === true}
                        className="Button_inner"
                    >
                        RENT
                    </button>,
                    remove: <button
                        onClick={() => leaveProperty(home._id)}
                        className="Button_inner"
                        disabled = {home.rented !== true}
                    >
                        LEAVE
                    </button>,
                }
            )
        })
    };
    const rentProperty = async (id) => {
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
                    id,
                },
                config
            );
            setAlert("Rent Property Succeed")
            setTimeout(() => setAlert(""), 3000)
        } catch (e) {
            setError(
                e.message
                    ? e.message
                    : "Something went wrong."
            );
        }
    }

    const leaveProperty = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.userToken}`,
                },
            };
            await axios.delete(`/api/cart/${id}`, config)
            setAlert("Leave Property Succeed.")
            setTimeout(() => setAlert(""), 3000)
        } catch (e) {
            setError(
                e.message
                    ? e.message
                    : "Something went wrong."
            );
        }
    }
    const onChange = (e) => {
        setQuery(e.target.value);
    }
    const search = (e) => {
        const q = [];
        const queries = query.split(" ");
        for (let i = 0; i < 3; i++) {
            q[i] = queries[i] ? queries[i] : " ";
        }
        const matched = homesData.filter((home) => {
            let isTrue = 0;
            for (let i = 0; i < 3; i++) {
                if (home.city.trim() === q[i].trim() || home.country.trim() === q[i].trim() || home.price.toString().trim() === q[i].trim() || " " === q[i]) {
                    isTrue++;
                }
            }
            if (isTrue === 3) return true;
            else return false;
        })
        setQuery("")
        setHomesList(matched)
    }
    const getNews = () => {
        setInterval(() => {
        var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=ILS';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            var response = request.response;
            setFromApi(response);
        }

        }, 5000)
    }
    const onPlay = () => {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canv');
        setPlay(true);
        video.style.display = "hidden"
        if (canvas) {
            setInterval(() => {
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 500, 300);
            }, 1)
        }
    }
        return (
        <Layout>
            {loading && <Loading />}
            {error && <div className="error" style={{ color: '#999', marginTop: '5rem', marginBottom: "1rem" }}>{error}</div>}
            <div className="Container_addhome">
                    <section>
                        {alert && <div>{alert}</div>}
                        <input type="text" className="search" placeholder="City, Country, Price" value={query} onChange={onChange} />
                        <button className="searchBtn" onClick={search}>Search</button>
                        <div className="showHomes">
                            <MDBDataTable hover
                                striped
                                bordered
                                small
                                searching={false}
                                data={homeData}
                            />
                        </div>
                        <div className="advert">
                            <aside className="video" style={{ display: play ? "hidden" : "block" }}>
                                <video src="demo.mp4" id="video" controls={true} onPlaying={onPlay} style={{ width: "500px", height: "300px" }} crossOrigin="anonymous" />
                            </aside>
                            <canvas id="canv" width="500px" height="300px" style={{ position: "fixed", right: "10px", bottom: "10px", display: play ? "block" : "none" }}></canvas>
                            <aside className="news">
                                <h2>Currency Rates</h2>
                                <div>From : {fromApi.query === undefined ? " " : fromApi.query.from}</div>
                                <div>To : {fromApi.query === undefined ? " " : fromApi.query.to}</div>
                                <div>Date: {fromApi.query === undefined ? " " : fromApi.date}</div>
                                <div>Rate : {fromApi.query === undefined ? " " : fromApi.result}</div>
                            </aside>
                        </div>
                    </section>
            </div>
        </Layout>
    );
}

export default Showhome;
