import React from 'react'


//mui
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const fonts = ['Croissant One', 'Fuggles', 'Bebas Neue', 'Pacifico', 'Great Vibes', 'Yellowtail', 'Philosopher', 'Passion One', 'Kaushan Script']
const Navbar = () => {
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
        </div>
    )
}

export default Navbar