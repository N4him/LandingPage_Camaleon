import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Middleware de validación para comprobar campos vacíos o incompletos
const validateCalificacionFields = (req, res, next) => {
  const { calificacion } = req.body;

  // Comprobar si el objeto calificacion existe y si los campos son válidos
  if (!calificacion || !calificacion.calificacion || !calificacion['Más información']) {
    return res.status(400).json({ error: 'Los campos "calificación" y "Más información" son obligatorios.' });
  }

  next(); // Si la validación pasa, continuar con la siguiente función
};

// Rutas para "Calificación del Grupo"
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Calificacion del Grupo de Investigacion');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener la calificación del grupo:', error);
    res.status(500).json({ error: 'Error al obtener la calificación del grupo' });
  }
});

// Crear una nueva calificación del grupo
router.post('/', validateCalificacionFields, async (req, res) => {
  const data = req.body;
  try {
    const collectionRef = collection(db, 'Calificacion del Grupo de Investigacion');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error al crear la calificación del grupo:', error);
    res.status(500).json({ error: 'Error al crear la calificación del grupo' });
  }
});

// Obtener una calificación específica del grupo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Calificacion del Grupo de Investigacion', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: 'Calificación del grupo no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la calificación del grupo:', error);
    res.status(500).json({ error: 'Error al obtener la calificación del grupo' });
  }
});

// Actualizar una calificación del grupo
router.put('/:id', validateCalificacionFields, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const docRef = doc(db, 'Calificacion del Grupo de Investigacion', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
  } catch (error) {
    console.error('Error al actualizar la calificación del grupo:', error);
    res.status(500).json({ error: 'Error al actualizar la calificación del grupo' });
  }
});

// Eliminar una calificación del grupo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Calificacion del Grupo de Investigacion', id);
    await deleteDoc(docRef);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la calificación del grupo:', error);
    res.status(500).json({ error: 'Error al eliminar la calificación del grupo' });
  }
});

export default router;
