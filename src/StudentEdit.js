import React, { useEffect, useState } from 'react'
import url from "./baseURL";
import {
    Typography,
    Box,
   TextField,
   Button
  } from "@mui/material";
import axios from "axios";
import {useParams} from "react-router-dom";
const StudentEdit = () => {
    const [student, setStudent] = useState();
    console.log(student)
    const {id}=useParams()
    useEffect(() => {
        getStudent();
      }, []);
      const getStudent = async () => {
        const data = await axios.get(url + `/api/getStudent/?${id}`);
        setStudent(data.data);
      };
      const handleChange=(event)=>{
        const { name, value} = event.target;
        setStudent(prevState => ({ ...prevState, [name]: value }));
      }
      const onSubmit=async()=>{
        const data = await axios.put(url + `/api/updateStudent/?${id}`,student);
        console.log(data)
      }
  return (
    <>
    {student?
    <>
     <Box >
            <Box sx={{display:'flex',mb:2}} >
            <Typography sx={{fontWeight:600,mt:1}}>First Name:</Typography>
            <TextField name='first_name' defaultValue={student.first_name}onChange={handleChange} size='small'/>
            </Box>
            <Box sx={{display:'flex'}}>
            <Typography sx={{fontWeight:600,mt:1}}>Last Name:</Typography>
            <TextField name='last_name'defaultValue={student.last_name} onChange={handleChange} size='small'/>
            </Box>
        </Box>
        <Button onClick={onSubmit}>Update</Button>
    </>
    :''
    }
    </>
  )
}

export default StudentEdit