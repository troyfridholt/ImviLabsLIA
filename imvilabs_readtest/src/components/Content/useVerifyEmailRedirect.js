import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useVerifyEmailRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const verifyEmailCookie = cookies.find(cookie => cookie.trim().startsWith('verifyEmail='));

    if (verifyEmailCookie) {
      const verifyEmailValue = verifyEmailCookie.split('=')[1];

      if (verifyEmailValue === 'false') {
        navigate('/verify?redirected=true');
      }
    }
  }, []);
};

export default useVerifyEmailRedirect;
