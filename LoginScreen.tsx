import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useSignInMutation} from './src/redux/api/auth.api';
import {useAppDispatch, useAppSelector} from './src/store/store';
import {signIn} from './src/redux/slices/authSlice';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {isSuccess, isLoading}] = useSignInMutation();
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    try {
      const response: any = await login({email, password});
      console.log('response', JSON.stringify(response, null, 2));
      dispatch(signIn(response.data));
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
    }
    // Add your login logic here
    console.log('Logging in...');
  };
  const token = useAppSelector(state => state.auth.token);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      {token && (
        <Text
          style={{
            fontSize: 36,
            fontWeight: 'bold',
          }}>
          {token}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
