import { useEffect, useRef, useState } from "react";
import type {ImgHTMLAttributes} from "react";

type LazyImageProps = {src: string};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps &  ImageNative;

export const LazyImage =({...imgProps}: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null);
    const [src, setSrc] = useState<string>("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    useEffect(() => {
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setSrc(imgProps.src)
                }
            })
        });
        if(node.current) observer.observe(node.current);
        // observer.observe(node.current!); eliminar errores de typescript
        return () => { 
            observer.disconnect()
        }
    }, [imgProps.src]);

    
    return <img ref={node} width={320} height="auto" className="rounded bg-gray-300" {...imgProps} />
};