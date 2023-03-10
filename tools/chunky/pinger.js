let registry = [];

export function pong(type, cb) {
    registry.push({type, cb});
    return () => unpong(type, cb);
}

export function unpong(pingType, cb) {
    // @todo mutate? or ?
    registry = registry.filter(sig => (sig.type !== pingType && sig.cb !== cb));
}

export function ping(pingType, pingPayload) {
    const callbacks = registry.map(({type, cb}) => {
      if (type === pingType) return cb(pingPayload);
    });

    // @todo resolve all and then pass pingPayload?!
    return Promise.resolve(pingPayload);
}

export default {
    ping,
    pong,
    unpong,
};
