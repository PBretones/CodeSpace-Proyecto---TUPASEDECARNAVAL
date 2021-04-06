

export const authentication = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next()
    }
}

export const isAuth = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

export const myLogin = (user) => {
    return (
        fetch("http://localhost:3002/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)

        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    )
}
export const mySignUp = (user) => {
    return (
        fetch("http://localhost:3002/api/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)

        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    )
}



// Fetch user
export const getUser = (userId, token) => {
    return fetch(`http://localhost:3002/api/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        });
};




//add audio to the local storage
export const addAudio = (audio) => {
    let audios = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("audios")) {
            audios = JSON.parse(localStorage.getItem("audios"));
        }
        audios.push({
            ...audio

        });

        audios = Array.from(new Set(audios.map((p) => p._id))).map((id) => {
            return audios.find((p) => p._id === id);
        });

        localStorage.setItem("audios", JSON.stringify(audios));
    }
};

//delete audios 
export const deleteAudio = (audiosId) => {
    let audios = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("audios")) {
            audios = JSON.parse(localStorage.getItem("audios"));
        }

        audios.map((audio, index) => {
            if (audio._id === audiosId) {
                audios.splice(index, 1);
            }
        });

        localStorage.setItem("audios", JSON.stringify(audios));
    }
    return audios;
};

//get chosen audios from local storage
export const getAudios = (customPase) => {

    const newPase = JSON.stringify(customPase);

    localStorage.setItem("audios", newPase);

    console.log(newPase);
    console.log(localStorage.getItem("audios"));
    return newPase;
};

export const postPase = (userId, postData, token) => {
    return fetch(`http://localhost:3002/api/customPase/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ custompase: postData })
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        });
}

export const deletePase = (paseId) => {
    return fetch(`http://localhost:3002/api/customPase/${paseId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log(error));
};
