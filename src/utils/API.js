const BASE_URL = 'https://fitnesstrackerbackend-d9kt.onrender.com/api';

export const registerUser = async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: `${username}`,
            password: `${password}`
          }
        })
    });
    const data = await response.json();
    return data;
}

export const loginUser = async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: `${username}`,
            password: `${password}`
          }
        })
    });
    const data = await response.json();
    return data;
}

export const getUser = async (token) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

// not sure if this will work the way I want yet
export const getRoutinesByUser = async ({username, token = null}) => {
    if (token) {
        const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });
    } else {
        const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
            headers: {
            'Content-Type': 'application/json'
            },
        });
    }
    const data = await response.json();
    return data;
}

export const getActivities = async () => {
    const response = await fetch(`${BASE_URL}/activities`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data;
}

export const createActivity = async ({ name, description, token }) => {
    const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: `${name}`,
            description: `${description}`
        })
    });
    const data = await response.json();
    return data;
}

export const editActivity = async ({ name, description, token, id }) => {
    const response = await fetch(`${BASE_URL}/activities/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: `${name}`,
            description: `${description}`
        })
    });
    const data = await response.json();
    return data;
}

export const getRoutinesByActivity = async (id) => {
    const response = await fetch(`${BASE_URL}/activities/${id}/routines`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data;
}

export const getRoutines = async () => {
    const response = await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data;
}

export const createRoutine = async ({ name, goal, token }) => {
    const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: `${name}`,
            goal: `${goal}`,
            isPublic: true
        })
    });
    const data = await response.json();
    return data;
}

export const editRoutine = async ({ name, goal, isPublic, token, id }) => {
    const response = await fetch(`${BASE_URL}/routines/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: `${name}`,
            goal: `${goal}`,
            isPublic: isPublic
        })
    });
    const data = await response.json();
    return data;
}

export const deleteRoutine = async ({ token, id }) => {
    const response = await fetch(`${BASE_URL}/routines/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

export const attachActivity = async ({ activityId, count, duration, id }) => {
    const response = await fetch(`${BASE_URL}/routines/${id}/activities`, {
        method: "POST",
        body: JSON.stringify({
            activityId: activityId,
            count: count,
            duration: duration
        })
    })
    const data = await response.json();
    return data;
}

export const editRoutineActivity = async ({ count, duration, token, id}) => {
    const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            count: count,
            duration: duration
        })
    });
    const data = await response.json();
    return data;
}

export const deleteRoutineActivity = async ({ token, id }) => {
    const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}