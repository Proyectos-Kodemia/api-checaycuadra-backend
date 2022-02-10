const Schedule = require('../../models/utils/schedule')

const create = async (dataSchedule) => {
    const { daysAvailable,hoursAvailable } = dataSchedule
    try {
      const schedule = new Schedule.model({ daysAvailable, hoursAvailable})
      const savedSchedule = await schedule.save()
      return savedSchedule
    } catch (err) {
      console.log('Error desde create schedule', err)
    }
  }

  const get = async () => {
    return await Account.model.find({}, 'id name lastname degree profileImage description role evaluation address Schedule ').exec()
  }