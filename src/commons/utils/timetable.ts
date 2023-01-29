import { TIMETABLE } from '../config/timetable'

// const date = new Date().getDay()
const date  = 1

export const getCoursesByDay = () => {
    const timeTable = TIMETABLE.find((day) => day.id === date)
    if(!timeTable) return
    const day = timeTable.day
    const courses = timeTable.courses.map((course) => {
        const name = course.name
        const time = course.time
        return {name, time}
    })

    return {day,courses}
}
