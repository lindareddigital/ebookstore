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

  sdk = async (gql) => {
    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(graphql({ credentials: "include" }))
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const result = await client.query(gql);

    return result;
  };

  getPageBySlug = async () => {
    const gql = `query {
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
      }`;
    return await this.sdk(gql);
  };

  getSearchKeywords = () => {
    return;
  };

  getNaviMenu = () => {
    return;
  };

  getSideMenu = () => {
    return;
  };

  getProduct = () => {
    return;
  };

  //getSideMenuByPublisher
  getSiteMenu = () => {
    return this.get({ path: `/items/site_menu/?fields[]=menu_items.*.*` });
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

  getProductBySeries = (channel, slug) => {
    const gql = `
    query {
      site_menu( 
        limit: 1
        filter: {
        menu_items: {
          site_menu_items_id: {
            slug: {
              _eq: "${slug}"
            }
          }
        }
        channel: {
          _eq: "${channel}"
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

    return;
  };

  // getProductByCategory
  getSlug = async (channel, slug, sort) => {
    // : ["sort", "-date_created", "author.name"]
    // let pagesize = 10;
    // let offset = Number(params.page) * pagesize - pagesize;

    // meta:"total_count",
    // offset: "${offset}",
    // limit: pagesize,
    // sort : ["sort", "-title"],

    const gql = `
      query {
      site_menu( 
        limit: 1,
        filter: {
          menu_items: {
            site_menu_items_id: {
              slug: {
                _eq: "${slug}"
              }
            }
          }
          channel: {
            _eq: "${channel}"
          }
        }
      ) { 
          id
          title
          publisher
          menu_items {
              site_menu_items_id {
                  id
                  title
                  slug
                  category {
                      category_id {
                          id
                          name
                      }
                  }
              }
          }
      }
  }
    `;

    console.log("getSlug", gql);

    return await this.sdk(gql);
  };

  getFilterBooks = async (arr) => {
    // offset: Number(params.page) * pagesize - pagesize,

    const idString = JSON.stringify(arr);
    // console.log("idString", idString);

    const gql = `
      query {
        product(filter: {
          tags: {
            category_id: {
              id: {
                _in: ${idString}
              }
            }
          }
        }) 
        {
          id
          title
          keyword
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

    console.log("getFilterBooks", gql);

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

    console.log("getFilterBooks", gql);

    return await this.sdk(gql);
  };
}

export default ApiManager.getSharedInstance();

