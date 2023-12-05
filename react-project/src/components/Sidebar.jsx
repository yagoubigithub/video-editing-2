import React, { useContext, useEffect } from 'react'

//mui
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



//icons
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TitleIcon from '@mui/icons-material/Title';
import TheatersIcon from '@mui/icons-material/Theaters';

//context
import { TextContext } from "../context/TextContext"


const Sidebar = () => {

    const { setFile, setInsertText, file } = useContext(TextContext)

    const [progress, setProgress] = React.useState(0);
    const [openVideos, setOpenVideos] = React.useState(false);
    const uploadRef = React.useRef();
    const [videos, setVideos] = React.useState([])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/videos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                const { videos } = result;

                console.log(videos)
                setVideos(videos)

            })
    }, [])

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
        setFile(file)
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


    const handleCloseVideos = () => {

        setOpenVideos(false)
    }
    const handleOpenVideos = () => {
        setOpenVideos(true)
    }
    return (
        <div id='sidebar'>

            <Paper sx={{ maxWidth: '100%', height: "100%" }}>


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

                    <MenuItem onClick={handleOpenVideos}>
                        <ListItemIcon>
                            <TheatersIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Videos</ListItemText>


                    </MenuItem>

                </MenuList>



            </Paper>

            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={openVideos}
                onClose={handleCloseVideos}
            >
                <DialogTitle>Videos</DialogTitle>
                <DialogContent>


                    {videos.map(_file => {
                        return (<video key={_file._id} style={{ border: file._id == _file._id ? "3px solid red" : "none" }} onClick={() => setFile(_file)} width={200} src={`${process.env.REACT_APP_BASE_URL}/api/videos/uploads/${_file.filename}/${_file.type.split("/")[1]}`}>

                        </video>)
                    })}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVideos}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Sidebar