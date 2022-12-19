import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext'

export default function useUser() { 

    const {isError, error, authUser, isLoading, logoutUser} = useContext(AuthContext)

    return {isError, error, authUser, isLoading, logoutUser} 
}