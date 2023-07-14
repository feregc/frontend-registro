import React, { useEffect, useState } from 'react'

export const useFetchs = (carrera, centro) => {
    const [edificios, setEdificios] = useState([]);
    const [clases, setClases] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [aulas, setAulas] = useState([]);
    // const [carerra, setCarrera] = useState('');
    // const [centro, setCentro] = useState('');
    // console.log(docente[0].carrera);

    useEffect(() => {
        const fetchEdificios = async () => {
            try {
                const response = await fetch('http://localhost:8081/edificio');
                const jsonData = await response.json();
                setEdificios(jsonData);
            } catch (error) {
                console.error('Error al obtener los edificios:', error);
            }
        };

        fetchEdificios();
    }, []);

    //Necesito hacer un use effect cuando se renderiza por primera vez y traer los docentes
    //clases y aulas, hora, dias 
    useEffect(() => {
        const fetchClases = async () => {
            try {
                const response = await fetch(`http://localhost:8081/clasescarrera/${carrera}`);
                const jsonData = await response.json();
                setClases(jsonData);
            } catch (error) {
                console.error('Error al obtener las clases:', error);
            }
        };

        fetchClases();
    }, [carrera]);

    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                const response = await fetch(`http://localhost:8081/docentecarreranombre/${carrera}/${centro}`);
                const jsonData = await response.json();
                setDocentes(jsonData);
            } catch (error) {
                console.error('Error al obtener los docentes:', error);
            }
        };

        fetchDocentes();
    }, [carrera,centro]);

    useEffect(() => {
        const fetchAulas = async () => {
            try {
                const response = await fetch(`http://localhost:8081/aulas-disponibles`);
                const jsonData = await response.json();
                setAulas(jsonData);
            } catch (error) {
                console.error('Error al obtener las aulas:', error);
            }
        };

        fetchAulas();
    }, []);
    return {
        edificios,
        clases,
        docentes,
        aulas,
    }
}
