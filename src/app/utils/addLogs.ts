import logsSchema from '../models/logsSchema.model';

const addLogs = async (user: any, logs: any) => {
    user.logs = logs;
    const log = new logsSchema({ user: user.name, action: logs.action, date: logs.date, description: logs.description });
    
    try {
        await user.save();
        await log.save();
    } catch (err) {
        console.log(err);
    }
}

export default addLogs;