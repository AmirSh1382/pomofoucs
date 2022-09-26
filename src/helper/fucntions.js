const clockFormatGenerator = time => {
    let minute = Math.floor(time / 60)

    let second = time % 60

    if(second < 10){
        second = "0" + second
    }

    if (minute < 10){
        minute = "0" + minute
    }

    const finallFormat = `${minute} : ${second}`

    console.log(finallFormat)

    return finallFormat
}

const getSettingFromLocalStorage = state => {
    const localSetting = JSON.parse(localStorage.getItem("setting"))

    return localSetting ? {...localSetting, isThereLocalSetting: true} : state
}

const timeLinePercentageCalculator = (fullTime, currentTime) => {

    const timeLinePercentage = (100 - ((currentTime / fullTime) * 100) ).toFixed(2) + "%"

    return { timeLinePercentage }
}

export { getSettingFromLocalStorage, timeLinePercentageCalculator }
export { clockFormatGenerator }