import { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function XImage({ src = "", alt = "", useSkeleton = true }: any)
{
    const style: React.CSSProperties = {
        objectFit: 'contain',
        objectPosition: 'center'
    }

    return <img src={src} alt={alt} style={style} />
}