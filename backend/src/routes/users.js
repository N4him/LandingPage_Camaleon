import express from 'express';
import admin from '../firebaseAdmin.js'; 

const router = express.Router();


router.get('/getUsers', async (req, res) => {
  const { uid } = req.query;  
  try {
    let result = await admin.auth().listUsers(1000);
    const userRecords = result.users;

   
    if (uid) {
      const user = userRecords.find(user => user.uid === uid); 

      if (user) {
        return res.status(200).json({ user: user.toJSON() }); 
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    }

   
    while (result.pageToken) {
      result = await admin.auth().listUsers(1000, result.pageToken);
      userRecords.push(...result.users);
    }

    res.status(200).json({ users: userRecords.map(user => user.toJSON()) });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
});


router.delete('/deleteUser/:uid', async (req, res) => {
  const { uid } = req.params;  

  try {
   
    await admin.auth().deleteUser(uid);
    res.status(200).json({ message: `Usuario con UID ${uid} eliminado exitosamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
});



router.post('/createUser', async (req, res) => {
    const { email, password, displayName, photoURL, disabled } = req.body; 
  
    try {
      
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
        photoURL,
        disabled: disabled || false, 
      });
  
      res.status(201).json({
        message: `Usuario creado exitosamente`,
        user: userRecord.toJSON(),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
  });
  

export default router;
