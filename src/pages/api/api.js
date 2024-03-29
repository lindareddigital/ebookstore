// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Endpoint = "https://directus-cms.vicosys.com.hk";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
import {createDirectus, graphql, staticToken} from "@directus/sdk";

class ApiManager {
  static instance;
  defaultData = {
    timestamp: Date.now(),
  };
  static token = "";
  static getSharedInstance = () => {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  };

  constructor() {}

  get = async (params) => {
    const { path, data, customHeader = {} } = params;
    const fetchEndpoint = `${Endpoint}${path}`;

    console.log("fetchEndpoint", fetchEndpoint);
    // await this.getToken();
    const response = await fetch(fetchEndpoint, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        ...customHeader,
      },
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
    return this.request({ ...params, method: "POST" });
  };
  put = (params) => {
    return this.request({ ...params, method: "PUT" });
  };
  delete = (params) => {
    return this.request({ ...params, method: "DELETE" });
  };

  request = async ({ path, method, data, customHeader }) => {
    const fetchEndpoint = `${path}`;

    // await this.getToken();
    const response = await fetch(fetchEndpoint, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        ...customHeader,
      },
      body: JSON.stringify(data),
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

  sdk_graphql_query = async (gql, variables) => {
    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(graphql({ credentials: "include" }))
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const result = await client.query(gql);

    return result;
  };

  sdk = async (gql) => {
    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(graphql({ credentials: "include" }))
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const result = await client.query(gql);

    return result;
  };

  getPageBySlug = async (slug) => {
    const gql = `
    query {
        pages (filter: 
        {
          slug: { 
            _eq: "${slug}"
            }
        }
        ){
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
      }
    
    `;
    return await this.sdk(gql);
  };

  getSearchKeywords = async () => {
    return;
  };

  getNaviMenu = async () => {
    const gql = `
       query {
        site_menu( 
        filter: {
        channel: {
            _eq: "navi-menu"
        }
            
        }) { 
            id
            title
            publisher
            menu_items {
                site_menu_items_id {
                    id
                    title
                    slug
                    query_tags
                }
            }
        }
    } 
        `;
    return await this.sdk(gql);
  };

  getSideMenuByPublisher = async (publisher_slug) => {
    //"${publisher_slug}" "${category_slug}"
    const gql = `query {
      site_menu( 
        filter: {
          publisher:
          {
            _eq: "${publisher_slug}"
          }  
          
      }) { 
          id
          title
          publisher
          menu_items {
              site_menu_items_id {
                  id
                  title
                  slug
                  query_tags
                  type
                  landing
              }
          }
      }
    }`;
    console.log(gql);
    return await this.sdk(gql);
  };

  getSideMenuByChannelAndSlug = async (channel, category_slug) => {
    //"${publisher_slug}" "${category_slug}"
    const gql = `
    query {
    site_menu(
      filter: {
        channel: {
          _eq: "${channel}"
        }
      }
    ) {
      id
      title
      publisher
      menu_items(filter: { site_menu_items_id: { slug: { _eq: "${category_slug}" } } }) {
        site_menu_items_id {
          id
          title
          slug
          query_tags
        }
      }
    }
  }`;

    console.log("getSideMenuByChannelAndSlug", gql);

    return await this.sdk(gql);
  };
  getProduct = () => {
    return;
  };

  // getProductDetail
  getProductDetail = () => {
    return this.get({
      path: `/items/product/?fields[]=*&fields[]=images.*`,
    });
  };

  getProductRelatedBooks = () => {
    return;
  };

  getColumnsMenu = () => {
    return;
  };

  getColumnByCategory = () => {
    return;
  };

  getDownload = () => {
    return;
  };

  // getReceipes
  getReceipes = () => {
    return;
  };

  getProductBySeries = async (arr, obj) => {
    const formattedArr = arr.map((item) => `"${item}"`).join(", ");

    const gql = `
      query {
        product(
          sort: ["${obj.sort}"]
          limit: ${obj.limit}
          page: ${obj.page}
          filter: {
            series: {
              _in: [${formattedArr}]
            }
          }
        ) {
          id
          title
          keyword
          series
          description
          table_of_contents
          date_created
          tags {
            id
            category_id {
              id
            }
          }
        }
        product_aggregated(
          filter: {
            series: {
              _in: [${formattedArr}]
            }
          }
        ) {
          count {
            id
          }
        }
      }
    `;

    console.log("getProductBySeries", gql);

    return await this.sdk(gql);
  };

  getProductByCategory = async (category, sort_by, page = 1, limit = 20) => {
    const category_id = category.map((item) => `"${item}"`).join(", ");
    const sort_by_json =  sort_by.map((item) => `"${item}"`).join(", ");
    const gql = `
      query {
        product ( 
          sort: [${sort_by_json}]
          limit: ${limit} 
          page: ${page}
          filter: {
            tags: { 
              category_id:{
                id :{
                  _in: [${category_id}]
                }
              }
            }
          }
        ) 
        {
          id
          title
          keyword
          series
          description
          table_of_contents
          date_created
          tags {
            id
            category_id {
              id
            }
          }
        }
        product_aggregated(filter: {
          tags: { 
            category_id:{
              id :{
                _in: [${category_id}]
              }
            }
          }
        }) 
        {     
          count {
            id
          }
        }
    }
    `;

    console.log("getProductByCategory", gql);

    return await this.sdk(gql);
  };

  getProductByPublisher = async (publisher_slug) => {
    // offset: Number(params.page) * pagesize - pagesize,

    const gql = `
      query {
        product(filter: {
            Publisher:{
                name:{
                    _eq : "${publisher_slug}"
                }
            }
        }) 
        {
            id
            title
            keyword
            Publisher{
                name
                id
            }
            series
            tags {
            id
            category_id {
                id
            }
            }
        }
    }
    `;

    console.log("getProductByPublisher", gql);

    return await this.sdk(gql);
  };

  getAllBooks = async () => {
    const gql = `
      query {
        product(filter: {
        }) 
        {
          id
          title
          keyword
          publisher
          series
          tags {
            id
            category_id {
              id
            }
          }
        }
      }
    `;

    console.log("getallBooks", gql);

    return await this.sdk(gql);
  };
}

export default ApiManager.getSharedInstance();

