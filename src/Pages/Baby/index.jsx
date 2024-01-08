import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import { useBabyContext } from "../../Context/BabyContext";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { PageTitle } from "../../Components/PageTitle";
import { AxiosApi } from "../../Services/axios.create";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Modal } from "../../Components/Modal/modal";
import { toast } from "react-toastify";

const decodeJwtToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar token JWT:", error.message);
    return null;
  }
};

export const Baby = () => {
  const isSmallScreen = useMediaQuery("(max-width:813px)");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  const { setDataInfo } = useBabyContext();
  const [babyName, setBabyName] = useState("");
  const [babyAge, setBabyAge] = useState("");
  const [babyWeight, setBabyWeight] = useState(0);
  const [babyBloodType, setBabyBloodType] = useState("");

  const [selectedParent, setSelectedParent] = useState("");
  const [userId, setUserId] = useState("");
  const [babyId, setBabyId] = useState(undefined);
  const [babies, setBabies] = useState([]);
  const [babyList, setBabyList] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);

  const [deletingBabyId, setDeletingBabyId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isEditBabyModalOpen, setIsEditBabyModalOpen] = useState(false);
  const [editingBabyInfo, setEditingBabyInfo] = useState({
    name: "",
    age: "",
    weight: "",
    blood_type: "",
    babyId: "",
  });

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const decodedToken = decodeJwtToken(authToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          setUserId(userId);
        }
        const response = await AxiosApi.get("/users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAvailableUsers(response.data);
      } catch (error) {
        console.error("Error trying to get users:", error.message);
      }
    };

    const fetchBabyList = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get(
          `/user_baby/${selectedParent}/baby`
        );
        const responseData = response.data;

        if (Array.isArray(responseData)) {
          setBabyList(responseData);
        } else {
          console.error("Invalid response format:", responseData);
        }
      } catch (error) {
      }
    };

    const fetchbabies = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/baby");
        const responseData = response.data;

        if (Array.isArray(responseData) && responseData.length > 0) {
          const babyId = responseData[0].id;
          setBabyId(babyId);
          setBabies(responseData);
        } else {
          console.error(
            "No babies found or invalid response format:",
            responseData
          );
        }
      } catch (error) {
        console.log("Error trying to list babies.", error.message);
      }
    };

    fetchbabies();
    fetchAvailableUsers();
    fetchBabyList();
  }, []);

  const addBaby = async () => {
    if(!babyName){
      toast.warning("Please, type your baby name")
      return
    }

    if(!babyAge){
      toast.warning("Please, type your baby age")
      return    
    }

    if(!babyAge){
      toast.warning("Please, type your baby age")
      return    
    }


    if(!babyWeight){
      toast.warning("Select a value higher then zero for your baby weight")
      return    
    }


    if(!babyBloodType){
      toast.warning("Please, select at least one blood type")
      return    
    }
    
    if(!selectedParent){
      toast.warning("Please, select a parent for the baby")
      return    
    }


    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("Usuário não autenticado.");
        return;
      }

      if (
        babyName &&
        babyAge &&
        babyWeight &&
        babyBloodType &&
        selectedParent &&
        availableUsers.length > 0
      ) {
        const newBabyEntry = {
          name: babyName,
          age: babyAge,
          weight: babyWeight,
          blood_type: babyBloodType,
        };

        const babyResponse = await AxiosApi.post("/baby", newBabyEntry);
        const newBaby = babyResponse.data;

        await AxiosApi.post(
          `/user_baby/${selectedParent}/baby/${newBaby.id}/associate`
        );
        setBabyList((prevList) => [...prevList, newBaby]);
        setDataInfo({
          name: babyName,
          age: babyAge,
          weight: babyWeight,
          blood_type: babyBloodType,
        });

        setBabyName("");
        setBabyAge("");
        setBabyWeight("");
        setBabyBloodType("");
        setSelectedParent("");

      } else {
        console.log(
          "Dados de alimentação inválidos ou nenhum usuário disponível."
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar informações do bebê:", error);
    }
  };

  const openBabyEditModal = (baby) => {
    setEditingBabyInfo({
      name: baby.name || "",
      age: baby.age || "",
      weight: baby.weight || "",
      blood_type: baby.blood_type || "",
      babyId: baby.id,
    });
    setIsEditBabyModalOpen(true);
  };

  const saveEditedBaby = async () => {
    try {
      const editedFields = {};

      if (editingBabyInfo.name !== "") {
        editedFields.name = editingBabyInfo.name;
      }

      if (editingBabyInfo.age !== "") {
        editedFields.age = editingBabyInfo.age;
      }

      if (editingBabyInfo.weight !== "") {
        editedFields.weight = editingBabyInfo.weight;
      }

      if (editingBabyInfo.blood_type !== "") {
        editedFields.blood_type = editingBabyInfo.blood_type;
      }

      if (Object.keys(editedFields).length > 0) {
        await editBaby(editingBabyInfo.babyId, editedFields);
      }

      closeBabyEditModal();
      setEditingBabyInfo({
        name: "",
        age: "",
        weight: "",
        blood_type: "",
        babyId: "",
      });
    } catch (error) {
      console.error("Erro ao editar bebê:", error);
    }
  };

  const editBaby = async (babyId, newData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("User has to authenticate");
        return;
      }
      const response = await AxiosApi.patch(`/baby/${babyId}`, newData);
      location.reload()      
      toast.success("Baby edited successfully!");
    } catch (error) {
      console.error("Error editing baby:", error);
    }
  };

  const disassociateBaby = async (babyId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("User has to authenticate");
        return;
      }

      await AxiosApi.delete(`/user_baby/${userId}/baby/${babyId}/disassociate`);
    } catch (error) {
      console.error("Error trying to disassociate baby", error);
    }
  };

  const deleteBaby = async (babyId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("User has to authenticate");
        return;
      }

      disassociateBaby(babyId);
      await AxiosApi.delete(`/baby/${babyId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      toast.success("Baby deleted successfully!");
      location.reload()      
    } catch (error) {
      console.error("Error deleting baby:", error);
      toast.error("Error deleting baby. Please try again later.");
    }
  };

  const closeBabyEditModal = () => {
    setIsEditBabyModalOpen(false);
  };

  const setDeleteBaby = (babyId) => {
    setDeletingBabyId(babyId);
    setIsDeleteConfirmationOpen(true);
  };

  const cancelDeleteBaby = () => {
    setDeletingBabyId(null);
    setIsDeleteConfirmationOpen(false);
  };

  const confirmDeleteBaby = async () => {
    try {
      await deleteBaby(deletingBabyId);
    } catch (error) {
      console.error("Error deleting baby:", error);
    } finally {
      setDeletingBabyId(null);
      setIsDeleteConfirmationOpen(false);
    }
  };

  const incrementBabyWeight = () => {
    setBabyWeight((prevBabyWeight) => prevBabyWeight + 1);
  };

  const decrementBabyWeight = () => {
    if (Number(babyWeight) > 0) {
      setBabyWeight((prevBabyWeight) => prevBabyWeight - 1);
    }
  };

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Baby" />
      <Paper
        elevation={0}
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Grid
            container
            spacing={3}
            style={{
              margin: isSmallScreen ? "" : "0 auto",
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: isSmallScreen ? "center" : "",
            }}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Name</Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                variant="outlined"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
              />
              <FormHelperText>Type your baby name</FormHelperText>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Age
              </Typography>
              <TextField
                style={{ width: "250px", marginTop: ".5rem" }}
                variant="outlined"
                value={babyAge}
                onChange={(e) => setBabyAge(e.target.value)}
              />
              <FormHelperText>Type your baby age in months</FormHelperText>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Weight
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: ".5rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={decrementBabyWeight}
                  sx={{
                    marginTop: 1,
                    backgroundColor: "#508b50",
                    "&:hover": {
                      backgroundColor: "#a4dfa4",
                      borderColor: "#a4dfa4",
                      color: "#508b50",
                    },
                  }}
                >
                  -
                </Button>
                <TextField
                  sx={{
                    width: "6.25rem",
                    margin: "0 0.625rem",
                    textAlignLast: "center",
                  }}
                  variant="outlined"
                  type="number"
                  value={babyWeight}
                  onChange={(e) => setBabyWeight(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={incrementBabyWeight}
                  sx={{
                    marginTop: 1,
                    backgroundColor: "#508b50",
                    "&:hover": {
                      backgroundColor: "#a4dfa4",
                      borderColor: "#a4dfa4",
                      color: "#508b50",
                    },
                  }}
                >
                  +
                </Button>
              </div>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Blood Type
              </Typography>
              <Select
                style={{ width: "250px" }}
                label="Breast Side"
                variant="outlined"
                value={babyBloodType}
                onChange={(e) => setBabyBloodType(e.target.value)}
              >
                <MenuItem value="a+">A+</MenuItem>
                <MenuItem value="a-">A-</MenuItem>
                <MenuItem value="b+">B+</MenuItem>
                <MenuItem value="b-">B-</MenuItem>
                <MenuItem value="ab+">AB+</MenuItem>
                <MenuItem value="ab-">AB-</MenuItem>
                <MenuItem value="o+">O+</MenuItem>
                <MenuItem value="o-">O-</MenuItem>
              </Select>
              <Typography variant="h5" style={{ marginTop: ".5rem" }}>
                Select Baby Parent
              </Typography>
              <Select
                style={{ width: "250px" }}
                label="Select Parent"
                variant="outlined"
                value={selectedParent}
                onChange={(e) => setSelectedParent(e.target.value)}
              >
                {availableUsers.length > 0 ? (
                  availableUsers
                    .filter((user) => user.id == userId)
                    .map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem value="" disabled>
                    No users registered!
                  </MenuItem>
                )}
              </Select>
              <Button
                style={{ display: "flex", width: "250px", marginTop: ".5rem" }}
                variant="contained"
                color="primary"
                onClick={addBaby}
                sx={{
                  marginTop: 1,
                  backgroundColor: "#508b50",
                  "&:hover": {
                    backgroundColor: "#a4dfa4",
                    borderColor: "#a4dfa4",
                    color: "#508b50",
                  },
                }}
              >
                Add Baby
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Babies:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {babies
                    .filter((baby) => baby.user_id == userId)
                    .map((baby, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          border: "1px solid #ccc",
                          width: isSmallScreen ? "355px" : "500px",
                          borderRadius: "8px",
                          marginBottom: "0.5rem",
                          margin: "5px 0",
                          backgroundColor: "#c5e2c1",
                        }}
                      >
                        <ListItemText
                          primary={`${baby.name}`}
                          secondary={
                            <>
                              <strong>Age: </strong>
                              {baby.age} months
                              <br />
                              <strong>Weight: </strong>
                              {baby.weight + " kg"}
                              <br />
                              <strong>Blood-type: </strong>
                              {baby.blood_type.toUpperCase()}
                            </>
                          }
                        />
                        <div>
                          <IconButton
                            onClick={() => openBabyEditModal(baby)}
                            aria-label="edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setDeleteBaby(baby.id)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Modal
                            buttonName="Close Window"
                            isOpen={isDeleteConfirmationOpen}
                            closeModal={cancelDeleteBaby}
                            content={
                              <div>
                                <p>
                                  Are you sure you want to delete this baby?
                                </p>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={confirmDeleteBaby}
                                  sx={{
                                    marginTop: 1,
                                    margin: "10px 0",
                                    fontWeight: "500",
                                    backgroundColor: "#508b50",
                                    "&:hover": {
                                      backgroundColor: "#a4dfa4",
                                      borderColor: "#a4dfa4",
                                      color: "#508b50",
                                    },
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={cancelDeleteBaby}
                                  sx={{
                                    marginTop: 1,
                                    marginLeft: 1,
                                    margin: "10px 10px",
                                    backgroundColor: "#333",
                                  }}
                                >
                                  No
                                </Button>
                              </div>
                            }
                          />

                          <Modal
                            buttonName="Close"
                            isOpen={isEditBabyModalOpen}
                            closeModal={closeBabyEditModal}
                            content={
                              <div
                                className="modal-content"
                                style={{
                                  display: "flex",
                                  gap: ".5rem",
                                  flexDirection: "column",
                                  margin: "10px 0",
                                }}
                              >
                                <TextField
                                  placeholder="Name"
                                  value={editingBabyInfo.name}
                                  onChange={(e) =>
                                    setEditingBabyInfo((prevInfo) => ({
                                      ...prevInfo,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                                <TextField
                                  placeholder="Age"
                                  value={editingBabyInfo.age}
                                  onChange={(e) =>
                                    setEditingBabyInfo((prevInfo) => ({
                                      ...prevInfo,
                                      age: e.target.value,
                                    }))
                                  }
                                />
                                <TextField
                                  placeholder="Weight"
                                  value={editingBabyInfo.weight}
                                  onChange={(e) =>
                                    setEditingBabyInfo((prevInfo) => ({
                                      ...prevInfo,
                                      weight: e.target.value,
                                    }))
                                  }
                                />
                                <TextField
                                  placeholder="Blood Type"
                                  value={editingBabyInfo.blood_type}
                                  onChange={(e) =>
                                    setEditingBabyInfo((prevInfo) => ({
                                      ...prevInfo,
                                      blood_type: e.target.value,
                                    }))
                                  }
                                />
                                <Button
                                  style={{
                                    display: "flex",
                                    width: "100px",
                                    marginTop: ".5rem",
                                  }}
                                  variant="contained"
                                  color="primary"
                                  onClick={saveEditedBaby}
                                  sx={{
                                    marginTop: 1,
                                    fontWeight: "500",
                                    backgroundColor: "#508b50",
                                    "&:hover": {
                                      backgroundColor: "#a4dfa4",
                                      borderColor: "#a4dfa4",
                                      color: "#508b50",
                                    },
                                  }}
                                >
                                  edit
                                </Button>
                              </div>
                            }
                          ></Modal>
                        </div>
                      </ListItem>
                    ))}
                </List>
              </div>
              <Typography variant="h5">Created Baby Info:</Typography>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {babyList.map((baby, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        border: "1px solid #ccc",
                        width: isSmallScreen ? "400px" : "500px",
                        borderRadius: "8px",
                        marginBottom: "0.5rem",
                        margin: "5px 0",
                        backgroundColor: "#e9e9e9",
                      }}
                    >
                      <ListItemText
                        primary={`Name: ${baby.name}`}
                        secondary={
                          <>
                            Age: {baby.age} months
                            <br />
                            Weight: {baby.weight + " kg"}
                            <br />
                            Blood-type: {baby.blood_type.toUpperCase()}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};
