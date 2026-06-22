'use server'

// import { serverMutation } from "../core/server";


// export const createJob = async (newJobData) => {
//     return serverMutation('/api/jobs', newJobData);
// }

const baseUrl = process.env.SERVER_URL;

export const createManage = async (addManageBookData) => {
    const res = await fetch(`${baseUrl}/api/manage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addManageBookData),
    });

    return res.json();
}