import React, { useState } from 'react'


//mui
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';



import { Sketch } from '@uiw/react-color'

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';


const fonts = ['Croissant One', 'Fuggles', 'Bebas Neue', 'Pacifico', 'Great Vibes', 'Yellowtail', 'Philosopher', 'Passion One', 'Kaushan Script']
const sizes = [10, 14, 18, 22, 25]
const Navbar = () => {
    const [openColor, setOpenColor] = useState(false);
    const [openBackground, setOpenBackground] = useState(false);

    const [colorhexa, setColorHexa] = useState("#ffffff00");
    const [backgroundhexa, setBackgroundHexa] = useState("#ffffff00");

    return (
        <div

            id='navbar'

        >

            <Select
                labelId="fonts"
                id="fonts-select"
                value={fonts[0]}
                label="Fonts"
                style={{ fontFamily: fonts[0] }}

            >

                {fonts.map(font => {
                    return (<MenuItem key={font} style={{ fontFamily: font }} value={font}>{font}</MenuItem>)
                })}


            </Select>

            <Select
                labelId="size"
                id="size-select"
                value={sizes[0]}
                label="Size"


            >

                {sizes.map(size => {
                    return (<MenuItem key={size} value={size}>{size}</MenuItem>)
                })}


            </Select>


            <div className='color-container'>
                <IconButton onClick={() => setOpenColor(!openColor)} >
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
                        }} />
                </ClickAwayListener>}
            </div>

            <div className='background-container'>
                <IconButton onClick={() => setOpenBackground(!openBackground)}>
                    <DeleteIcon />
                </IconButton>
                {openBackground &&
                    <ClickAwayListener onClickAway={() => setOpenBackground(false)}


                    >
                          <Sketch
                            id='background-picker'
                            color={backgroundhexa}
                            onChange={(color) => {

                                setBackgroundHexa(color.hexa);
                            }} />
                            
                            
                            </ClickAwayListener>
                }
            </div>


        </div>
    )
}

export default Navbar