import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Rutas para "Proyectos de Investigación"
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Proyectos de Investigacion');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los proyectos de investigación:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos de investigación' });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const collectionRef = collection(db, 'Proyectos de Investigacion');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error al crear el proyecto de investigación:', error);
    res.status(500).json({ error: 'Error al crear el proyecto de investigación' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Proyectos de Investigacion', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: 'Proyecto de investigación no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el proyecto de investigación:', error);
    res.status(500).json({ error: 'Error al obtener el proyecto de investigación' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const docRef = doc(db, 'Proyectos de Investigacion', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
  } catch (error) {
    console.error('Error al actualizar el proyecto de investigación:', error);
    res.status(500).json({ error: 'Error al actualizar el proyecto de investigación' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Proyectos de Investigacion', id);
    await deleteDoc(docRef);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el proyecto de investigación:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto de investigación' });
  }
});

export default router;
