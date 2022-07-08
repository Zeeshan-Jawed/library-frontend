import React from 'react'
import {
    Typography,
    Box,
    TableRow,
    TableCell,
    TableHead,
    Table,
    TableContainer,
    TableBody,
    Modal,
    Button,
    Stack,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import { Link } from 'react-router-dom';
  import axios from "axios";
  import url from "./baseURL";
  import { useEffect, useState } from "react";
  import Paper from "@mui/material/Paper";
  import EditIcon from "@mui/icons-material/Edit";
  import IconButton from "@mui/material/IconButton";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "13px",
    p: 4,
  };
const Home = () => {
   
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    useEffect(() => {
      getStudents();
      getBooks();
    }, []);
    const getStudents = async () => {
      const data = await axios.get(url + "/api/getStudents");
      setStudents(data.data);
    };
    const getBooks = async () => {
      const data = await axios.get(url + "/api/getBooks");
      setBooks(data.data);
    };
    const handleModel=(item)=>{
      setOpen1(true)
      setStudent(item)
    }
    const handleBookModel=(item)=>{
      setOpen(true)
      setBook(item)
    }
    return (
      <>
        <Box>
          <Typography sx={{ m: 1 }} variant='h5'>Student List</Typography>
          <div style={{ height: 300, width: "100%" }}>
            <TableContainer component={Paper} sx={{ my: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "600" }}>Id</TableCell>
                    <TableCell align="left" style={{ fontWeight: "600" }}>
                      First Name
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "600" }}>
                     Last Name
                    </TableCell>
                    
                    <TableCell align="right" sx={{ pr: 4, fontWeight: "600" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students ? (
                    students.map((item, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {item.id}
                          </TableCell>
                          <TableCell align="left">{item.first_name}</TableCell>
                          <TableCell align="left">{item.last_name}</TableCell>
                          
                          <TableCell align="right">
                            <IconButton
                              aria-label="view"
                              size="small"
                              onClick={() => handleModel(item)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton size="small" component={Link}  to={`/student/edit/id=${item.id}`} >
                              <EditIcon  />
                            </IconButton>
  
                            <Modal
                              open={open1}
                              BackdropProps={{ style: { opacity: "0.1" } }}
                            >
                              <Box sx={style}>
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  sx={{ textAlign: "center" }}
                                >
                                  Details
                                </Typography>
                                <List>
                                  <ListItem disablePadding>
                                      <ListItemText primaryTypographyProps={{ style: {fontWeight:600} }} primary="Name:" />
                                      <ListItemText primary={`${student.first_name} ${student.last_name}`}/>
                                  </ListItem>
                                 
                                </List>
                                <Stack
                                  spacing={2}
                                  direction="row"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    onClick={() => setOpen1(false)}
                                  >
                                    Close
                                  </Button>
                                </Stack>
                              </Box>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell />
  
                      <TableCell />
  
                      <TableCell align="center">
                        <CircularProgress />
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
        <Box>
          <Typography sx={{ m: 1 }} variant='h5'>Books List</Typography>
          <div style={{ height: 300, width: "100%" }}>
            <TableContainer component={Paper} sx={{ my: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "600" }}>Id</TableCell>
                    <TableCell align="left" style={{ fontWeight: "600" }}>
                      Book Name
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "600" }}>
                      Author
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "600" }}>
                      Borrowed By
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "600" }}>
                      Date Of Borrow
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "600" }}>
                      Expected Date Of Return
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 4, fontWeight: "600" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books ? (
                    books.map((item, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {item.id}
                          </TableCell>
                          <TableCell align="left">{item.book_name}</TableCell>
                          <TableCell align="left">{item.author}</TableCell>
                          <TableCell align="left">{item.borrowed_by}</TableCell>
                          <TableCell align="left">
                            {item.date_of_borrow}
                          </TableCell>
                          <TableCell align="left">
                            {item.expected_date_of_return}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              aria-label="view"
                              size="small"
                              onClick={() => handleBookModel(item)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton aria-label="edit" size="small" component={Link}  to={`/book/edit/id=${item.id}`}>
                              <EditIcon />
                            </IconButton>
  
                            <Modal
                              open={open}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              BackdropProps={{ style: { opacity: "0.1" } }}
                            >
                              <Box sx={style}>
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  sx={{ textAlign: "center" }}
                                >
                                  Details
                                </Typography>
                                <List>
                                  <ListItem disablePadding>
                                      <ListItemText primaryTypographyProps={{ style: {fontWeight:600} }} primary="Book Name:" />
                                      <ListItemText primary={`${book.book_name}`}/>
                                  </ListItem>
                                  <ListItem disablePadding>
                                      <ListItemText primaryTypographyProps={{ style: {fontWeight:600} }} primary="Author:" />
                                      <ListItemText primary={`${book.author}`}/>
                                  </ListItem><ListItem disablePadding>
                                      <ListItemText primaryTypographyProps={{ style: {fontWeight:600} }} primary="Borrowed By:" />
                                      <ListItemText primary={`${item.first_name} ${item.last_name}`}/>
                                  </ListItem><ListItem disablePadding>
                                      <ListItemText primaryTypographyProps={{ style: {fontWeight:600} }} primary="Date Of Borrow:" />
                                      <ListItemText primary={`${book.date_of_borrow}`}/>
                                  </ListItem><ListItem disablePadding>
                                      <ListItemText primaryTypographyProps={{ style: {fontWeight:600} }} primary="Expected Return Date:" />
                                      <ListItemText primary={`${book.expected_date_of_return}`}/>
                                  </ListItem>
                                </List>
                                <Stack
                                  spacing={2}
                                  direction="row"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    onClick={() => setOpen(false)}
                                  >
                                    Close
                                  </Button>
                                </Stack>
                              </Box>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell />
  
                      <TableCell />
  
                      <TableCell align="center">
                        <CircularProgress />
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </>
    );
}

export default Home