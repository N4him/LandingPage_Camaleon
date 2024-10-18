import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../config.js';
import multer from 'multer';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // Importa la librería para generar IDs únicos

const router = express.Router();

// Configurar multer
const storageMulter = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido. Solo se aceptan imágenes.'), false);
    }
  },
});

const upload = storageMulter.single('foto');

// Rutas para "Miembros del Grupo"

router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Miembros del Grupo');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los miembros del grupo:', error);
    res.status(500).json({ error: 'Error al obtener los miembros del grupo' });
  }
});

router.post('/', upload, async (req, res) => {
  const data = req.body;

  if (req.file) {
    try {
      const uniqueFileName = `${uuidv4()}-${req.file.originalname}`; // Genera un nombre único
      const storageRef = ref(storage, `fotos/${uniqueFileName}`);
      const metadata = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
      const photoURL = await getDownloadURL(snapshot.ref);
      data.foto = photoURL;
    } catch (error) {
      console.error('Error al subir la foto:', error);
      return res.status(500).json({ error: 'Error al subir la foto' });
    }
  }

  try {
    const collectionRef = collection(db, 'Miembros del Grupo');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error al crear el miembro del grupo:', error);
    res.status(500).json({ error: 'Error al crear el miembro del grupo' });
  }
});

// Obtener un miembro específico del grupo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Miembros del Grupo', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: 'Miembro del grupo no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el miembro del grupo:', error);
    res.status(500).json({ error: 'Error al obtener el miembro del grupo' });
  }
});

// Actualizar un miembro del grupo
router.put('/:id', upload, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (req.file) {
    try {
      const uniqueFileName = `${uuidv4()}-${req.file.originalname}`; // Genera un nombre único
      const storageRef = ref(storage, `fotos/${uniqueFileName}`);
      const metadata = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
      const photoURL = await getDownloadURL(snapshot.ref);
      data.foto = photoURL;
    } catch (error) {
      console.error('Error al subir la nueva foto:', error);
      return res.status(500).json({ error: 'Error al subir la nueva foto' });
    }
  }

  try {
    const docRef = doc(db, 'Miembros del Grupo', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
  } catch (error) {
    console.error('Error al actualizar el miembro del grupo:', error);
    res.status(500).json({ error: 'Error al actualizar el miembro del grupo' });
  }
});

// Eliminar un miembro del grupo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Miembros del Grupo', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const photoURL = data.foto;

      await deleteDoc(docRef);

      if (photoURL) {
        const photoRef = ref(storage, photoURL);
        await deleteObject(photoRef);
      }

      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Miembro del grupo no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el miembro del grupo:', error);
    res.status(500).json({ error: 'Error al eliminar el miembro del grupo' });
  }
});

export default router;
