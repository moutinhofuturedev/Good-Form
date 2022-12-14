export let createdAt = () => {
    const date = new Date()
    const showDate = date.toLocaleDateString()
    const H = formatTime(date.getHours())
    const M = formatTime(date.getMinutes())

    function formatTime(time: number) {
      return String(time).padStart(2, '0')
    }

    return `${showDate} - ${H}:${M}`
  }