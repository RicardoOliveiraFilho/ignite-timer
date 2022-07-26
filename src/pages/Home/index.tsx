import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
// import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextData)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // const hasTask = watch('task')
  // const isSubmitDisabled = !hasTask

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((prevState) => [...prevState, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  console.clear()
  // console.log(`${minutes} minutos.`)
  // console.log(`${seconds} segundos.`)
  // console.log(document.title)
  console.log(cycles)

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* {<NewCycleForm />} */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
