import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountDownContainer, CountDownSeparator } from './styles'

interface CountdownProps {
  activeCycle: any
  setCycles: any
  activeCycleId: any
}

export function Countdown({
  activeCycle,
  setCycles,
  activeCycleId,
}: CountdownProps) {
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
          setCycles((prevState) =>
            prevState.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setActiveCycleId(null)
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
  }, [activeCycle, totalSeconds, activeCycleId])

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
