import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';


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
                        <Ionicons size={28} name="home" color={color} />
                    ),
                }}
            />

             <Tabs.Screen
                name="cadastro"
                options={{
                    title: 'Cadastro',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="people" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="lista"
                options={{
                    title: 'Lista',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="list" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="editar"
                options={{
                    title: 'Editar',
                    tabBarIcon: ({ color }) => (
                    <Feather name="edit" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="vagas"
                options={{
                    title: 'Vagas',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="bicycle-outline" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="integrantes"
                options={{
                    title: 'Devs',
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="desktop" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
