import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ListRenderItem, useColorScheme } from 'react-native';
import { Picker} from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { GamePositionsScore, getNameTeam } from '../types';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function getColorShirt(color:string){
  switch (color) {
    case 'Red':
      return 'red';
    case 'Green':
      return 'green'
    case 'Yellow':
      return 'yellow'
    case 'Black':
      return 'black'
    case 'White':
      return 'white'
    case 'Purple':
      return '#8D00E5'
    case 'Lightblue':
      return '#0197E5'
    case 'Orange':
      return '#E65000'
    default:
      return 'gray'
  }
}



export default function GamePositions(){
    const [selectedGame, setSelectedGame] = useState<string>("");
    const [califications, setCalifications] = useState<GamePositionsScore[]>([]);
    const [games, setGames] = useState<string[]>([])
    const colorScheme = useColorScheme(); // Detecta el esquema de color
    const isDarkMode = colorScheme === 'dark';    

    useEffect(() => {
        const fetchAnalysis = async () => {
            const scoresRef = collection(db, "Games");
            const q = query(scoresRef, where("jugado", "==", true));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              const games:string[] = []
              querySnapshot.forEach(game => {
                  games.push(game.id);
              });
              setGames(games);
            } else {
              setGames([]);
            }
        };

        fetchAnalysis();
    }, []);

  function handleChangeSelectedGame(itemValue: string) {
    // console.log("Juego seleccionado: ", itemValue);
    setSelectedGame(itemValue);

    const fetchResults = async() => {
        const docRef = doc(db, "Games", itemValue);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          const calif:GamePositionsScore[] = []
          let position = 1
          const posiciones:{equipo:string[];puntos:number}[] = docSnap.data().calificacion
          posiciones.forEach(cal => {
              calif.push({posicion:position, puntos:cal.puntos, equipo:cal.equipo});
              position += 1
          });
          setCalifications(calif);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          setCalifications([]);
        }
    }

    fetchResults();

  }

  const renderItem:ListRenderItem<GamePositionsScore> = ({item, index}) => (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.itemPos}>{item.posicion}</ThemedText>
      
      <View key={index} style={{flexDirection:'column', justifyContent:'space-between',backgroundColor:isDarkMode ? '#555555' : '#aaa', width:'66%'}}> 
        {item.equipo.map((team:string) => 
          <View style={{flexDirection:'row', justifyContent:'center'}} key={team} >      
            <Ionicons name="shirt" size={30} color={getColorShirt(team)} style={{marginVertical:'auto', marginLeft:17}}/>
            <ThemedText style={styles.itemText}>{getNameTeam(team)}</ThemedText>
          </View>
        )}
      </View>

      <ThemedText style={styles.itemScore}>{item.puntos}</ThemedText>
  </ThemedView>
  );

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom:138

  },
  picker: {
    height: 50,
    width: 200,
    marginRight:'auto',
    color:isDarkMode ? 'white' : 'black',
    backgroundColor: isDarkMode ? '#333' : '#ccc'
  },
  item: {
    flexDirection:'row', 
    backgroundColor: isDarkMode ? '#333' : '#ccc',
    marginVertical: 3, 
    borderRadius: 5, 
    justifyContent:'space-between', 
    alignContent:'center',
    flex:1
  },
  itemText: {
    fontSize: 18,
    fontWeight:'bold',
    paddingVertical: 15,
    paddingLeft:5,
    marginRight:'auto',
    color:isDarkMode ? 'white' : 'black',
    flexWrap:'wrap',
    width:'83%'
  },
  itemScore: {
    fontSize: 22,
    fontWeight:'bold',
    paddingVertical: 15,
    paddingRight:10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width:'24%',
    textAlign:'right',
    marginVertical:'auto',
    color:isDarkMode ? 'white' : 'black'
  },
  itemPos :{
    fontSize: 28,
    fontWeight:'bold',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    textAlign:'center',
    marginVertical:'auto',
    color:isDarkMode ? 'white' : 'black',
    width:'10%',
    paddingVertical:15
  }
});

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView  style={styles.container}>
      <SafeAreaView>
        <ThemedText type="title">Puntos por juego</ThemedText>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <ThemedText type='defaultSemiBold' style={{marginVertical:'auto', marginRight:15, fontSize:20, marginLeft:'auto'}}>Juego: </ThemedText>
          <Picker
            selectedValue={selectedGame}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              if (typeof itemValue === 'string') {
                handleChangeSelectedGame(itemValue);
              }
            }}
          >
            {games?.map(game => 
              <Picker.Item key={game} label={game} value={game} />
            )}
          </Picker>
        </View>  
        <FlatList
          style={{marginTop:25, width:'100%'}}
          data={califications}
          renderItem={renderItem}
          keyExtractor={item => item.posicion.toFixed()}
        />
      </SafeAreaView>

      </ThemedView>
      </GestureHandlerRootView>
    );
};
