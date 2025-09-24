export interface SignUpResponse {
    success: boolean;
    userId?: string;   // backend might return new user's ID
    email?: string;    // sometimes email is echoed back
    message?: string;
  }
  