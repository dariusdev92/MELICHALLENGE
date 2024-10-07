import { Link } from "react-router-dom"
import XImage from "./XImage"

interface props
{
    imgSrc: string,
    link?: string,
    desc?: string
}

export default function Logo({ imgSrc, link = "/", desc = "" }: props)
{
    return (
        <div className="logo">
            <Link to={link} >
                <XImage {...{ src: imgSrc, alt: desc }} />
            </Link>
        </div>
    )
}