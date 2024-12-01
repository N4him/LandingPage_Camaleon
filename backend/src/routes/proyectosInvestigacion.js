import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Validación del cuerpo del proyecto de investigación
function validarProyecto(data) {
  const { 
    titulo, 
    produccion_academica, 
    objetivo, 
    directores, 
    profesionales, 
    docentes_nombrados, 
    resultado 
  } = data;

  // Verificación de que todos los campos estén completos
  if (!titulo || titulo.trim() === '') {
    return 'El campo "titulo" es obligatorio y no puede estar vacío.';
  }
  
  if (!produccion_academica || produccion_academica.trim() === '') {
    return 'El campo "produccion_academica" es obligatorio y no puede estar vacío.';
  }

  if (!objetivo || objetivo.trim() === '') {
    return 'El campo "objetivo" es obligatorio y no puede estar vacío.';
  }

  if (!resultado || resultado.trim() === '') {
    return 'El campo "resultado" es obligatorio y no puede estar vacío.';
  }
  
  // Verificación de que los campos de directores, profesionales y docentes sean arrays y no estén vacíos
  if (!Array.isArray(directores) || directores.length === 0) {
    return 'Debe haber al menos un director(a).';
  }
  directores.forEach(director => {
    if (!director.nombre || director.nombre.trim() === '') {
      return 'El campo "nombre(s)" del director(a) es obligatorio y no puede estar vacío.';
    }
    if (!director.apellido || director.apellido.trim() === '') {
      return 'El campo "apellido(s)" del director(a) es obligatorio y no puede estar vacío.';
    }
  });

  if (!Array.isArray(profesionales) || profesionales.length === 0) {
    return 'Debe haber al menos un profesional.';
  }
  profesionales.forEach(profesional => {
    if (!profesional.nombre || profesional.nombre.trim() === '') {
      return 'El campo "nombre(s)" del profesional es obligatorio y no puede estar vacío.';
    }
    if (!profesional.apellido || profesional.apellido.trim() === '') {
      return 'El campo "apellido(s)" del profesional es obligatorio y no puede estar vacío.';
    }
  });

  if (!Array.isArray(docentes_nombrados) || docentes_nombrados.length === 0) {
    return 'Debe haber al menos un docente director(a).';
  }
  docentes_nombrados.forEach(docente => {
    if (!docente.nombre || docente.nombre.trim() === '') {
      return 'El campo "nombre(s)" del docente director(a) es obligatorio y no puede estar vacío.';
    }
    if (!docente.apellido || docente.apellido.trim() === '') {
      return 'El campo "apellido(s)" del docente director(a) es obligatorio y no puede estar vacío.';
    }
  });

  return null; // Todo válido
}

// Rutas para "Proyectos de Investigación"
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Proyectos de Investigacion');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, proyecto_de_investigacion: doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los proyectos de investigación:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos de investigación' });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;

  const error = validarProyecto(data);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const collectionRef = collection(db, 'Proyectos de Investigacion');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, proyecto_de_investigacion: data });
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
      res.json({ id: snapshot.id, proyecto_de_investigacion: snapshot.data() });
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

  const error = validarProyecto(data);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const docRef = doc(db, 'Proyectos de Investigacion', id);
    await updateDoc(docRef, data);
    res.json({ id, proyecto_de_investigacion: data });
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
