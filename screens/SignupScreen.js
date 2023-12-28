import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);
    try{
      await createUser(email, password);
    }catch(error){
      Alert.alert('Authentication Failed!', 'Could not create a user. Please try again later.');
    }
   
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating a user ..."/>;
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
