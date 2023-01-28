import { TIMETABLE } from '../config/timetable'


export const getCoursesByDay = () => {
    const date = new Date().getDay()
    const timeTable = TIMETABLE.find((schedule) => schedule?.id === date)
    const day = timeTable?.day
    const courses = timeTable?.courses?.map((course) => {
        const name = course?.name
        const time = course?.time
        return {name, time}
    })

    return {day,courses}
}
