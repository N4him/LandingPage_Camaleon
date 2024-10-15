import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Rutas para "Calificación del Grupo"
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Convenios y Alianzas');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener el Convenios y Alianza:', error);
    res.status(500).json({ error: 'Convenios y Alianzas' });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const collectionRef = collection(db, 'Convenios y Alianzas');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error al crear Convenios y Alianzas:', error);
    res.status(500).json({ error: 'Error al crear Convenios y Alianzas' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Convenios y Alianzas', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: ' Convenios y Alianzas no encontrados' });
    }
  } catch (error) {
    console.error('Error al obtener los Convenios y Alianzas :', error);
    res.status(500).json({ error: 'Error al obtener los Convenios y Alianzas' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const docRef = doc(db, 'Convenios y Alianzas', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
  } catch (error) {
    console.error('Error al actualizar Convenios y Alianzas:', error);
    res.status(500).json({ error: 'Error al actualizar Convenios y Alianzas' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Convenios y Alianzas', id);
    await deleteDoc(docRef);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar Convenios y Alianzas:', error);
    res.status(500).json({ error: 'Error al eliminar Convenios y Alianzas' });
  }
});

export default router;
