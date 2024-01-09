import React, { useContext, useRef, useState } from 'react'


//mui
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'


import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import CloseIcon from '@mui/icons-material/Close';



import { Sketch } from '@uiw/react-color'

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ImageIcon from '@mui/icons-material/Image';
import MoodIcon from '@mui/icons-material/Mood';
import AudioFileIcon from '@mui/icons-material/AudioFile';

//context
import { TextContext } from "../context/TextContext"
import { isAuthenticated, signout } from '../auth';
import Images from './Images';


const fonts = ['Croissant One', 'Fuggles', 'Bebas Neue', 'Pacifico', 'Great Vibes', 'Yellowtail', 'Philosopher', 'Passion One', 'Kaushan Script']
const sizes = [45, 50, 60, 70 , 90]
const Navbar = () => {

    const { setStyle , file , texts  , deleteActiveText , active} = useContext(TextContext)

    const [openColor, setOpenColor] = useState(false);
    const [openBackground, setOpenBackground] = useState(false);

    const [colorhexa, setColorHexa] = useState("#000000ff");
    const [backgroundhexa, setBackgroundHexa] = useState("#ffffff00");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openImage, setOpenImage] = React.useState("none");



    const [fontFamily, setFontFamily] = useState(fonts[0]);
    const [fontSize, setFontSize] = useState(sizes[0]);

    const _logout = ()=> {
        signout(()=>{
            window.location.reload()
        })
    }
    const handleChange = (name, value) => {

        if(name === "color"){
            setStyle( {
                [name] : value,
                fill : value
            })
        }else{
            setStyle( {
                [name] : value
            })
        }
      


    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const uploadAudioRef = useRef(null);
      const uploadAudio = (ev) => {

      }
    
    return (
        <div

            id='navbar'

        >
           
         <div>
        <>
            
            <Select
                 labelId="fonts"
                 id="fonts-select"
                 value={fontFamily}
                 label="Fonts"
                 style={{ width : 200 , marginLeft : 30 }}
                 onChange={(e) => { handleChange("fontFamily", e.target.value); setFontFamily(e.target.value) }}
 
             >
 
                 {fonts.map(font => {
                     return (<MenuItem key={font} style={{ fontFamily: font }} value={font}>{font}</MenuItem>)
                 })}
 
 
             </Select>
 
             <Select
                 labelId="size"
                 id="size-select"
                 value={fontSize}
                 style={{ width : 200  , marginLeft : 30 }}
                 label="Size"
                 onChange={(e) => { handleChange("fontSize", e.target.value); setFontSize(e.target.value) }}
 
             >
 
                 {sizes.map(size => {
                     return (<MenuItem key={size} value={size}>{size}</MenuItem>)
                 })}
 
 
             </Select>
 
 
             <div className='color-container' style={{ width : 30  , marginLeft : 30 }}>
                 <IconButton onClick={() => setOpenColor(!openColor)} style={{color : colorhexa}}>
                     <FormatColorTextIcon />
                 </IconButton>
                 {openColor && <ClickAwayListener onClickAway={() => setOpenColor(false)}
 
 
                 >
 
                     <Sketch color={colorhexa}
                         onBlur={() => setOpenColor(false)}
 
                         id='color-picker'
                         onChange=
 
                         {(color) => {
 
                             setColorHexa(color.hexa);
                             handleChange("color", color.hexa)
                         }} />
                 </ClickAwayListener>}
             </div>
 
             <div className='background-container'  style={{ width : 30  , marginLeft : 30 }}>
                 <IconButton onClick={() => setOpenBackground(!openBackground)} >
                     <FormatColorFillIcon />
                 </IconButton>
                 {openBackground &&
                     <ClickAwayListener onClickAway={() => setOpenBackground(false)}
 
 
                     >
                         <Sketch
                             id='background-picker'
                             color={backgroundhexa}
                             onChange={(color) => {
 
                                 setBackgroundHexa(color.hexa);
                                 handleChange("backgroundColor", color.hexa)
                             }} />
 
 
                     </ClickAwayListener>
                 }
             </div>

             <div className='background-container'  style={{ width : 30  , marginLeft : 30 }}>
                <IconButton onClick={() => setOpenImage('emoji')} >
                    <MoodIcon />
                </IconButton>

                </div>

                <div className='background-container'  style={{ width : 30  , marginLeft : 30 }}>
                <IconButton onClick={() => setOpenImage("image")} >
                    <ImageIcon />
                </IconButton>

                </div>

                <div className='background-container'  style={{ width : 30  , marginLeft : 30 }}>
                <IconButton onClick={() => uploadAudioRef.current.click()}>
                    <AudioFileIcon />
                </IconButton>
                <input type="file" name="file" hidden ref={uploadAudioRef} onChange={uploadAudio} />

                </div>
             {
                active && <div className='background-container'  style={{ width : 30  , marginLeft : 30 }}>
                <IconButton onClick={() => deleteActiveText()} >
                    <DeleteIcon />
                </IconButton>

                </div>
             }
 
            </>
 
 
         </div>
         
            <div>
            {isAuthenticated() && isAuthenticated().user.email}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
             
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={_logout}>logout</MenuItem>
              </Menu>
            </div>
          


            <Dialog
        onClose={()=>setOpenImage("none")}
        aria-labelledby="customized-dialog-title"
        open={openImage !== "none"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {openImage}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>setOpenImage("none")}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <Images type={openImage} />
        
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpenImage("none")}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default Navbar