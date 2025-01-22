import { useEffect, useState } from "react";
import Malmasala from "./Malmasala";
import axios from 'axios';  // Add this import


function Trending() {
    const [data, setData] = useState([]); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null);

    useEffect(() => {        
        const fetchData = async () => {
            try {
                const response = await axios.get('https://luxurystorebackend.onrender.com/get-data');
                // console.log(response.data)
                setData(response.data); // Store the response data
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };
        
        fetchData(); // Call the fetch function        
    }, []);

    if (loading) {
        return <div className="text-2xl py-4">Loading...</div>; // Show a loading message while the data is being fetched
    }

    if (error) {
        return <div>{error}</div>; // Show error message if there’s an issue fetching the data
    }

    return (
        <div className="text-2xl">
            <p className="pt-4">Trending Now 🔥</p>
            <div className="h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-300">
                {data.map((item, index) => (
                    <Malmasala 
                        key={index} // Add a unique key for each component
                        vlabel={item.vlabel}
                        vlink={item.vlink}
                        postedby={item.postedby}
                    />
                ))}
            </div>
        </div>
    );
}

export default Trending;