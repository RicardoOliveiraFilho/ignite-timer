import { CountDownContainer, CountDownSeparator } from './styles'

export function Countdown() {
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
