import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';
const router = express.Router();

// Rutas para "Trabajos de Grado"
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Trabajos de Grado');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los trabajos de grado:', error);
    res.status(500).json({ error: 'Error al obtener los trabajos de grado' });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const collectionRef = collection(db, 'Trabajos de Grado');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error al crear el trabajo de grado:', error);
    res.status(500).json({ error: 'Error al crear el trabajo de grado' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Trabajos de Grado', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: 'Trabajo de grado no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el trabajo de grado:', error);
    res.status(500).json({ error: 'Error al obtener el trabajo de grado' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const docRef = doc(db, 'Trabajos de Grado', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
  } catch (error) {
    console.error('Error al actualizar el trabajo de grado:', error);
    res.status(500).json({ error: 'Error al actualizar el trabajo de grado' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Trabajos de Grado', id);
    await deleteDoc(docRef);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el trabajo de grado:', error);
    res.status(500).json({ error: 'Error al eliminar el trabajo de grado' });
  }
});

export default router;
