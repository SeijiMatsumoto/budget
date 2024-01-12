"use client"
import {
  Text,
  Flex,
  Heading,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMyDataContext } from '@/contexts/DataContext'
import { Button } from '@mui/material'
import { setDataInFirestore } from '@/data/useFirebase'
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast'

const Recurring = () => {
  const toast = useToast();
  const { user, loading } = useAuth();
  const { recurringData, setRecurringData } = useMyDataContext();


  const changeHandler = (value: number, index: number) => {

  }

  const submitHandler = () => {
    setDataInFirestore(user, "categories", setRecurringData, recurringData, returnToast, toast)
  }

  return (
    <Flex flexDir="column" mb={10}>
      <Heading size="md" fontWeight="normal" mb={2}>Recurring Items</Heading>
      <Flex justifyContent="center">
        <Button variant="outlined" onClick={submitHandler}>Update Recurring</Button>
      </Flex>
    </Flex>
  )
}

export default Recurring