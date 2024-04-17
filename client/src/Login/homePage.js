import React, { useState, useEffect } from 'react';

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user information from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            // If user information exists, parse it and set the user state
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []); // Empty dependency array to run the effect only once when component mounts

    return (
        <div>
            <h1>Welcome to the HomePage!</h1>
            {user && (
                <div>
                    <h2>User Information:</h2>
                    <p>Email: {user.email}</p>
                    {/* Display other user information as needed */}
                </div>
            )}
        </div>
    );
}

export default HomePage;
