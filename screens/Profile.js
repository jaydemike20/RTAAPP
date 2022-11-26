import { Text } from "react-native";
import { useAuth } from "../AuthContext";

const Profile = () => {
    const [user] = useAuth();
    return <Text>{user.displayName}</Text>;
}


export default Profile;