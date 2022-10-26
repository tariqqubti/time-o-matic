import { Duration, Time } from "../src"

const now = Time.now()
console.log(now)
console.log(now.iso)

const oneDay = Duration.fromDays(1)
const tomorrow = now.add(oneDay)
console.log(tomorrow)

const arbitrary = Time.fromIso('2022-08-01')
console.log(arbitrary)

const withTimezone = Time.fromIso('2022-08-01T00:00:00.000+0300')
console.log(withTimezone)
