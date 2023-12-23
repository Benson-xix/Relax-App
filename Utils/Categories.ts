import {  MdLightbulb, MdStorefront } from "react-icons/md";
import { GiPillow, GiSleepingBag } from "react-icons/gi";
import { FaBed,  } from "react-icons/fa";
import { FaMattressPillow} from "react-icons/fa6";
import {BiSolidBlanket } from "react-icons/bi"

export const categories = [
    {
        label : 'All',
        icon: MdStorefront
    },

    {
        label : 'Beds',
        icon : FaBed
    },

    {
        label: 'Foams',
        icon : FaMattressPillow
    },

    {
        label: 'Bed-Cover',
        icon : BiSolidBlanket
    },


    {
        label: 'Pillows',
        icon : GiPillow
    },

    {
        label: 'Futon',
        icon : GiSleepingBag
    },
    {
        label: 'Bed-Room-Lights',
        icon : MdLightbulb
    }
]