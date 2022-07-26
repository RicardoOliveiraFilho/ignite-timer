import { useContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'
import { CountDownContainer, CountDownSeparator } from './styles'

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CyclesContext)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifferenceCycleStartDateToNow = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifferenceCycleStartDateToNow >= totalSeconds) {
          markCurrentCycleAsFinished()
          // setActiveCycleId(null)
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifferenceCycleStartDateToNow)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer [${minutes}: ${seconds}]`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <CountDownSeparator>:</CountDownSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[0]}</span>
    </CountDownContainer>
  )
}
