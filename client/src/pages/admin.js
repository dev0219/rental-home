import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MDBDataTable } from 'mdbreact';
import { DispatchContext } from "../context/GlobalContext";
import io from "socket.io-client";
import { ENDPOINT } from "../context/constants/socketConstants";
import BarChart from '../components/BarChart';

function Admin() {
  const [userList, setUserList] = useState([]);
  const [editView, setEditView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [chosenUser, setChosenUser] = useState({
    email: '',
    name: "",
    userType: 'Admin',
    _id: ''
  });
  const dispatch = useContext(DispatchContext);
  const socket = io(ENDPOINT);
  const { email, name, userType } = chosenUser;

  if (userList === undefined) setUserList([]);
  useEffect(() => {
    async function getUsers() {
      if (!userList[0]) {
        dispatch({ type: "HOME_LIST_USER_REQUEST" });
        try {
          // eslint-disable-next-line
          socket.emit("GET_USERS");
          // eslint-disable-next-line
          socket.on("getUsers_error", (msg) => {
            alert("Getting User Failed on server.")
          });
          // eslint-disable-next-line
          socket.on("getUsers_success", (data) => {
            setUserList([...data]);
          })
        } catch (e) {
          dispatch({ type: "GET_USER_FAIL", payload: "Someting went wrong" });
        }
      }
    }
    getUsers();
  }, [dispatch, userList]);

  const editHandler = () => {
    setIsEdit(true);
    setEditView(true);
  }
  const addHandler = () => {
    setIsEdit(false);
    setEditView(true);
  }
  const deleteHanlder = (id) => {
    socket.emit("DELETE_USER", id)
    socket.on("deleteUser_error", (msg) => {
      alert("Delete Failed. Please try again.")
    })
    socket.on("deleteUser_success", (data) => {
      setUserList([...data]);
    })
  }
  const onChange = (e) => {
    setChosenUser({ ...chosenUser, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setEditView(false);
    socket.emit("EDIT_USER", { chosenUser, isEdit });
    socket.on("editUser_error", (msg) => {
      alert("Please try again.")
    });
    socket.on("editUser_success", (data) => {
      setUserList([...data]);
    })
  }
  const userData = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 100
      },
      {
        label: 'User Type',
        field: 'userType',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
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
    rows: userList.map((user) => {
      return (
        {
          name: user.name,
          userType: user.userType,
          email: user.email,
          edit: <button
            onClick={() => {
              setChosenUser({ name: user.name, userType: user.userType, email: user.email, _id: user._id });
              editHandler();
            }
            }
            className="Button_inner"
          >
            Edit
          </button>,
          delete: <button
            onClick={() => deleteHanlder(user._id)}
            className="Button_inner"
          >
            Delete
          </button>,
        }
      )
    })
  };

  return (
    <Layout className="admin">
      <div className="table">
        {!editView &&
          <div>
            <MDBDataTable hover
              striped
              bordered
              small
              data={userData}
            />
            <button className="add Input_addhome Button_addhome" style={{width: "50%", marginLeft: "25vw"}} onClick={() => {
              setChosenUser({ name: "", userType: "Admin", email: "", _id: 0 });
              addHandler();
            }
            }>ADD</button>
            <div className="graph1"></div>
            <div className="graph2"></div>
            <BarChart />
          </div>
        }
        {editView &&
          <div className="addUser">
            <h2>{isEdit ? "Edit User" : "Add User"}</h2>
            <form className="editView" onSubmit={onSubmit}>
              <span onClick={() => setEditView(false)}>X</span>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" style={{ color: "black" }} name="name" id="name" value={name} onChange={onChange} />
              </div>
              <div className="input-group">
                <label htmlFor="userType">User Type</label>
                <select id="userType" value={userType} name="userType" onChange={onChange}>
                  <option>Admin</option>
                  <option>Realtor</option>
                  <option>Customer</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} name="email" onChange={onChange} />
              </div>
              <input type="submit" className="submit" value="Update" />
            </form>
          </div>
        }
      </div>
    </Layout>
  );
}

export default Admin;
