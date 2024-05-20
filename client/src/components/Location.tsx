import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

interface IDevice {
  name: string;
  serialNumber: string;
  type: "pos" | "kiosk" | "signage" | "";
  locationId: string;
  status: "Active" | "Inactive";
  image: string;
}

interface ILocation {
  _id: string;
  title: string;
  address: string;
  devices: IDevice[];
  status: "Active" | "Inactive";
  user: string;
}

const API_URL = `${import.meta.env.VITE_APP_BASE_URL}`;

const Location = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deviceData, setDeviceData] = useState<IDevice>({
    serialNumber: "",
    name: "",
    type: "",
    image: "",
    status: "Active",
    locationId: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(`${API_URL}/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLocation = async () => {
    if (!title.trim() || !address.trim()) {
      alert("Please enter title and address.");
      return;
    }

    const token = localStorage.getItem("token");
    const locationData = { title, address };

    try {
      if (editing) {
        await axios.put(`${API_URL}/locations/${editingId}`, locationData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocations((prevLocations) =>
          prevLocations.map((loc) =>
            loc._id === editingId ? { ...loc, ...locationData } : loc
          )
        );
        setEditing(false);
        setEditingId(null);
      } else {
        const response = await axios.post(
          `${API_URL}/locations`,
          locationData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLocations((prevLocations) => [...prevLocations, response.data]);
      }
      setTitle("");
      setAddress("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    const location = locations.find((loc) => loc._id === id);
    if (location) {
      setTitle(location.title);
      setAddress(location.address);
      setEditing(true);
      setEditingId(id);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/locations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations((prevLocations) =>
        prevLocations.filter((loc) => loc._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (locationId: string) => {
    setDeviceData((prevData) => ({ ...prevData, locationId }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeviceData({
      serialNumber: "",
      name: "",
      type: "",
      image: "",
      status: "Active",
      locationId: "",
    });
  };

  const handleCreateDevice = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_URL}/locations/${deviceData.locationId}/devices`,
        deviceData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location._id === deviceData.locationId
            ? { ...location, devices: [...location.devices, response.data] }
            : location
        )
      );
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateLocation}
      >
        {editing ? "Update Location" : "Create Location"}
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {locations.map((location) => (
            <Grid item xs={12} sm={6} md={4} key={location._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {location.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {location.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {location.status}
                  </Typography>
                  <Typography  color="textSeconary">
                    Devices
                  </Typography>
                  <List>
                    {location.devices.length > 0 ? (
                      location.devices.map((device) => (
                        <ListItem key={device.serialNumber}>
                          <ListItemText
                            primary={`Name: ${device.name}`}
                            secondary={`Type: ${device.type}`}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No devices available." />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(location._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(location._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    onClick={() => handleOpen(location._id)}
                  >
                    <AddIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Device</DialogTitle>
        <DialogContent>
          <TextField
            label="Serial Number"
            value={deviceData.serialNumber}
            onChange={(e) =>
              setDeviceData((prevData) => ({
                ...prevData,
                serialNumber: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={deviceData.name}
            onChange={(e) =>
              setDeviceData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type-select"
            value={deviceData.type}
            onChange={(e) =>
              setDeviceData((prevData) => ({
                ...prevData,
                type: e.target.value as "pos" | "kiosk" | "signage" | "",
              }))
            }
            label="Type"
          >
            <MenuItem value="pos">POS</MenuItem>
            <MenuItem value="kiosk">Kiosk</MenuItem>
            <MenuItem value="signage">Signage</MenuItem>
          </Select>
          <TextField
            label="Image URL"
            value={deviceData.image}
            onChange={(e) =>
              setDeviceData((prevData) => ({
                ...prevData,
                image: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Status"
            value={deviceData.status}
            onChange={(e) =>
              setDeviceData((prevData) => ({
                ...prevData,
                status: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          /> */}
          <InputLabel id="type-label">Status</InputLabel>
          <Select
            labelId="type-label"
            id="type-select"
            value={deviceData.status}
            onChange={(e) =>
              setDeviceData((prevData) => ({
                ...prevData,
                status: e.target.value as "Active" | "Inactive",
              }))
            }
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateDevice} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Location;
