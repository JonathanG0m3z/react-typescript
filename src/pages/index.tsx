import { RandomFox } from "@/components/RandomFox";
import { MouseEventHandler, useState } from "react";

const random = (): number => Math.floor(Math.random() * 123) + 1;
const generateId = (): number => new Date().getTime(); 

type ImageItem = {id: number, url: string};

export default function Home(): JSX.Element {
  const [images, setimages] = useState<Array<ImageItem>>([]);

  const handleButton: MouseEventHandler<HTMLButtonElement> = (event)=>{
    event.preventDefault();
    setimages([...images, {id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg`}]);
  };
  
  return (
    <div>
      <main>
        <h1 className="text-green-500">
          Hello platzi
        </h1>
        <button onClick={handleButton}>
          Add new fox
        </button>
        {images.map((item)=>
        <div key={item.id} className="p-4">
          <RandomFox image={item.url} />
        </div>
        )}
      </main>
    </div>
  )
}
