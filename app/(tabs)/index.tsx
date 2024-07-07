import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem, ViewStyle, TextStyle, ImageBackground, useColorScheme } from 'react-native';
import { Team } from '../types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
// Firebase
import { db } from "../firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

export default function HomeScreen() {
  const [calification, setCalification] = useState<Team[]>([]);
  const colorScheme = useColorScheme(); // Detecta el esquema de color
  const isDarkMode = colorScheme === 'dark';  

    useEffect(() => {
        const fetchAnalysis = async () => {
            const teamsRef = collection(db, "Teams");
            const q = query(teamsRef, orderBy("score", "desc"));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const calif:Team[] = []
                // Si hay análisis, actualiza el estado y verifica si alguno tiene imagesResults
                querySnapshot.forEach(doc => {
                    calif.push({id:doc.id, name:doc.data().name, score:doc.data().score});
                    // console.log(doc.id, " => ", doc.data());

                });
                setCalification(calif);
            } else {
                setCalification([]);
            }
        };

        fetchAnalysis();
    }, []);

    function darkenColor(color: string, amount: number) {
      let colorCode = color.substring(1); // Remove the '#'
      let num = parseInt(colorCode, 16);
      
      let r = (num >> 16) - amount;
      let g = ((num >> 8) & 0x00FF) - amount;
      let b = (num & 0x0000FF) - amount;
    
      r = r < 0 ? 0 : r;
      g = g < 0 ? 0 : g;
      b = b < 0 ? 0 : b;
    
      return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    }

  const renderItem:ListRenderItem<Team> = ({ item, index }) => (
    // <ThemedView style={getStyle(item.id).item}>
    //   <ThemedText style={getStyle(item.id).itemPos}>{index+1}</ThemedText>
    //   <ThemedText style={getStyle(item.id).itemText}>{item.name}</ThemedText>
    //   <ThemedText style={getStyle(item.id).itemScore}>{item.score}</ThemedText>
    // </ThemedView>
    <ThemedView style={styles.item}>
    <ThemedText style={styles.itemPos}>{index+1}</ThemedText>
    
    <View key={index} style={{flexDirection:'column', justifyContent:'space-between', backgroundColor:isDarkMode ? '#555' : '#aaa', width:'58%'}}> 
      {/* {item.equipo.map((team:string) =>  */}
        <View style={{flexDirection:'row', justifyContent:'center'}} key={item.name} >      
          <Ionicons name="shirt" size={30} color={getColorShirt(item.id)} style={{marginVertical:'auto', marginLeft:5}}/>
          <ThemedText style={styles.itemText}>{item.name}</ThemedText>
        </View>
      {/* )} */}
    </View>

    <ThemedText style={styles.itemScore}>{item.score}</ThemedText>
</ThemedView>
  );

  function getStyle(color:string){
    let itemStyle: { item: ViewStyle, itemText: TextStyle, itemScore:TextStyle, itemPos:TextStyle } = {
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        borderRadius: 5      
      },
      itemText: {
        fontSize: 18,
        fontWeight:'semibold',
        paddingVertical: 20,
        paddingHorizontal:10,
        marginRight:'auto'
      },
      itemScore: {
        fontSize: 22,
        fontWeight:'bold',
        paddingVertical: 20,
        paddingHorizontal:10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        width:90,
        textAlign:'right'
      },
      itemPos :{
        fontSize: 28,
        fontWeight:'bold',
        paddingVertical: 20,
        paddingHorizontal:10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        textAlign:'left'
      }
    };

    switch (color) {
      case 'Red':
        return {
          item: { ...itemStyle.item, backgroundColor: 'red' },
          itemText: { ...itemStyle.itemText, color: 'white' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#FF0000', 30), color: 'white' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#FF0000', 30), color: 'white' },
        };
      case 'Green':
        return {
          item: { ...itemStyle.item, backgroundColor: 'green' },
          itemText: { ...itemStyle.itemText, color: 'white' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#008000', 30), color: 'white' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#008000', 30), color: 'white' },
        };
      case 'Yellow':
        return {
          item: { ...itemStyle.item, backgroundColor: 'yellow' },
          itemText: { ...itemStyle.itemText, color: 'black' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#FFFF00', 30), color: 'black' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#FFFF00', 30), color: 'black' },
        };
      case 'Black':
        return {
          item: { ...itemStyle.item, backgroundColor: '#050505' },
          itemText: { ...itemStyle.itemText, color: 'white' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#050505', 30), color: 'white' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#050505', 30), color: 'white' },
        };
      case 'White':
        return {
          item: { ...itemStyle.item, backgroundColor: 'white' },
          itemText: { ...itemStyle.itemText, color: 'black' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#FFFFFF', 30), color: 'black' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#FFFFFF', 30), color: 'black' },
        };
      case 'Purple':
        return {
          item: { ...itemStyle.item, backgroundColor: '#8D00E5' },
          itemText: { ...itemStyle.itemText, color: 'white' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#8D00E5', 30), color: 'white' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#8D00E5', 30), color: 'white' },
        };
      case 'Lightblue':
        return {
          item: { ...itemStyle.item, backgroundColor: '#0197E5' },
          itemText: { ...itemStyle.itemText, color: 'white' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#0197E5', 30), color: 'white' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#0197E5', 30), color: 'white' },
        };
      case 'Orange':
        return {
          item: { ...itemStyle.item, backgroundColor: '#E65000' },
          itemText: { ...itemStyle.itemText, color: 'white' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('#E65000', 30), color: 'white' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('#E65000', 30), color: 'white' },
        };
      default:
        return {
          item: { ...itemStyle.item, backgroundColor: 'gray' },
          itemText: { ...itemStyle.itemText, color: 'white' },
          itemScore: { ...itemStyle.itemScore, backgroundColor: darkenColor('gray', 30), color: 'white' },
          itemPos: { ...itemStyle.itemPos, backgroundColor: darkenColor('gray', 30), color: 'white' },
        };
    }
  }

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      width:'100%',
    },
    container: {
      paddingHorizontal:10,
      flex:1,
      paddingBottom:138

    },
    title:{
      color:isDarkMode ? 'white' : 'black',
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 32,
      textAlign: 'center',
      marginBottom:10,
      paddingVertical:15,
      borderRadius:10
    },
    item: {
      flexDirection:'row', 
      backgroundColor: isDarkMode ? '#333' : '#ccc',
      marginVertical: 3, 
      borderRadius: 5, 
      justifyContent:'space-between', 
      alignContent:'center',
    },
    itemText: {
      fontSize: 18,
      fontWeight:'bold',
      paddingVertical: 15,
      paddingLeft:5,
      marginRight:'auto',
      color:isDarkMode ? 'white' : 'black',
      flexWrap:'wrap',
      width:'90%'
    },
    itemScore: {
      fontSize: 22,
      fontWeight:'bold',
      paddingVertical: 15,
      paddingRight:10,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      width:'27%',
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
    // <ImageBackground source={require('../../assets/images/background2.jpg')} style={styles.background}>
      <ThemedView style={styles.container}>
        <SafeAreaView>
          <Text style={styles.title}>Tabla de Clasificación</Text>
          <FlatList
            data={calification}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </ThemedView>
    // </ImageBackground>
  );
}