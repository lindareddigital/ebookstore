// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// const Endpoint = 'http://localhost:8055';
const Endpoint = "https://directus-cms.vicosys.com.hk/items/pages";

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

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


  getNew = async() =>{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${TOKEN} `);
      myHeaders.append("mode", "no-cors");

      const query = `query {
        pages {
          id
          status
          sort
          user_created {
          id
          }
          user_updated {
          id
          }
          date_created
          date_updated
          title
          slug
          blocks {
          id
          collection
          item {
                ... on block_cardgroup {
                  id
                  content
                  group_type
                  posts {
                      posts_id {
                          id
                          title
                          tags
                          key_image {
                              id
                              location
                          }
                      }
                  }
                  cards {
                      title
                      description
                      image {
                          id
                      }
                  }
                }
                ... on block_hero_group {
                  id
                  headline
                  hero_cards {
                      block_hero_id {
                          headline
                          image {
                              id
                          }
                          url
                      }
                  }
                }
                ... on block_hero {
                  id
                  content
                }
                ... on block_richtext {
                  id
                  content
                }
          }
          }
        }
      }`


     query.replace(/(?:\r\n|\r|\n)/g, "\\n");

      const response = await fetch("https://directus-cms.vicosys.com.hk/graphql", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query,          
          variables: {},
        }),
        redirect: "follow",
      })
      const result = await response.json()
      return result
  }

  getAllBooks = () =>{
    return this.get({path:`/items/dayi?fields=*.*`}); 
  }

  getHaibinCategory = () =>{
    return this.get({path:`/items/haibin?fields=Category`}); 
  }

  getHaibin = () =>{
    return this.get({path:`/items/haibin?fields=*.*`}); 
  }

  getHaibinParams = (params) =>{
    return this.get({path:`/items/${params}`}); 
  }

  getRecipe = () =>{
    return this.get({path:`/items/haibin?filter[Category][_eq]=飲食`}); 
  }

  getDetail = (id) =>{
    return this.get({path: `items/dayi?&filter[id]=${id}`,}); 
  }


  // getDetail = (id) =>{
  //   return this.get({path:`/items/Book/?fields=*.*,Category.ParentMenu.*&filter[id]=${id}`}); 
  // }
  


}

export default ApiManager.getSharedInstance();

