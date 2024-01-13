import React, { useState } from 'react';
import { Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const LandingScreen = ({ navigation }) => {
    //  const navigation = useNavigation();
    // const props= this.props;
    const [count, setCount] = useState(0);
    const onPress = () => setCount(prevCount => prevCount + 1);

    return (
        <ScrollView>
            <View>
                <View>
                    <Card >
                        <Card.Content>
                        <Card.Cover source={require('../Assets/imli_banner.png')} />
                        <Card >
                        <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}> 
                <TouchableOpacity
                    onPress={(() => navigation.navigate('AdminScreen'))}
                >
                    <Text style={{ color: 'red' }}> </Text>
                </TouchableOpacity>
                </Card.Content>
                    </Card>
              </Card.Content>
                    </Card>         
                    <Card >
                        <Card.Content style={{ width: 400, borderRadius: 50, alignItems: 'center' }}> 
                            <Title>IMLI help us on Following :</Title>
                            <Paragraph style={styles.h2}>
                                Strengthening the Bonding between Us. {'\n'}
                                Right Gift for someone we like. {'\n'}
                                Only our frineds know our choices. {'\n'}
                                Change mind and start afresh, when needed. {'\n'}
                                Go anonymous and surprise a friend.
                            </Paragraph>
                        </Card.Content> 
                    </Card>
                    <Card >
                        <Card.Content > 
                            <Title>What it needs to be::</Title>
                            <Paragraph>
                                Check for messages.
                                {'\n'}
                                Click on the gift.
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            </View>
            <View >
                <Card style={ styles.container}
>
                <TouchableOpacity
                    style={{ width: 150, backgroundColor: "lightgreen", borderRadius: 20, alignItems: 'center' }}
                    
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ color: '#FFBF00', fontWeight: 'bold', padding: 10, fontSize: 15 }}> 
                    <Icon name="login" style={{ color: '#FFBF00', fontSize: 25 }} /> Login
                    </Text>
                </TouchableOpacity>
                </Card>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Want to join the club? </Text>
                    {/* <Text style={styles.innerText}> */}
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={(() => { navigation.navigate('Signup') })}
                    ><Text style={{ color: 'red' }}> SignUp </Text>
                    </TouchableOpacity>

                    {/* </Text> */}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text style={styles.h2}>FAQ</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    h1: {
        color: '#008F68',
        fontSize: 40,
        marginTop: 0,
    },
    h2: {
        color: '#008F68',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 0,
    },
    h3: {
        justifyContent: 'center',
        paddingTop: 8,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    image: {
        width: 30,
        height: 30,
    },
    innerText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 45,
    },
    paragraph: {
        fontSize: 24,
        textAlign: 'center',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    middleContainer: {
        flex: 3,
        backgroundColor: '#ecf0f1',

    },
    bottomContainer: {
        justifyContent: 'flex-end',
        width: '90%',
        alignItems: 'center',
    },
    buttonContainer: {
        borderRadius: 1,
        padding: 50,
        margin: 8,
    },
});
export default LandingScreen;