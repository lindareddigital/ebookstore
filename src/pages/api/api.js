// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Endpoint = 'http://localhost:8055';


class ApiManager {
  static instance;
  defaultData= {
    timestamp: Date.now()
  };
  static token = '';
  static getSharedInstance = () => {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  };

  constructor() {}

  get = async (params) => {
    const { path, data, customHeader = {} } = params;
    // const mergedDic = mergeDictionary(data, this.defaultData);
    // const fetchEndpoint = `${Endpoint}${path}${encodeQueryData(path)}`;
    const fetchEndpoint = `${Endpoint}${path}`;

    console.log('fetchEndpoint', fetchEndpoint);
    // await this.getToken();
    const response = await fetch(fetchEndpoint, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${ApiManager.token}`,
        ...customHeader
      }
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(
        JSON.stringify(
          result.error.message ? result.error : { message: result.error }
        )
      );
    } else {
      return result;
    }
  };
  post = (params) => {
    return this.request({ ...params, method: 'POST' });
  };
  put = (params) => {
    return this.request({ ...params, method: 'PUT' });
  };
  delete = (params) => {
    return this.request({ ...params, method: 'DELETE' });
  };

  request = async ({
    path,
    method,
    data,
    customHeader
  }) => {
    const fetchEndpoint = `${path}`;

    // await this.getToken();
    const response = await fetch(fetchEndpoint, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${ApiManager.token}`,
        ...customHeader
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(
        JSON.stringify(
          result.error.message ? result.error : { message: result.error }
        )
      );
    } else {
      return result;
    }
  };


  getCategoryList = (id) =>{
    return this.get({
      path:`/items/Book?fields=*.*&filter[Category][_eq]=${id}`
    }); 
  }

  getAllCategory = () =>{
    return this.get({path:`/items/Category`}); 
  }

  // getAllBooks = () =>{
  //   return this.get({path:`/items/Book`}); 
  // }

  getAllBooks = () =>{
    return this.get({path:`/items/Dayi?fields=*.*`}); 
  }

  getHaibinCategory = () =>{
    return this.get({path:`/items/Haibin?fields=Category`}); 
  }

  getHaibin = () =>{
    return this.get({path:`/items/Haibin?fields=*.*`}); 
  }

  getHaibinParams = (params) =>{
    return this.get({path:`/items/${params}`}); 
  }

  getRecipe = () =>{
    return this.get({path:`/items/Haibin?filter[Category][_eq]=飲食`}); 
  }

  getDetail = (id) =>{
    return this.get({path:`/items/Book/${id}`}); 
  }

  // getDetail = (id) =>{
  //   return this.get({path:`/items/Book/?fields=*.*,Category.ParentMenu.*&filter[id]=${id}`}); 
  // }
  


}

export default ApiManager.getSharedInstance();





export async function getAllCategory() {
  return fetch('http://localhost:8055/items/Category', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        console.log("Fetch error occurred.", response);

        throw new Error('Network response was not ok');

      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      return data.data
    })
    .catch(function(err) {
      console.log("Fetch error occurred.", err);
    });
}





