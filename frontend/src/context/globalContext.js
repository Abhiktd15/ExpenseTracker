import React ,{createContext, useContext, useState} from "react";
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/"

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

    const [incomes,setIncomes] = useState([])
    const [expenses,setExpenses] = useState([])
    const [error,setError] = useState(null)

    //Calculate Incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`,income)
            .catch((err) => {
                setError(err.response.data.message)
            })
            getIncomes()
    }
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }
    const deleteIncome = async (id) => {
        const respose = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }
    const totalIncome = () => {
        let total = 0;
        incomes.forEach((income) => {
            total =total + income.amount
        })
        return total;
    }

    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`,income)
            .catch((err) => {
                setError(err.response.data.message)
            })
            getExpenses()
    }
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }
    const deleteExpense = async (id) => {
        const respose = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
    const totalExpenses = () => {
        let total = 0;
        expenses.forEach((expense) => {
            total =total + expense.amount
        })
        return total;
    }
    const totalBalance = () => {
        const balance = totalIncome() - totalExpenses()
        return balance
    }

    const transactionHistory = () => {
        const history = [...incomes,...expenses]
        history.sort((a,b) => {
            return new Date(b.createdAt)-new Date(a.createdAt)
        })
        return history.slice(0,3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            expenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}