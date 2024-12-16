import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  console.log('Request body:', userInfo); // Debug log for frontend request

  try {
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
      credentials: 'include', // Include credentials for CORS handling if needed
    });

    // Read the response body once
    const rawBody = await res.text();

    if (!res.ok) {
      // Parse the raw body as JSON, fallback to plain text
      let errorMessage = 'Login failed'; // Default error message
      try {
        const errorData = JSON.parse(rawBody); // Attempt to parse JSON
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = rawBody; // Fallback to plain text if JSON parsing fails
      }
      throw new Error(errorMessage);
    }

    // If the response is OK, parse it as JSON
    const data = JSON.parse(rawBody);
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

export { login };
