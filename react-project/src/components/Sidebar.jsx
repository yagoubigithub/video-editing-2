import React, { useContext } from 'react'

//mui
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LinearProgress from '@mui/material/LinearProgress';


//icons
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TitleIcon from '@mui/icons-material/Title';

//context
import {TextContext} from "../context/TextContext"


const Sidebar = () => {

const { setFile , setInsertText } = useContext(TextContext)

    const [progress, setProgress] = React.useState(0);
    const uploadRef = React.useRef();


    const UploadFile = () => {


        var formData = new FormData();

        for (let file = 0; file < uploadRef.current.files.length; file++) {

            formData.append("file" + file, uploadRef.current.files[file], uploadRef.current.files[file].name);

        }


        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", ProgressHandler, false);
        xhr.addEventListener("load", SuccessHandler, false);
        xhr.addEventListener("error", ErrorHandler, false);
        xhr.addEventListener("abort", AbortHandler, false);
        xhr.open("POST", process.env.REACT_APP_BASE_URL + "/api/videos/upload");
        xhr.send(formData);
    };

    const ProgressHandler = (e) => {

        setProgress((e.loaded / e.total) * 100)
    };

    const SuccessHandler = (e) => {
        //loaded
        const file = JSON.parse(e.target.responseText).vid;
        setFile (file)
        setProgress(0)
    };
    const ErrorHandler = () => {
        alert("upload failed!!");
    };
    const AbortHandler = () => {
        alert("upload aborted!!")

    };

    const addText = () => {
        setInsertText(true)
    }

    return (
        <div id='sidebar'>

            <Paper sx={{ width: '100%', height: "100%" }}>


                <MenuList>
                    <MenuItem onClick={() => uploadRef.current.click()}>
                        <ListItemIcon>
                            <FileUploadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Open Video</ListItemText>


                    </MenuItem>
                    <input type="file" name="file" hidden ref={uploadRef} onChange={UploadFile} />
                    {progress > 0 && <LinearProgress variant="determinate" value={progress} />}
                    <MenuItem onClick={addText}>
                        <ListItemIcon>
                            <TitleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>ADD Text</ListItemText>


                    </MenuItem>

                </MenuList>



            </Paper>

        </div>
    )
}

export default Sidebar