import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Ruta para obtener todas las prácticas
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Practicas');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener las prácticas:', error);
    res.status(500).json({ error: 'Error al obtener las prácticas' });
  }
});

// Ruta para crear una nueva práctica
router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const collectionRef = collection(db, 'Practicas');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, ...data });
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
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: 'Práctica no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la práctica:', error);
    res.status(500).json({ error: 'Error al obtener la práctica' });
  }
});

// Ruta para actualizar una práctica
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const docRef = doc(db, 'Practicas', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
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
