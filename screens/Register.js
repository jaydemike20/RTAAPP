import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, VStack, Text, HStack, Button } from "@react-native-material/core";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [_, setUser] = useAuth();

    const handleRegister = () => {
        setIsLoading(true);
        axios({
            method: "POST",
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
            params: {
                key: "AIzaSyDhfkcRMVkJJJd9NLK1NoptoY6pWf5dXpU",
            },
            data: {
                email,
                password,
            },
        }).then((res) => {
            axios({
                method: "POST",
                url: "https://identitytoolkit.googleapis.com/v1/accounts:update",
                params: {
                    key: "AIzaSyDhfkcRMVkJJJd9NLK1NoptoY6pWf5dXpU",
                },
                data: {
                    idToken: res.data.idToken,
                    displayName: name,
                },
            }).then(res =>{
                setUser({...res.data, idToken: res.data.idToken});
            }).catch(e => {
                console.log(res.data, "update profile error");
                alert(e.message);
            })
            .finally(() => {
            setIsLoading(false);
            })

            console.log(res.data);
        })
        .catch((e) =>{
            alert(e.message);
        }).finally(() => {
            setIsLoading(false);
        })
    };

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate("Login");
    }


    return (
        <SafeAreaView>
            <VStack spacing={6} style={{padding: 16}}>
                <VStack spacing={1}>
                    <Text variant="h6">Register</Text>
                    <Text variant="subtitle1">Create an account</Text>
                </VStack>

                <VStack spacing={2} style={{paddingTop: 16}}>
                    <TextInput 
                    label="Name" 
                    variant="outlined" 
                    value={name}
                    onChangeText={text=>setName(text)}
                    />

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
                    <Button title="Login Instead" 
                    variant="text" 
                    compact
                    onPress={handleLogin} 
                    />
                    <Button 
                    title="Register"
                    onPress={handleRegister}
                    loading={isLoading} 
                    />
                </HStack>
            </VStack>
        </SafeAreaView>
    );
}


export default Register;