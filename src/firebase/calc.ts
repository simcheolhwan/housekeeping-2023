import { sum } from "ramda"
import { useViewYearMonth } from "../pages/dashboard/viewMonth"
import { useBalance, useYear } from "./read"

export const useYearBalance = () => {
  const { year } = useViewYearMonth()
  const { income, expense } = useYear(year)
  const totalIncome = sum(income.map(({ amount }) => amount))
  const totalExpense = sum(expense.map(({ amount }) => amount))
  return totalIncome - totalExpense
}

export const useBalanceError = () => {
  const { bank = [], receivable = [], custody = [] } = useBalance()
  const yearBalance = useYearBalance()

  const totalBank = sum(bank.map(({ amount }) => amount))
  const totalReceivable = sum(receivable.map(({ amount }) => amount))
  const totalCustody = sum(custody.map(({ amount }) => amount))

  return totalBank + totalReceivable - totalCustody - yearBalance
}
