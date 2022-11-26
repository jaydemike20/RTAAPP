import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, VStack, Text, HStack, Button } from "@react-native-material/core";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = () => {
        navigation.navigate('Register');
    };


    const [_, setUser] = useAuth();

    const navigation = useNavigation();

    const handleLogin = () => {
        setIsLoading(true);
        axios({
            method: "POST",
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
            params: {
                key: "AIzaSyDhfkcRMVkJJJd9NLK1NoptoY6pWf5dXpU",
            },
            data: {
                email,
                password,
            },
        })
        .then(res => {
            setUser(res.data);
        }).catch(e => {}).finally(() => {
            setIsLoading(false);
        });
    };


    return (
        <SafeAreaView>
            <VStack spacing={6} style={{padding: 16}}>
                <VStack spacing={1}>
                    <Text variant="h6">Login</Text>
                    <Text variant="subtitle1">Login to your account</Text>
                </VStack>

                <VStack spacing={2} style={{paddingTop: 16}}>

                    <TextInput 
                    label="Email"
                    variant="outlined" 
                    value={email}
                    onChangeText={text=>setEmail(text)}                    
                    />

                    <TextInput 
                    label="Password" 
                    variant="outlined"
                    value={password}
                    onChangeText={text=>setPassword(text)}
                    secureTextEntry={true}                    
                    />
                </VStack>

                <HStack justify="between">
                    <Button 
                    title="Register Instead"
                    onPress={handleRegister}
                    variant="text"                    
                    compact
                    />

                    <Button title="Login"  
                    onPress={handleLogin}
                    loading={isLoading}  
                    />

                </HStack>
            </VStack>
        </SafeAreaView>
    );
}


export default Login;