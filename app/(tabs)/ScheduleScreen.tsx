import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ListRenderItem, StyleSheet, View, useColorScheme } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  {
    dia:"Domingo, 30 de junio",
    lugar:"Plaza Los Ángeles",
    hora:"12:00 MD",
    actividades:[
      "Inaguración", "60M Planos", "Relevos 4x100", "Equilibrio en bicicleta", "Fútbol", "Bola negra"
    ]
  },
  {
    dia:"Lunes, 01 de julio",
    lugar:"San Josecito",
    hora:"01:00 PM",
    actividades:[
      "Apañar el huevo", "Lanzamiento de bala", "Lanzamiento de javalina", "Jalón de mecate 1er ronda", "Penales", "Tablero", "Reinado"
    ]
  },
  {
    dia:"Martes, 02 de julio",
    lugar:"Campo ferial",
    hora:"01:00 PM",
    actividades:[
      "Fiesta de los niños (En la mañana)", "Salto largo", "Cuchara y limón", "Basquetball"
    ]
  },
  {
    dia:"Miércoles, 03 de julio",
    lugar:"Plaza Los Ángeles",
    hora:"01:00 PM",
    actividades:[
      "2000 y 5000 metro", "Salto alto", "Volleyball", "Relevos en bicicleta", "Jalon de mecate 2da ronda", "Tresillo"
    ]
  },
  {
    dia:"Jueves, 04 de julio",
    lugar:"Campo ferial",
    hora:"01:00 PM",
    actividades:[
      "Fiesta de adultos (En la mañana)", "Prueba múltiple", "Baile en pareja", "Fútbol sala"
    ]
  },
  {
    dia:"Viernes, 05 de julio",
    lugar:"Plaza Los Ángeles",
    hora:"01:00 PM",
    actividades:[
      "Concurso de dibujo (En la mañana)", "Quemado", "Fútbol", "Canto", "Baile", "Noche de talentos (Artista invitado)"
    ]
  },
  {
    dia:"Sábado, 06 de julio",
    lugar:"Plaza Los Ángeles",
    hora:"12:00 MD",
    actividades:[
      "Carrera recreativa (En la mañana)", "Zancos", "Sacos", "Tortillas en fogón", "Final de jalón de mecate", "Leñador", "Carretones"
    ]
  },
]

function getActivitiesByDay(value:string){
  const resultado = data.find(evento => evento.dia === value);
  return resultado ? resultado.actividades : [];

}
export default function ScheduleScreen(){
  const [selectedDay, setSelectedDay] = useState<string>("Domingo, 30 de junio");
  const [activities, setActivities] = useState<string[]>(getActivitiesByDay("Domingo, 30 de junio"))
  const colorScheme = useColorScheme(); // Detecta el esquema de color
  const isDarkMode = colorScheme === 'dark'; 

  function handleChangeSelectedDay(itemValue: string) {
    // console.log("Juego seleccionado: ", itemValue);
    setSelectedDay(itemValue);
    setActivities(getActivitiesByDay(itemValue))
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom:138
    },
    picker: {
      height: 50,
      width: 250,
      marginRight:'auto',
      color:isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#333' : '#ccc'
    },
    item: {
      flexDirection:'row', 
      backgroundColor: isDarkMode ? '#333' : '#ccc',
      marginVertical: 10, 
      borderRadius: 5, 
      justifyContent:'space-between', 
      alignContent:'center',
      flex:1
    },
    itemText: {
      fontSize: 18,
      fontWeight:'bold',
      paddingVertical: 20,
      paddingLeft:10,
      marginRight:'auto',
      color:isDarkMode ? 'white' : 'black',
      flexWrap:'wrap',
      width:'83%'
    },
});

  const renderItem:ListRenderItem<string> = ({item, index}) => (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.itemText}>{item}</ThemedText>
    </ThemedView>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemedView  style={styles.container}>
    <SafeAreaView>
      <ThemedText type="title">Calendario de actividades</ThemedText>

      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <ThemedText type='defaultSemiBold' style={{marginVertical:'auto', marginRight:15, fontSize:20, marginLeft:'auto'}}>Día: </ThemedText>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            if (typeof itemValue === 'string') {
              handleChangeSelectedDay(itemValue);
            }
          }}
        >
          {data?.map(day => 
            <Picker.Item key={day.dia} label={day.dia} value={day.dia} />
          )}
        </Picker>
      </View>  
      <FlatList
        style={{marginTop:25, width:'100%'}}
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </SafeAreaView>

    </ThemedView>
    </GestureHandlerRootView>
  );
};

