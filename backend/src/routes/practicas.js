import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Middleware para validar los datos de la práctica
const validarPractica = (req, res, next) => {
  const { profesor, resultadoInvestigacion, estudiantes, tituloPractica } = req.body.practica;  // Asegúrate de acceder a req.body.practica

  if (!profesor || !profesor.nombres || !profesor.apellidos) {
    return res.status(400).json({ error: 'El nombre y apellido del profesor son obligatorios.' });
  }
  if (!resultadoInvestigacion || resultadoInvestigacion.trim() === '') {
    return res.status(400).json({ error: 'El resultado de la investigación es obligatorio.' });
  }
  if (!tituloPractica || tituloPractica.trim() === '') {
    return res.status(400).json({ error: 'El título de la práctica es obligatorio.' });
  }
  if (!Array.isArray(estudiantes) || estudiantes.length === 0) {
    return res.status(400).json({ error: 'Debe haber al menos un estudiante.' });
  }

  for (const estudiante of estudiantes) {
    if (!estudiante.nombres || estudiante.nombres.trim() === '') {
      return res.status(400).json({ error: 'El nombre del estudiante es obligatorio.' });
    }
    if (!estudiante.apellidos || estudiante.apellidos.trim() === '') {
      return res.status(400).json({ error: 'El apellido del estudiante es obligatorio.' });
    }
  }

  next();
};


// Ruta para obtener todas las prácticas
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Practicas');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, practica: doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener las prácticas:', error);
    res.status(500).json({ error: 'Error al obtener las prácticas' });
  }
});

// Ruta para crear una nueva práctica
router.post('/', validarPractica, async (req, res) => {
  const data = req.body.practica; // Aquí accedemos a los datos de la práctica desde el cuerpo de la solicitud
  try {
    const collectionRef = collection(db, 'Practicas');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, practica: data });
  } catch (error) {
    console.error('Error al crear la práctica:', error);
    res.status(500).json({ error: 'Error al crear la práctica' });
  }
});


// Ruta para obtener una práctica por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Practicas', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, practica: snapshot.data() });
    } else {
      res.status(404).json({ error: 'Práctica no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la práctica:', error);
    res.status(500).json({ error: 'Error al obtener la práctica' });
  }
});

// Ruta para actualizar una práctica
router.put('/:id', validarPractica, async (req, res) => {
  const { id } = req.params;
  const { profesor, resultadoInvestigacion, estudiantes, tituloPractica } = req.body.practica;  // Acceder al objeto "practica"
  const data = { profesor, resultadoInvestigacion, estudiantes, tituloPractica };  // Crear un objeto con solo los campos necesarios

  try {
    const docRef = doc(db, 'Practicas', id);
    await updateDoc(docRef, data);
    res.json({ id, practica: data });
  } catch (error) {
    console.error('Error al actualizar la práctica:', error);
    res.status(500).json({ error: 'Error al actualizar la práctica' });
  }
});


// Ruta para eliminar una práctica
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Practicas', id);
    await deleteDoc(docRef);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la práctica:', error);
    res.status(500).json({ error: 'Error al eliminar la práctica' });
  }
});

export default router;
