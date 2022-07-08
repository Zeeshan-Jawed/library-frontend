import React, { useEffect, useState } from "react";
import url from "./baseURL";
import { Typography, Box, TextField, Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
const BookEdit = () => {
  const [book, setBook] = useState();
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getBook();
    getStudents();
  }, []);
  const getBook = async () => {
    const data = await axios.get(url + `/api/getbook/?${id}`);
    setBook(data.data);
  };
  const getStudents = async () => {
    const data = await axios.get(url + "/api/getStudents");
    setStudents(data.data);
  };
  const handleChangeBorrow = (newValue) => {
    setBook((prevState) => ({ ...prevState, ["date_of_borrow"]: newValue }));
  };
  const handleChangeReturn = (newValue) => {
    setBook((prevState) => ({ ...prevState, ["date_of_borrow"]: newValue }));
  };
  const handleChanges = (event) => {
    const { name, value } = event.target;
    console.log(value)
    setBook((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = async () => {
    let obj={
        id:book.id,
        author:book.author,
        book_name:book.book_name,
        borrowed_by:book.borrowed_by,
        date_of_borrow:book.date_of_borrow,
        expected_date_of_return:book.expected_date_of_return
    }
    const data = await axios.put(url + `/api/updatebook/?${id}`, obj);
    console.log(data);
  };
  return (
    <>
      {book ? (
        <>
          <Box>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography sx={{ fontWeight: 600, mt: 1 }}>
                Book Name:
              </Typography>
              <TextField
                name="book_name"
                defaultValue={book.book_name}
                onChange={handleChanges}
                size="small"
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: 600, mt: 1 }}>Author:</Typography>
              <TextField
                name="author"
                defaultValue={book.author}
                onChange={handleChanges}
                size="small"
              />
            </Box>
            <Box sx={{ display: "flex",mt:1 }}>
            <Typography sx={{ fontWeight: 600, mt: 1 }}>Borrowed By:</Typography>
              <Select
              size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='borrowed_by'
                value={book.borrowed_by}
                label="Borrowed By"
                onChange={handleChanges}
              >
                {students.map(student=>{
                    return(
                        <MenuItem key={student.id}value={student.id}>{student.first_name} {student.last_name}</MenuItem>
                    )
                }
                    )}
               
              </Select>
            </Box>
            <Box sx={{ display: "flex", mt: 1 }}>
              <Typography sx={{ fontWeight: 600, mt: 1 }}>
                Date Of Borrow:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="yyyy/dd/MM"
                  name="date_of_borrow"
                  value={book.date_of_borrow}
                  onChange={handleChangeBorrow}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", mt: 1 }}>
              <Typography sx={{ fontWeight: 600, mt: 1 }}>
                Expected Date Of Return:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="yyyy/dd/MM"
                  name="expected_date_of_return"
                  value={book.expected_date_of_return}
                  onChange={handleChangeReturn}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Button onClick={onSubmit}>Update</Button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default BookEdit;
