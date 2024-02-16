import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useAuth } from "../../hooks/useProvideAuth";
import axios from "axios";
import { Box, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const emails = ["Ankit Kr", "Poptlal Tkmoc"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [contacts, setContacts] = React.useState([]);
  const { user, addContact } = useAuth();
  const [isAddContactOpen, setIsAddContactOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // reset()
    addToContact(data);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const addToContact = (data) => {
    reset()
    addContact(data)
  };

  const handleAddContactClick = () => {
    setIsAddContactOpen(true);
  };

  // React.useEffect(() => {
  //   axios.get(`/api/v1/user/contacts/${user.id}`).then((res) => {
  //     console.log(res.data);
  //     setContacts(res.data);
  //   });
  // }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Contact List</DialogTitle>
      <List sx={{ pt: 0, width: 500 }}>
        {user.contactList.map((contact) => (
          <ListItem disableGutters key={contact.id}>
            <ListItemButton onClick={() => handleListItemClick(contact.id)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleAddContactClick()}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add Contact" />
          </ListItemButton>
        </ListItem>
      </List>
      {isAddContactOpen && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction={"column"}
              alignContent="center"
              justifyContent={"center"}
              alignItems="center"
              spacing={2}
            >
              <TextField
                placeholder="name"
                sx={{ width: 250 }}
                {...register("name", {
                  required: true,
                  minLength: 1,
                })}
                error={errors?.name}
                helperText={
                  errors.name?.type === "required" && "Name is required"
                }
              />
              <TextField
                placeholder="phone number"
                sx={{ width: 250 }}
                {...register("phoneNumber", {
                  required: true,
                  minLength: 1,
                })}
                error={errors?.phoneNumber}
                helperText={
                  errors.phoneNumber?.type === "required" &&
                  "phone Number is required"
                }
              />
              <Stack direction={"row"} spacing={2}>
                <Button variant="contained" type="submit">Add</Button>
                <Button
                  variant="contained"
                  onClick={() => setIsAddContactOpen(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ContactModal({ open, setOpen }) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
