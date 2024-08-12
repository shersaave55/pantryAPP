'use client'
import {Box, Stack, Typography, Button, Modal, TextField} from '@mui/material';
import {firestore} from '@/firebase';
import {query, collection, getDocs, setDoc, doc, deleteDoc, getDoc} from "firebase/firestore";
import {useEffect, useState} from 'react';
/*
const item = [
  'Tomato', 'Potato', 'Onion', 'Garlic', 'Ginger', 'Carrot', 'Lettuce', 'Kale', 'Cucumber'
]
*/
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#5B88E2',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
 // button:'#5B88E2'
};

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName]= useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc)=>{
      pantryList.push({name: doc.id, ...doc.data()})
    })
    console.log(pantryList)
    setPantry(pantryList)
  }
  useEffect(() =>{
    updatePantry()
  }, [])

  const addItem = async(item) =>{
    const docRef = doc(collection(firestore, 'pantry'), item)//adds the suggested items to pantry
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
      await updatePantry()
      return
    } else {
      await setDoc(docRef, {count: 1})
      await updatePantry()
    }
   
  }
  const removeItem = async(item) =>{
    const docRef = doc(collection(firestore, 'pantry'), item)//removes the suggested items from the pantry
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {count: count - 1})
      }
    }
    await deleteDoc(docRef)
    await updatePantry()
  }

  return(
    <Box 
      width= "100vw" 
      height= "100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
     
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            📝 Add Item 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
          <Stack width="100%" direction= {'row'} spacing={2}>
          <TextField id="outlines-basic" label="Item" variant="outlined" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)}/>
          <Button variant='conatinered' onClick={()=>{
            addItem(itemName)
            setItemName("")
            handleClose()
          }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
     
      <Button variant="contained" onClick={handleOpen}>Add</Button>

      <Box width= "800px" height= "100px" bgcolor={'#8C92AC'} display={'flex'} justifyContent={'center'} alignItems={'center'} border={'5px solid #E9EAEC'}>
        <Typography variant={'h3'} textAlign={'center'}  >Pantry Items</Typography>
      </Box>
      
      <Stack width= "800px" height= "600px" spacing={2} overflow={'scroll'}>
        {pantry.map(({name, count}) =>(
          <Box 
            key={name}
            width={"100%"}
            minHeight= "150px"
            display={'flex'}
            justifyContent={'space-between'}
            padding={2}
            alignItems={'center'}
            bgcolor={"#89CFF0"}
          >
            <Typography
              variant={'h3'}
              color={"#333"}
              textAlign={'center'}
            >
              {
              //capitalize the first letter of the item 
                name.charAt(0).toUpperCase() + name.slice(1)
              }
            </Typography>

            <Typography variant='h3' color={"#333"} textAlign={"center"}>quantity:{count}</Typography>
       
          <Button variant="contained" onClick={() => removeItem(name)} >Remove</Button>
          </Box>
      ))}
      </Stack>
    </Box>
  
  )
}
