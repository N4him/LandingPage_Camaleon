import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Middleware de validación para comprobar campos vacíos o incompletos
const validateConvenioFields = (req, res, next) => {
  const { objetivo, 'institucion asociada': institucionAsociada } = req.body['Convenio y Alianza'] || {};

  // Comprobar si los campos necesarios están presentes y no vacíos
  if (!objetivo || !institucionAsociada) {
    return res.status(400).json({ error: 'Los campos "objetivo" e "institucion asociada" son obligatorios.' });
  }

  next(); // Si la validación pasa, continuar con la siguiente función
};

// Rutas para "Convenios y Alianzas"
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Convenios y Alianzas');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los Convenios y Alianzas:', error);
    res.status(500).json({ error: 'Error al obtener los Convenios y Alianzas' });
  }
});

// Crear un nuevo Convenio y Alianza
router.post('/', validateConvenioFields, async (req, res) => {
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

// Obtener un Convenio y Alianza específico
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Convenios y Alianzas', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: 'Convenios y Alianzas no encontrados' });
    }
  } catch (error) {
    console.error('Error al obtener los Convenios y Alianzas:', error);
    res.status(500).json({ error: 'Error al obtener los Convenios y Alianzas' });
  }
});

// Actualizar un Convenio y Alianza
router.put('/:id', validateConvenioFields, async (req, res) => {
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

// Eliminar un Convenio y Alianza
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
