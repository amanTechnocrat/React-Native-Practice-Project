import React from 'react';
import {
    View,
    SafeAreaView,
    ScrollView
} from 'react-native';
import FlatCard from './components/FlatCard';
import ImageCard from './components/ImageCard';
import ScrollCard from './components/ScrollCard';


const App = () => {

    return (
        <SafeAreaView>
            <ScrollView>
                <FlatCard />
                <ScrollCard />
                <ImageCard />
            </ScrollView>
        </SafeAreaView>
    );
};



export default App;
