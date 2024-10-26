import React, { useState } from 'react';

const HospitalSearch = () => {
    const [location, setLocation] = useState('');
    const [state, setState] = useState('');

    // Function to search hospitals by location
    const searchHospitalsByLocation = (location) => {
        // Implement the search logic here (e.g., API call)
        console.log("Searching hospitals by location:", location);
        // Example: Fetch from API
        // fetch(`/api/hospitals?location=${location}`)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
    };

    // Function to search hospitals by state
    const searchHospitalsByState = (state) => {
        // Implement the search logic here (e.g., API call)
        console.log("Searching hospitals by state:", state);
        // Example: Fetch from API
        // fetch(`/api/hospitals?state=${state}`)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
    };

    // Handler for searching by location
    const handleSearchByLocation = () => {
        if (location) {
            searchHospitalsByLocation(location);
        } else {
            alert("Please enter a location");
        }
    };

    // Handler for searching by state
    const handleSearchByState = () => {
        if (state) {
            searchHospitalsByState(state);
        } else {
            alert("Please enter a state");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Hospital Search</h2>
            <div>
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Search by Location" 
                    style={{ marginBottom: '10px', width: '100%', padding: '8px' }} 
                />
                <button onClick={handleSearchByLocation} style={{ width: '100%', padding: '8px' }}>Search by Location</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <input 
                    type="text" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                    placeholder="Search by State" 
                    style={{ marginBottom: '10px', width: '100%', padding: '8px' }} 
                />
                <button onClick={handleSearchByState} style={{ width: '100%', padding: '8px' }}>Search by State</button>
            </div>
        </div>
    );
};

export default HospitalSearch;
