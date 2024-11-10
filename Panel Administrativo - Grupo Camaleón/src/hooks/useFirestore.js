import { useState } from 'react';
import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useToast } from '../components/ui/use-toast';

export function useFirestore(collectionName) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const create = async (data) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: 'Éxito',
        description: 'Elemento creado correctamente',
      });
      return docRef;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al crear el elemento',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      toast({
        title: 'Éxito',
        description: 'Elemento actualizado correctamente',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al actualizar el elemento',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      toast({
        title: 'Éxito',
        description: 'Elemento eliminado correctamente',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al eliminar el elemento',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    update,
    remove,
    loading,
  };
}