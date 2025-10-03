export interface SignUpResponse {
    success: boolean;
    userId?: string;   // backend return new user's ID
    email?: string;    // sometimes email is echoed back
    message?: string;
  }
  