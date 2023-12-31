import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import { login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import {AuthContext} from '../store/auth-context';


function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx= useContext(AuthContext);
  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try{
      const token= await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication Failed!', 'Could not log you in. Please check your credentials and try again.');
      console.log(error);
      setIsAuthenticating(false);
    }
   //
    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in  ..."/>;
  }
  return <AuthContent isLogin  onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
