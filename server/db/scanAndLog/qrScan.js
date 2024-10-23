const { users } = require('../userSchema')

exports.scanLog = async function scanLog(usn, ip, useragent, userDateTime, newUser) {
    console.log(usn, ip, useragent, userDateTime)

    //get date and time for starting of the day
    let dayStart = new Date(userDateTime.getFullYear(), userDateTime.getMonth(), userDateTime.getDate())
    if(newUser){
        return new Promise((resolve, reject) => {
            users.findOneAndUpdate(
                {
                    usn: usn.toLowerCase()
                },
                {
                    lastLogin: userDateTime,
                    currentLogStatus:true,
                    $push: {
                        logsData: [{
                            usersagent: useragent, ip: ip, time: userDateTime
                        }]
                    }
                }
            )
                .then((msg) => {
                    // console.log('0', msg)
                    resolve({ code: 200, msg: 'Logged Successfully' })
                })
                .catch((err) => {
                    console.log('----ERROR----\n', err)
                    reject({ code: 500, msg: 'Unable to Log' })
                })
        })
    }
    return new Promise((resolve, reject) => {
        users.findOneAndUpdate(
            {
                usn: usn.toLowerCase(),
                lastLogin: { $lte: dayStart }
            },
            {
                lastLogin: userDateTime,
                currentLogStatus:true,
                $push: {
                    logsData: [{
                        usersagent: useragent, ip: ip, time: userDateTime
                    }]
                }
            }
        )
            .then((msg) => {
                console.log('0', msg)
                resolve({ code: 200, msg: 'Logged Successfully' })
            })
            .catch((err) => {
                console.log('----ERROR----\n', err)
                reject({ code: 500, msg: 'Unable to Log' })
            })
    })
}