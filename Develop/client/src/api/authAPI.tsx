import { UserLogin } from "../interfaces/UserLogin";
import Auth from "../utils/auth"; // Import Auth to include Authorization header

const login = async (userInfo: UserLogin) => {
  console.log('Request body:', userInfo); // Debug log for frontend request

  try {
    const res = await fetch('/api/auth/login', { // Updated fetch URL to use proxy
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
      credentials: 'include', // Include credentials for CORS handling if needed
    });

    // Check for HTTP status and handle unauthorized or errors explicitly
    if (res.status === 401) {
      throw new Error('Unauthorized: Invalid username or password');
    }

    if (!res.ok) {
      // Default error message for non-200 responses
      const errorMessage = `Error: ${res.status} - ${res.statusText}`;
      throw new Error(errorMessage);
    }

    // Parse the response body as JSON
    const data = await res.json();
    console.log('Response data:', data); // Debug log for backend response
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in login API:', err.message);
    } else {
      console.error('Error in login API:', err);
    }
    throw err; // Rethrow for the frontend to handle
  }
};

const fetchUserTickets = async (userId: string) => {
  console.log(`Fetching tickets for user: ${userId}`);

  try {
    const res = await fetch(`/api/tickets/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`, // Include Authorization header with token
      },
      credentials: 'include', // Include credentials for CORS handling if needed
    });

    if (!res.ok) {
      const errorMessage = `Error: ${res.status} - ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await res.json();
    console.log('Fetched tickets:', data); // Debug log for backend response
    return data;
  } catch (err) {
    console.error('Error fetching user tickets:', err);
    throw err; // Rethrow for the frontend to handle
  }
};

export { login, fetchUserTickets };
