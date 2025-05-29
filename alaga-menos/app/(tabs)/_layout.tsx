import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#1c92ff",
                tabBarInactiveTintColor: "#ffffff",
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopColor: "#1c92ff",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={25} name="home" color={color} />
                    ),
                }}
            />

             <Tabs.Screen
                name="cadastro"
                options={{
                    title: 'Cadastro',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={30} name="add" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="enderecos"
                options={{
                    title: 'Endereços',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="list" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="mapa"
                options={{
                    title: 'Mapa',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={25} name="map" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="integrantes"
                options={{
                    title: 'Devs',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={25} name="desktop" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="sobre"
                options={{
                    title: 'Sobre',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={27} name="information-circle" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
