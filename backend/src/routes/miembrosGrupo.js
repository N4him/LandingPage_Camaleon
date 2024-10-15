import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../config.js'; // Importa el almacenamiento
import multer from 'multer'; // Importa multer
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; // Importa funciones de Firebase Storage

const router = express.Router();

// Configurar multer para aceptar cualquier tipo de archivo de imagen
const storageMulter = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamaño del archivo a 5 MB (ajusta según lo necesario)
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true); // Acepta el archivo
    } else {
      cb(new Error('Formato de archivo no válido. Solo se aceptan imágenes.'), false); // Rechaza el archivo
    }
  },
});

const upload = storageMulter.single('foto'); // Middleware para subir una sola imagen

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

// Ruta para crear un nuevo miembro del grupo, incluyendo la subida de fotos
router.post('/', upload, async (req, res) => {
  const data = req.body;

  if (req.file) {
    try {
      // Referencia al almacenamiento de Firebase
      const storageRef = ref(storage, `fotos/${req.file.filename}`);
      
      // Establecer el tipo de contenido
      const metadata = {
        contentType: req.file.mimetype, // Usa el tipo MIME del archivo
      };

      // Subir la foto a Firebase Storage
      const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
      
      // Obtener la URL de descarga de la foto
      const photoURL = await getDownloadURL(snapshot.ref);

      // Agregar la URL de la foto a los datos
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

// Ruta para obtener un miembro específico del grupo
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

// Ruta para actualizar un miembro del grupo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const docRef = doc(db, 'Miembros del Grupo', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
  } catch (error) {
    console.error('Error al actualizar el miembro del grupo:', error);
    res.status(500).json({ error: 'Error al actualizar el miembro del grupo' });
  }
});

// Ruta para eliminar un miembro del grupo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Miembros del Grupo', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const photoURL = data.foto; // Obtiene la URL de la foto

      // Elimina el documento de Firestore
      await deleteDoc(docRef);

      // Elimina la imagen de Firebase Storage
      if (photoURL) {
        const photoRef = ref(storage, photoURL); // Crea una referencia a la imagen en Storage
        await deleteObject(photoRef); // Elimina la imagen
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
