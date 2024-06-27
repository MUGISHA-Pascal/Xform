import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`update-tabpanel-${index}`}
      aria-labelledby={`update-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Saved() {
  const [data, setData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openReadModal, setOpenReadModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateFields, setUpdateFields] = useState({
    title: "",
    firstName: "",
    lastName: "",
    position: "",
    company: "",
    businessArena: "",
    employees: "",
    street: "",
    additionalInfo: "",
    zipCode: "",
    place: "",
    country: "",
    code: "",
    phoneNumber: "",
    email: "",
    termsAccepted: false,
  });

  useEffect(() => {
    fetch("http://localhost:2024/saved", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.error(e));
  }, []);

  function handleDelete(itemId) {
    fetch(`http://localhost:2024/delete?id=${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        location.reload();
        toast.success(data.message);
        setData(data);
      })
      .catch((e) => {
        toast.error(e.message || "Error deleting data");
      });
  }

  function handleRead(item) {
    setSelectedItem(item);
    setOpenReadModal(true);
  }

  function handleUpdate(item) {
    setSelectedItem(item);
    setUpdateFields({
      title: item.title,
      firstName: item.firstName,
      lastName: item.lastName,
      position: item.position,
      company: item.company,
      businessArena: item.businessArena,
      employees: item.employees,
      street: item.street,
      additionalInfo: item.additionalInfo || "",
      zipCode: item.zipCode,
      place: item.place,
      country: item.country,
      code: item.code,
      phoneNumber: item.phoneNumber,
      email: item.email,
      termsAccepted: item.termsAccepted || false,
    });
    setOpenUpdateModal(true);
  }

  const handleCloseReadModal = () => {
    setOpenReadModal(false);
    setSelectedItem(null);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedItem(null);
  };

  const handleUpdateFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateSubmit = () => {
    const itemId = selectedItem._id;
    fetch(`http://localhost:2024/update/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFields),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Data updated successfully");
        setData(data);
        setOpenUpdateModal(false);
        setSelectedItem(null);
        location.reload();
      })
      .catch((e) => {
        toast.error(e.message || "Error updating data");
      });
  };
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-xl mx-auto bg-gray-100 p-4">
      <nav className="flex items-center justify-between bg-blue-500 text-white p-4 mb-4 rounded-md">
        <h1 className="text-2xl font-bold">Company</h1>
        <FaHome
          className="text-3xl cursor-pointer"
          onClick={() => navigate("/")}
        />
      </nav>

      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 flex items-center justify-between"
            >
              <div>
                <h1 className="text-xl font-bold mb-2">{item.title}</h1>
                <div className="space-x-2">
                  <button
                    onClick={() => handleRead(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleUpdate(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-xl font-bold text-center">No saved data</h1>
        )}
      </div>

      <Modal
        open={openReadModal}
        onClose={handleCloseReadModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            maxWidth: "90vw",
            width: "90%",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            {selectedItem && selectedItem.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>First Name:</strong>{" "}
            {selectedItem && selectedItem.firstName} <br />
            <strong>Last Name:</strong> {selectedItem && selectedItem.lastName}{" "}
            <br />
            <strong>Position:</strong> {selectedItem && selectedItem.position}{" "}
            <br />
            <strong>Company:</strong> {selectedItem && selectedItem.company}{" "}
            <br />
            <strong>Business Arena:</strong>{" "}
            {selectedItem && selectedItem.businessArena} <br />
            <strong>Employees:</strong> {selectedItem && selectedItem.employees}{" "}
            <br />
            <strong>Street:</strong> {selectedItem && selectedItem.street}{" "}
            <br />
            <strong>Additional Info:</strong>{" "}
            {selectedItem && selectedItem.additionalInfo} <br />
            <strong>Zip Code:</strong> {selectedItem && selectedItem.zipCode}{" "}
            <br />
            <strong>Place:</strong> {selectedItem && selectedItem.place} <br />
            <strong>Country:</strong> {selectedItem && selectedItem.country}{" "}
            <br />
            <strong>Code:</strong> {selectedItem && selectedItem.code} <br />
            <strong>Phone Number:</strong>{" "}
            {selectedItem && selectedItem.phoneNumber} <br />
            <strong>Email:</strong> {selectedItem && selectedItem.email} <br />
            <strong>Terms Accepted:</strong>{" "}
            {selectedItem && (selectedItem.termsAccepted ? "Yes" : "No")} <br />
          </Typography>
          <Button
            onClick={handleCloseReadModal}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
          <IconButton
            aria-label="close"
            onClick={handleCloseReadModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          ></IconButton>
        </Box>
      </Modal>

      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            maxWidth: "90vw",
            width: "90%",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Update Data
          </Typography>
          <Tabs
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            aria-label="Update Data Tabs"
            sx={{ mb: 2 }}
          >
            <Tab label="Personal Info" />
            <Tab label="Company Info" />
            <Tab label="Address Info" />
            <Tab label="Additional" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={updateFields.title}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              value={updateFields.firstName}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              value={updateFields.lastName}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="position"
              label="Position"
              fullWidth
              value={updateFields.position}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            {/* Add more fields for Personal Info */}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TextField
              name="company"
              label="Company"
              fullWidth
              value={updateFields.company}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="businessArena"
              label="Business Arena"
              fullWidth
              value={updateFields.businessArena}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="employees"
              label="Employees"
              fullWidth
              value={updateFields.employees}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            {/* Add more fields for Company Info */}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <TextField
              name="street"
              label="Street"
              fullWidth
              value={updateFields.street}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="zipCode"
              label="Zip Code"
              fullWidth
              value={updateFields.zipCode}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="place"
              label="Place"
              fullWidth
              value={updateFields.place}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="country"
              label="Country"
              fullWidth
              value={updateFields.country}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="code"
              label="Code"
              fullWidth
              value={updateFields.code}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            {/* Add more fields for Address Info */}
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <TextField
              name="additionalInfo"
              label="Additional Info"
              fullWidth
              value={updateFields.additionalInfo}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              value={updateFields.phoneNumber}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={updateFields.email}
              onChange={handleUpdateFieldChange}
              sx={{ mb: 2 }}
            />
            {/* Add more fields for Additional Info */}
          </TabPanel>

          {/* Add more TabPanels as needed */}

          <Button
            onClick={handleUpdateSubmit}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            onClick={handleCloseUpdateModal}
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
          <IconButton
            aria-label="close"
            onClick={handleCloseUpdateModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}
