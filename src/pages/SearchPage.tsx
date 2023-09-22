import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function SearchPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
    //   console.log(searchParams);
      
    }, [searchParams])
    

    return (
        <p>
            { searchParams }
        </p>
    )
}