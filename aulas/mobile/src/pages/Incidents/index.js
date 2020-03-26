import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api'
import logoImg from '../../assets/logo.png';
import styles from './styles';


export default function Incidents() {

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident) {

        navigation.navigate('Detail', { incident }) //tem que ser o mesmo name que passou na rota
    }

    async function loadIncidents() {

        //evita acontecer mais de uma requisição enquanto a primeira é carregada

        if (loading) {

            return;
        }

        if (total > 0 && incidents.length == total) {

            return;
        }

        setLoading(true);


        const response = await api.get('incidents', {
            params: { page}
        });



        //copia todos os dados que estão vindo de incidents e response,
        // anexando 2 vetores.. é a forma mais correta de se fazer isso no react
        setIncidents([...incidents , ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();

    }, []);

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos. </Text>
                </Text>
            </View>

            <Text style={styles.title}> Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}//quando chegar ao fim da lista
                onEndReachedThreshold={0.2} //diz quanto o percentual do final da lista o usuario estara para carregar novos itens
                //troca o nome da variavel item para incidente, por padrão usa o item
                renderItem={({ item: incident }) => (

                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty} >ONG</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-Br',
                                {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            //assim como no delete se não colocar a arrow function
                            //e somente chamar o metodo com o parametro, ele ira executar assim que carregar
                            //e não quando for pressionado
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>

                    </View>
                )}
            />

        </View>


    );


}