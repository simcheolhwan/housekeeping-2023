import { atom, useRecoilValue } from "recoil"
import { Flex, Stack } from "@mantine/core"
import { thisMonth, thisYear } from "../../firebase/data"
import { useList } from "../../firebase/read"
import HistoryItemTable from "./HistoryItemTable"
import HistoryFooter from "./HistoryFooter"

export const viewLastMonthState = atom({ key: "viewLastMonth", default: false })

const HistorySection = () => {
  const viewLastMonth = useRecoilValue(viewLastMonthState)

  const year = thisYear
  const month = viewLastMonth ? thisMonth - 1 : thisMonth

  const income = useList("income", { year, month })
  const expense = useList("expense", { year, month })

  return (
    <Stack justify="space-between" h="100%">
      <Flex gap="md" direction={!income.length && expense.length ? "column-reverse" : "column"}>
        <HistoryItemTable title="μμ" list={income} listKey="income" />
        <HistoryItemTable title="μ§μΆ" list={expense} listKey="expense" />
      </Flex>

      <HistoryFooter />
    </Stack>
  )
}

export default HistorySection
