import { Either, Left, Right } from "eitherly"

export class Time {
  readonly kind = 'Time'

  constructor(readonly date: Date) {}

  static now(): Time {
    return new Time(new Date)
  }

  static fromMilliseconds(milliseconds: number): Time {
    return new Time(new Date(milliseconds))
  }

  static fromString(s: string): Either<string, Time> {
    const date = new Date(s)
    if(isNaN(date.getTime())) return new Left('Invalid date')
    return new Right(new Time(date))
  }

  static fromIso(iso: string): Time {
    return new Time(new Date(iso))
  }

  get milliseconds(): number {
    return this.date.getMilliseconds()
  }

  get seconds(): number {
    return this.date.getSeconds()
  }

  get iso(): string {
    return this.date.toISOString()
  }

  add(duration: Duration): Time {
    return Time.fromMilliseconds(this.milliseconds + duration.milliseconds)
  }

  subtract(duration: Duration): Time {
    return Time.fromMilliseconds(this.milliseconds - duration.milliseconds)
  }

  diff(other: Time): Duration {
    return new Duration(this.milliseconds - other.milliseconds)
  }

  isAfter(other: Time): boolean {
    return this.milliseconds > other.milliseconds
  }

  isBefore(other: Time): boolean {
    return this.milliseconds < other.milliseconds
  }
}

export class Duration {
  readonly kind = 'Duration'

  constructor(readonly milliseconds: number) {}

  static fromSeconds(seconds: number): Duration {
    return new Duration(seconds * 1000)
  }

  static fromMinutes(minutes: number): Duration {
    return Duration.fromSeconds(minutes * 60)
  }

  static fromHours(hours: number): Duration {
    return Duration.fromMinutes(hours * 60)
  }

  static fromDays(days: number): Duration {
    return Duration.fromHours(days * 24)
  }

  get seconds(): number {
    return this.milliseconds / 1000
  }
}
