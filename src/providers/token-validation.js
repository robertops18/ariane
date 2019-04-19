const jwt_decode = require('jwt-decode');
const standardTimeout = 10000;


const isExpired = (token) => {
    if (token && jwt_decode(token)) {
        const expiry = jwt_decode(token).exp;
        const now = new Date();
        return now.getTime() > expiry * 1000;
    }
    return false;

}

const withTimeout = (promise, timeout) => {
    let hasCanceled_ = false;
    let hasCompleted_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!hasCompleted_){
                hasCompleted_ = true;
                reject({isCanceled: true});
            }
        }, timeout);
        promise.then(
            (val) => {
                if (!hasCompleted_){
                    hasCompleted_ = true;
                    hasCanceled_ ? reject({isCanceled: true}) : resolve(val);
                }
            },
            (error) => {
                if (!hasCompleted_){
                    hasCompleted_ = true;
                    hasCanceled_ ? reject({isCanceled: true}) : reject(error)
                }
            }
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

function timedFetch(...input){
    return withTimeout(fetch(...input), standardTimeout).promise;
}


export default function authenticatedFetch(url, init, token = undefined){
    if(token){
        return isExpired(token) ? false : timedFetch(url, init);
    } else {
        return timedFetch(url, init);
    }
}