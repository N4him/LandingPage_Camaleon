import express from 'express';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Middleware para validar datos
const validateGrupoFields = (req, res, next) => {
  const { presentacion, caracteristicas } = req.body;

  // Validar que la presentación sea una lista de textos
  if (!Array.isArray(presentacion) || !presentacion.every(text => typeof text === 'string')) {
    return res.status(400).json({ error: '"presentacion" debe ser una lista de textos.' });
  }

  // Validar que las características sean una lista de objetos con nombre y descripcion
  if (
    !Array.isArray(caracteristicas) ||
    !caracteristicas.every(
      item => typeof item.nombre === 'string' && typeof item.descripcion === 'string'
    )
  ) {
    return res.status(400).json({
      error: '"caracteristicas" debe ser una lista de objetos con "nombre" y "descripcion".'
    });
  }

  next();
};

// Obtener información del grupo
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Grupo');
    const snapshot = await getDocs(collectionRef);

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No se encontró información del grupo.' });
    }

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener la información del grupo:', error);
    res.status(500).json({ error: 'Error al obtener la información del grupo' });
  }
});

// Actualizar información del grupo
router.put('/:id', validateGrupoFields, async (req, res) => {
  const { id } = req.params;
  const { presentacion, caracteristicas } = req.body;

  try {
    const docRef = doc(db, 'Grupo', id);

    // Verificar que el documento existe
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      return res.status(404).json({ error: 'No se encontró el grupo.' });
    }

    // Actualizar el documento
    await updateDoc(docRef, { presentacion, caracteristicas });
    res.json({ id, presentacion, caracteristicas });
  } catch (error) {
    console.error('Error al actualizar la información del grupo:', error);
    res.status(500).json({ error: 'Error al actualizar la información del grupo' });
  }
});

export default router;
