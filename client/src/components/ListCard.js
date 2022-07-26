import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import axios from "axios";


function ListCard({
  _id,
  image,
  title,
  address,
  price,
  type,
  date,
  rooms,
  washrooms,
  size,
  pets,
  rented,
}) {
  let history = useHistory();
  let [rent, setRent] = useState(rented);
  const [selectedImg, setSelectedImg] = useState("");
  const [alert, setAlert] = useState("");
  useEffect(() => {
    setSelectedImg(0);
  }, [])
  if (typeof image === "undefined") return <>undefind</>;

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
          id: _id,
        },
        config
      );
      setRent(true);
      setAlert("Rent Property Succeed")
      setTimeout(() => setAlert(""), 3000)
    } catch (e) {
      setAlert(
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
        console.log(id)
        setRent(false);
        setAlert("Leave Property Succeed.")
        setTimeout(() => setAlert(""), 3000)
    } catch (e) {
        setAlert(
            e.message
                ? e.message
                : "Something went wrong."
        );
    }
}

  return (
    <section>
      {alert && <div>{alert}</div>}
      {!alert &&
        <div className="list-card CardWrapper_list">
          <div className="ImagesWrapper_list">
            <div className="ImagesWrapperInner_list">
              <img
                src={image[0].substr(14)}
                alt="card"
              />
            </div>
          </div>
          <div className="CardContent_list">
            <h2 onClick={() => history.push(`/homes/${_id}`)}>{title}</h2>
            <span>${price}</span>
            <span>{address}</span>
            <span>
              {type}  <small>{date.substr(0, 10)}</small>
            </span>
            <span>
              {rooms} BED <BsDot /> {washrooms} BATH <BsDot /> {size}FT²
            </span>
            <span>PETS : {pets ? " allowed" : " not allowed"}</span>
            <button onClick={ rent === true ? () => leaveProperty(_id) : () => rentProperty(_id)} className="Button_addhome Input_addhome">{rent ? "Leave" : "RENT"}</button>
          </div>
        </div>
      }
    </section>
  );
}

export default ListCard;
