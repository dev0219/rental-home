import { useState, useContext, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';
import { DispatchContext } from "../context/GlobalContext";
import AutoCompleteAddress from "../components/AutoCompleteAddress";
import Layout from "../components/Layout";
import axios from "axios";
import Loading from "../components/Loading";

function Addhome() {
  const [address, setAddress] = useState({
    address: "",
    position: { lat: "", lng: "" },
  });
  const dispatch = useContext(DispatchContext);
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [washrooms, setWashrooms] = useState("");
  const [size, setSize] = useState("");
  const [details, setDetails] = useState("");
  const [addView, setAddView] = useState(false);
  const [homesData, setHomesData] = useState([]);
  const [homesList, setHomesList] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Start");
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState('');
  const [homeId, setHomeId] = useState(0);
  const [alert, setAlert] = useState("");
  let imgArray = [];

  
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
          setHomesData([...data.homes]);
          setHomesList([...data.homes]);
          dispatch({ type: "HOME_LIST_SUCCESS", payload: [...data] });
        } catch (e) {
          dispatch({ type: "HOME_LIST_FAIL", payload: "Someting went wrong" });
        }
    }
    getHomes();
  }, [dispatch, alert]);
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
        label: 'Edit',
        field: 'edit',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Delete',
        field: 'delete',
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
          edit: <button
            onClick={() => {
              editHandler(home._id);
              setType(home.type);
              setPrice(home.price);
              setSize(home.size);
              setRooms(home.rooms);
              setWashrooms(home.washrooms)
              setAddress(home.address);
              setDetails(home.details);
            }
            }
            className="Button_inner"
          >
            Edit
          </button>,
          delete: <button
            onClick={() => deleteHandler(home._id)}
            className="Button_inner"
          >
            Delete
          </button>,
        }
      )
    })
  };
  const editHandler = (id) => {
    setAddView(true);
    setIsEdit(true);
    setHomeId(id);
  }
  const addHandler = () => {
    setAddView(true);
    setIsEdit(false);
  }
  const deleteHandler = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };
      await axios.delete(`/api/homes/${id}`, config)
      setAlert("Delete Succeed");
      setTimeout(() => {setAlert("")}, 3000);
    } catch (e) {
      setError(
        e.response.data.message
          ? e.response.data.message
          : "Something went wrong please check all inputs and try again"
      );
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(files)) {
      formData.append("image", value);
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError("Error in uploading images");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    imgArray = await uploadFileHandler();
    if (!validateForm()) {
      setError("Please fill all inputs with * and try again");
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      };
      await axios.post(
        "/api/homes/",
        {
          address: address.address,
          city: address.city,
          state: address.state,
          country: address.country,
          position: address.position,
          price,
          type,
          image: imgArray,
          rooms,
          washrooms,
          size,
          details,
          isEdit,
          homeId,
        },
        config
      );
      setMessage("Property added!");
      setAlert(isEdit ? "Edit Succeed" : "Add Home Succeed");
      setTimeout(() => {setAlert("")}, 3000);
      setError("");
      setAddress({
        address: "",
        position: { lat: "", lng: "" },
      });
      setFiles("");
      setPrice("");
      setType("");
      setRooms("");
      setWashrooms("");
      setSize("");
      setDetails("");
      setAddView(false);
      setIsEdit(false);
      setHomeId(0);
    } catch (e) {
      setError(
        e.message
          ? e.message
          : "Something went wrong please check all inputs and try again"
      );
    }
    setLoading(false);
  };
  const inputFile = (file) => {
    setFiles(file);
  }
  const validateForm = () => {
    if (!address.address || !files || !price || !type || !details) return false;
    return true;
  };
  const onQuery = (e) => {
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
    setHomesList(matched)
  }

  return (
    <Layout>
      {loading && <Loading />}
      <div className="Container_addhome">
        {!addView &&
          <div className="showHomes">
            {alert && <div>{alert}</div>}
            <div className="search">
              <input type="text" className="search" placeholder="City, Country, Price" value={query} onChange={onQuery} />
              <button className="searchBtn" onClick={search}>Search</button>
            </div>
            <MDBDataTable hover
              striped
              bordered
              small
              searching={false}
              data={homeData}
            />
            <button className="add Input_addhome Button_addhome" onClick={() => addHandler()}>ADD</button>
          </div>
        }
        {addView && (
          <form className="FormContainer_addhome">
            <h1>{isEdit ? "Edit New Property" : "Add new Property"}</h1>
            {error && <div className="Input_addhome Error_addhome">{error}</div>}
            {message && <div className="Input_addhome Message_addhome">{message}</div>}
            <AutoCompleteAddress setAddress={setAddress} />
            <input className="Input_addhome"
              placeholder="*Property type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
            <input className="Input_addhome"
              placeholder="*Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input className="Input_addhome"
              placeholder="Number of rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
            <input className="Input_addhome"
              placeholder="Number of Washrooms"
              value={washrooms}
              onChange={(e) => setWashrooms(e.target.value)}
            />
            <input className="Input_addhome"
              placeholder="Size of the Property (FT²)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <textarea className="Input_addhome"
              placeholder="*Property details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
            <input className="Input_addhome"
              type="file"
              multiple
              onChange={(e) => inputFile(e.target.files)}
            />
            {/* <img alt="" src={files.length === 0 ? "" : URL.createObjectURL(files[0])} /> */}
            <button className="Input_addhome Button_addhome" onClick={handleSubmit} to="#">
              Submit
            </button>
            <button className="Input_addhome Button_addhome" onClick={() => setAddView(false)} to="#">
              Close
            </button>
          </form>
        )}
      </div >
    </Layout>
  );
}

export default Addhome;
