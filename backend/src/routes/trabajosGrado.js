import express from 'express';
import { 
  collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc 
} from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Middleware de validación para Trabajo de Grado
const validarTrabajoDeGrado = (req, res, next) => {
  const { 
    descripcion, 
    titulo, 
    mencion, 
    estudiantes, 
    "director(es)": directores 
  } = req.body["Trabajo de Grado"];

  // Validar que la descripción y el título no estén vacíos
  if (!descripcion || descripcion.trim() === '') {
    return res.status(400).json({ error: 'La descripción es obligatoria.' });
  }

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio.' });
  }

  // Validar mención: solo puede ser "meritoria" o "laureada"
  if (
    !Array.isArray(mencion) || 
    mencion.some(opcion => opcion !== 'meritoria' && opcion !== 'laureada')
  ) {
    return res.status(400).json({ 
      error: 'Las menciones deben ser "meritoria" o "laureada".' 
    });
  }

  // Validar estudiantes: debe ser un array con al menos un objeto válido
  if (
    !Array.isArray(estudiantes) || 
    estudiantes.length === 0 || 
    estudiantes.some(e => !e["nombre(s)"] || !e["apellido(s)"])
  ) {
    return res.status(400).json({ 
      error: 'Debe haber al menos un estudiante con nombre y apellido.' 
    });
  }

  // Validar directores: debe ser un array con al menos un objeto válido
  if (
    !Array.isArray(directores) || 
    directores.length === 0 || 
    directores.some(d => !d["nombre(s)"] || !d["apellido(s)"])
  ) {
    return res.status(400).json({ 
      error: 'Debe haber al menos un director con nombre y apellido.' 
    });
  }

  next();
};

// Rutas para "Trabajos de Grado"

// Obtener todos los trabajos de grado
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

// Crear un nuevo trabajo de grado
router.post('/', validarTrabajoDeGrado, async (req, res) => {
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

// Obtener un trabajo de grado por ID
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

// Actualizar un trabajo de grado por ID
router.put('/:id', validarTrabajoDeGrado, async (req, res) => {
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

// Eliminar un trabajo de grado por ID
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
