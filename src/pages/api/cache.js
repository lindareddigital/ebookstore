class RedisManager {
  static instance
  static getInstance() {
   
    return RedisManager.instance;

  }
}

const redisFetch = async(key,fetcher,expires)=> {
  const existing = await get(key);
  if (existing === null) {
    return await set(key, fetcher, expires);
  }
  return existing;
};

const get = async (key) => {
  try {
    const value = await RedisManager?.get(key);
    console.log('redis get', value === null, value);
    if (value === null || value === undefined) return null;
    return JSON.parse(value);
  } catch (e) {}
};

const set = async(key,fetcher,expires) => {
  let value;
  try {
    value = await fetcher();
    console.log('redis fetcher', value);
    await RedisManager?.set(key, JSON.stringify(value), 'EX', expires);
    return value;
  } catch (e) {
    console.log('set error', e);
  }
};

const del = async (key)=> {
  await RedisManager?.del(key);
};

export { redisFetch, set, del };
